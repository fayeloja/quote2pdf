// Database Connection Service
const dotenv = require("dotenv").config();

const { Pool } = require("pg");

// 1. Configure the connection
// In development, this uses your localhost.
// In Docker/Production, it uses the environment variable.
const pool = new Pool(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl:
          process.env.NODE_ENV === "production"
            ? { rejectUnauthorized: false }
            : false,
        max: 20, // Maximum number of clients in the pool
        idleTimeoutMillis: 30000,
      }
    : {
        user: process.env.DB_USER || "quote2pdf_user",
        host: process.env.DB_HOST || "localhost",
        database: process.env.DB_NAME || "quote2pdf",
        password: process.env.DB_PASSWORD || "quote2pdf_password",
        port: process.env.DB_PORT || 5432,
        max: 20, // Maximum number of clients in the pool
        idleTimeoutMillis: 30000,
      },
);

// Optional: test connection immediately
pool.on("connect", () => {
  console.log("Connected to PostgreSQL");
});

pool.on("error", (err) => {
  console.error("Unexpected DB error", err);
  process.exit(1);
});

// 2. Add a helper to log queries (Great for debugging!)
module.exports = {
  query: async (text, params) => {
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;

    if (process.env.NODE_ENV !== "production") {
      console.log("Executed query", {
        text,
        duration,
        rows: res.rowCount,
      });
    }
    return res;
  },
  pool, // Export the pool itself for transactions
};
