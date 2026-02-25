require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { pool } = require("./src/utils/db");

const demoDataDir = path.join(__dirname, "demo-data");

async function runDemoData() {
  const client = await pool.connect();

  try {
    console.log("Starting demo data...");

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
      .readdirSync(demoDataDir)
      .filter((file) => file.endsWith(".sql"))
      .sort(); // important: runs in order

    for (const file of files) {
      if (executed.includes(file)) {
        console.log(`Skipping ${file} (already executed)`);
        continue;
      }

      console.log(`Running ${file}...`);

      const filePath = path.join(demoDataDir, file);
      const sql = fs.readFileSync(filePath, "utf8");

      await client.query(sql);

      await client.query("INSERT INTO migrations (filename) VALUES ($1)", [
        file,
      ]);

      console.log(`Finished ${file}`);
    }

    await client.query("COMMIT");

    console.log("All demo data completed successfully.");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Demo data failed:", err);
    process.exit(1);
  } finally {
    client.release();
    pool.end();
  }
}

runDemoData();
