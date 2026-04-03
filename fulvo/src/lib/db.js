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

// Function to create a new user in the database with the provided username and hashed password.
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

// Function to retrieve a user from the database by their username.
export async function getUserByUsername(username) {
  const result = await getPool().query(
    `
      SELECT id, username, password, created_at
      FROM "user"
      WHERE username = $1;
    `,
    [username],
  );

  return result.rows[0];
}
