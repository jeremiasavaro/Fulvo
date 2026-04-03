import { getUserByUsername } from "@/lib/db";


function validatePayload(payload) {
  const username = typeof payload?.username === "string" ? payload.username.trim() : "";
  const password = typeof payload?.password === "string" ? payload.password : "";

  if (!username || !password) {
    return { ok: false, message: "El nombre de usuario y la contraseña son requeridos" };
  }

  return { ok: true, username, password };
}

export async function POST(request) {
  try {
    const payload = await request.json();
    const validated = validatePayload(payload);
    
    if (!validated.ok) {
      return Response.json({ error: validated.message }, { status: 400 });
    }
    const user = await getUserByUsername(validated.username);

    if (!user) {
      return Response.json({ error: "Usuario o contraseña incorrectos" }, { status: 401 });
    }

    const passwordMatch = await bcrypt.compare(validated.password, user.password);

    if (!passwordMatch) {
      return Response.json({ error: "Usuario o contraseña incorrectos" }, { status: 401 });
    }

    // TODO: Creation of JWT token and setting it as an HTTP-only cookie would go here
  
} catch (error) {
    if (error instanceof SyntaxError) {
      return Response.json({ error: "El JSON es inválido" }, { status: 400 });
    }

    return Response.json({ error: "Error interno" }, { status: 500 });
  }
}