const request = require("supertest");
const app = require("../app");
const db = require("../src/utils/db");

let token;
let customerId;
let quotationId;

beforeAll(async () => {
  // 1. Register a test user
  const userRes = await request(app).post("/api/auth/register").send({
    business_name: "Test Business",
    first_name: "Test",
    last_name: "User",
    email: "testpdf@example.com",
    password: "Password123!",
    phone: "08000000001",
  });

  // 2. Login
  const loginRes = await request(app).post("/api/auth/login").send({
    email: "testpdf@example.com",
    password: "Password123!",
  });
  token = loginRes.body.data.token;

  // 3. Create a test customer
  const customerRes = await request(app)
    .post("/api/customers")
    .set("Authorization", `Bearer ${token}`)
    .send({
      first_name: "Customer",
      last_name: "One",
      email: "customer1@example.com",
      phone: "08011111111",
      address: "123 Test Street",
    });

  customerId = customerRes.body.data.id;

  // 4. Create a test quotation
  const quoteRes = await db.query(
    `INSERT INTO quotations
      (user_id, customer_id, quote_number, notes, sub_total, tax_total, grand_total)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING id`,
    [userRes.body.id, customerId, 1, "Test quotation", 1000, 100, 1100],
  );
  quotationId = quoteRes.rows[0].id;

  // 5. Add a line item
  await db.query(
    `INSERT INTO quotation_items
      (quotation_id, service_type, description, quantity, unit, unit_price, tax_rate)
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [quotationId, "Service", "Test service", 1, "unit", 1000, 10],
  );
});

afterAll(async () => {
  // Cleanup test data
  await db.query("DELETE FROM quotation_items");
  await db.query("DELETE FROM quotations");
  await db.query("DELETE FROM customers");
  await db.query("DELETE FROM users");
  await db.pool.end();
});

describe("GET /api/quotations/download-pdf/:quotationId", () => {
  it("should return a PDF buffer for a valid quotation", async () => {
    const res = await request(app)
      .get(`/api/quotations/download-pdf/${quotationId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /pdf/)
      .expect(200);

    expect(res.body).toBeDefined();
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should return 404 if quotation not found", async () => {
    const res = await request(app)
      .get(`/api/quotations/download-pdf/00000000-0000-0000-0000-000000000000`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(404);
    expect(res.body.status).toBe("error");
  });

  it("should return 401 if no token provided", async () => {
    const res = await request(app).get(
      `/api/quotations/download-pdf/${quotationId}`,
    );

    expect(res.status).toBe(401);
    expect(res.body.status).toBe("error");
  });
});
