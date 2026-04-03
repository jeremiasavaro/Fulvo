import bcrypt from "bcryptjs";
import { createUser } from "@/lib/db";

// Helper function to validate the incoming registration payload.
// It checks that the username, password, and password confirmation are present and meet certain criteria
// (e.g., minimum length, matching passwords). 
// It returns an object indicating whether the validation was successful and includes error messages if not.
function validatePayload(payload) {
  const username = typeof payload?.username === "string" ? payload.username.trim() : "";
  const password = typeof payload?.password === "string" ? payload.password : "";
  const passwordConfirmation =
    typeof payload?.password_confirmation === "string"
      ? payload.password_confirmation
      : "";

  if (!username || !password || !passwordConfirmation) {
    return { ok: false, message: "El nombre de usuario, y la contraseña son requeridos" };
  }

  if (username.length < 3) {
    return { ok: false, message: "El nombre de usuario debe tener al menos 3 caracteres" };
  }

  if (password.length < 8) {
    return { ok: false, message: "La contraseña debe tener al menos 8 caracteres" };
  }

  if (password !== passwordConfirmation) {
    return { ok: false, message: "Las contraseñas no coinciden" };
  }

  return { ok: true, username, password };
}

// Next.js API route to handle user registration requests.
// It validates the incoming JSON payload, hashes the password using bcrypt,
// and creates a new user in the database. It also handles various error cases, such as duplicate usernames and invalid JSON.
export async function POST(request) {
  try {
    const payload = await request.json();
    const validated = validatePayload(payload);

    if (!validated.ok) {
      return Response.json({ error: validated.message }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(validated.password, 12);    
    const user = await createUser({ username: validated.username, passwordHash });

    const safeUser = {
      id: String(user.id),
      username: user.username,
    };

    return Response.json({ user: safeUser }, { status: 201 });
  } catch (error) {
    console.error("[API] Exception error in registration route:", error);
    if (error?.code === "23505") {
      return Response.json({ error: "El nombre de usuario ya existe" }, { status: 409 });
    }

    if (error instanceof SyntaxError) {
      return Response.json({ error: "El JSON es inválido" }, { status: 400 });
    }

    return Response.json({ error: "Error interno" }, { status: 500 });
  }
}
