import { Pool } from "pg";

let pool;

function getPool() {
  if (!pool) {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is not set");
    }

    const useSsl = process.env.DATABASE_SSL === "true";

    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: useSsl ? { rejectUnauthorized: false } : false,
    });
  }

  return pool;
}

export async function createUser({ username, passwordHash }) {
  const result = await getPool().query(
    `
      INSERT INTO "user" (username, password)
      VALUES ($1, $2)
      RETURNING id, username, created_at;
    `,
    [username, passwordHash],
  );

  return result.rows[0];
}
