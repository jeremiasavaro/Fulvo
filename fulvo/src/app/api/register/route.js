import bcrypt from "bcryptjs";
import { createUser } from "@/lib/db";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidDni(dni) {
  return /^[0-9]{6,12}$/.test(dni);
}

function calculateAgeFromBirthDate(birthDate) {
  const today = new Date();
  const birth = new Date(birthDate + "T00:00:00Z");

  let age = today.getUTCFullYear() - birth.getUTCFullYear();
  const monthDiff = today.getUTCMonth() - birth.getUTCMonth();
  const dayDiff = today.getUTCDate() - birth.getUTCDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age -= 1;
  }

  return age;
}

function validatePayload(payload) {
  const fullName = typeof payload?.full_name === "string" ? payload.full_name.trim() : "";
  const dni = typeof payload?.dni === "string" ? payload.dni.replace(/\D/g, "") : "";
  const email =
    typeof payload?.email === "string" ? payload.email.trim().toLowerCase() : "";
  const city = typeof payload?.city === "string" ? payload.city.trim() : "";
  const birthDate =
    typeof payload?.birth_date === "string" ? payload.birth_date.trim() : "";
  const password = typeof payload?.password === "string" ? payload.password : "";
  const passwordConfirmation =
    typeof payload?.password_confirmation === "string"
      ? payload.password_confirmation
      : "";

  if (!fullName || !dni || !email || !city || !birthDate || !password || !passwordConfirmation) {
    return { ok: false, message: "Todos los campos son requeridos" };
  }

  if (fullName.length < 3) {
    return { ok: false, message: "El nombre completo debe tener al menos 3 caracteres" };
  }

  if (!isValidDni(dni)) {
    return { ok: false, message: "El DNI debe contener entre 6 y 12 digitos" };
  }

  if (!isValidEmail(email)) {
    return { ok: false, message: "El email no es valido" };
  }

  const parsedBirthDate = new Date(birthDate + "T00:00:00Z");
  if (Number.isNaN(parsedBirthDate.getTime())) {
    return { ok: false, message: "La fecha de nacimiento no es valida" };
  }

  const now = new Date();
  const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  if (parsedBirthDate > today) {
    return { ok: false, message: "La fecha de nacimiento no puede ser futura" };
  }

  if (password.length < 8) {
    return { ok: false, message: "La contraseña debe tener al menos 8 caracteres" };
  }

  if (password !== passwordConfirmation) {
    return { ok: false, message: "Las contraseñas no coinciden" };
  }

  const age = calculateAgeFromBirthDate(birthDate);

  return {
    ok: true,
    fullName,
    dni,
    email,
    city,
    birthDate,
    age,
    password,
  };
}

export async function POST(request) {
  try {
    const payload = await request.json();
    const validated = validatePayload(payload);

    if (!validated.ok) {
      return Response.json({ error: validated.message }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(validated.password, 12);
    const user = await createUser({
      fullName: validated.fullName,
      dni: validated.dni,
      email: validated.email,
      city: validated.city,
      birthDate: validated.birthDate,
      age: validated.age,
      passwordHash,
    });

    const safeUser = {
      id: String(user.id),
      full_name: user.full_name,
      email: user.email,
    };

    return Response.json({ user: safeUser }, { status: 201 });
  } catch (error) {
    console.error("[API] Exception error in registration route:", error);
    if (error?.code === "23505") {
      const detail = String(error?.detail || "");

      if (detail.includes("dni")) {
        return Response.json({ error: "El DNI ya existe" }, { status: 409 });
      }

      if (detail.includes("email")) {
        return Response.json({ error: "El email ya existe" }, { status: 409 });
      }

      return Response.json({ error: "El usuario ya existe" }, { status: 409 });
    }

    if (error instanceof SyntaxError) {
      return Response.json({ error: "El JSON es inválido" }, { status: 400 });
    }

    return Response.json({ error: "Error interno" }, { status: 500 });
  }
}
