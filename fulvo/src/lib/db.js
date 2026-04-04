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

// Creates a new user with profile data and a hashed password.
export async function createUser({ fullName, dni, email, city, birthDate, age, passwordHash }) {
  const result = await getPool().query(
    `
      INSERT INTO "user" (full_name, dni, email, city, birth_date, age, password)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, full_name, dni, email, city, birth_date, age, created_at;
    `,
    [fullName, dni, email, city, birthDate, age, passwordHash],
  );
  return result.rows[0];
}

// Retrieves a user by normalized email for credential sign-in.
export async function getUserByEmail(email) {
  const result = await getPool().query(
    `
      SELECT id, full_name, dni, email, city, birth_date, age, password, created_at
      FROM "user"
      WHERE email = $1;
    `,
    [email],
  );

  return result.rows[0];
}
