require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { pool } = require("./src/utils/db");

const migrationsDir = path.join(__dirname, "migrations");

async function runMigrations() {
  const client = await pool.connect();

  try {
    console.log("Starting migrations...");

    await client.query("BEGIN");

    // 1️⃣ Create migrations tracking table
    await client.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        filename TEXT UNIQUE NOT NULL,
        executed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);

    // 2️⃣ Get already executed migrations
    const { rows } = await client.query("SELECT filename FROM migrations;");

    const executed = rows.map((r) => r.filename);

    // 3️⃣ Read migration files
    const files = fs
      .readdirSync(migrationsDir)
      .filter((file) => file.endsWith(".sql"))
      .sort(); // important: runs in order

    for (const file of files) {
      if (executed.includes(file)) {
        console.log(`Skipping ${file} (already executed)`);
        continue;
      }

      console.log(`Running ${file}...`);

      const filePath = path.join(migrationsDir, file);
      const sql = fs.readFileSync(filePath, "utf8");

      await client.query(sql);

      await client.query("INSERT INTO migrations (filename) VALUES ($1)", [
        file,
      ]);

      console.log(`Finished ${file}`);
    }

    await client.query("COMMIT");

    console.log("All migrations completed successfully.");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Migration failed:", err);
    process.exit(1);
  } finally {
    client.release();
    pool.end();
  }
}

runMigrations();
