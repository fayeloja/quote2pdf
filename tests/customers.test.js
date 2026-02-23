const request = require("supertest");
const app = require("../app");

let token;

describe("Customers API", () => {
  beforeAll(async () => {
    // Login or register test user
    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "password123",
    });

    token = res.body.data.token;
  });

  it("should get paginated customers", async () => {
    const res = await request(app)
      .get("/api/customers?page=1&limit=5")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
    expect(res.body.data).toBeDefined();
    expect(res.body.meta).toBeDefined();
  });
});
