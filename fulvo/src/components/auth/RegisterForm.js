"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { applyRememberChoice } from "@/lib/remember-session";

export default function RegisterForm({ onSwitchMode }) {
  const router = useRouter();
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("loading");
    setMessage("");

    const formData = new FormData(form);
    const fullName = String(formData.get("full_name") || "").trim();
    const dni = String(formData.get("dni") || "").trim();
    const email = String(formData.get("email") || "").trim().toLowerCase();
    const city = String(formData.get("city") || "").trim();
    const birthDate = String(formData.get("birth_date") || "").trim();
    const password = String(formData.get("password") || "");
    const passwordConfirmation = String(formData.get("password_confirmation") || "");

    const body = {
      full_name: fullName,
      dni,
      email,
      city,
      birth_date: birthDate,
      password,
      password_confirmation: passwordConfirmation,
    };

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      let result = {};
      const contentType = response.headers.get("content-type") || "";

      if (contentType.includes("application/json")) {
        result = await response.json();
      }

      if (!response.ok) {
        setStatus("error");
        setMessage(result?.error || "No se pudo crear el usuario");
        return;
      }

      const loginResult = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/feed",
      });

      if (!loginResult || loginResult.error) {
        setStatus("error");
        setMessage("Usuario creado, pero no se pudo iniciar sesion automaticamente");
        return;
      }

      form.reset();
      applyRememberChoice(true);
      setStatus("success");
      const createdName = result?.user?.full_name || fullName;
      setMessage(`Usuario ${createdName} creado e ingresado correctamente`);
      router.push(loginResult.url || "/feed");
      router.refresh();
    } catch {
      setStatus("error");
      setMessage("No se pudo conectar con el servidor");
    }
  }

  return (
    <section>
      <h1 className="font-headline text-3xl font-black tracking-tight text-neutral-900">
        Empezá tu carrera.
      </h1>
      <p className="mt-2 text-sm text-neutral-600">Create your account to join the pitch.</p>

      <form onSubmit={onSubmit} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-xs font-bold uppercase tracking-[0.2em] text-neutral-600">
            Nombre completo
          </span>
          <input
            name="full_name"
            required
            minLength={3}
            className="w-full rounded-xl bg-neutral-200 px-4 py-3 text-sm outline-none transition focus:bg-white focus:ring-2 focus:ring-emerald-700/20"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-bold uppercase tracking-[0.2em] text-neutral-600">
            DNI
          </span>
          <input
            name="dni"
            required
            inputMode="numeric"
            minLength={6}
            maxLength={12}
            className="w-full rounded-xl bg-neutral-200 px-4 py-3 text-sm outline-none transition focus:bg-white focus:ring-2 focus:ring-emerald-700/20"
          />
        </label>

        <label className="block sm:col-span-2">
          <span className="mb-1 block text-xs font-bold uppercase tracking-[0.2em] text-neutral-600">
            Email
          </span>
          <input
            name="email"
            type="email"
            required
            className="w-full rounded-xl bg-neutral-200 px-4 py-3 text-sm outline-none transition focus:bg-white focus:ring-2 focus:ring-emerald-700/20"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-bold uppercase tracking-[0.2em] text-neutral-600">
            Ciudad
          </span>
          <input
            name="city"
            required
            minLength={2}
            className="w-full rounded-xl bg-neutral-200 px-4 py-3 text-sm outline-none transition focus:bg-white focus:ring-2 focus:ring-emerald-700/20"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-bold uppercase tracking-[0.2em] text-neutral-600">
            Fecha de nacimiento
          </span>
          <input
            name="birth_date"
            type="date"
            required
            className="w-full rounded-xl bg-neutral-200 px-4 py-3 text-sm outline-none transition focus:bg-white focus:ring-2 focus:ring-emerald-700/20"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-bold uppercase tracking-[0.2em] text-neutral-600">
            Contraseña
          </span>
          <input
            name="password"
            type="password"
            required
            minLength={8}
            className="w-full rounded-xl bg-neutral-200 px-4 py-3 text-sm outline-none transition focus:bg-white focus:ring-2 focus:ring-emerald-700/20"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-bold uppercase tracking-[0.2em] text-neutral-600">
            Confirmar contraseña
          </span>
          <input
            name="password_confirmation"
            type="password"
            required
            minLength={8}
            className="w-full rounded-xl bg-neutral-200 px-4 py-3 text-sm outline-none transition focus:bg-white focus:ring-2 focus:ring-emerald-700/20"
          />
        </label>

        <button
          type="submit"
          disabled={status === "loading"}
          className="sm:col-span-2 mt-2 w-full rounded-full bg-emerald-700 px-4 py-4 font-headline text-sm font-extrabold uppercase tracking-[0.08em] text-white transition hover:scale-[1.01] hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-emerald-300"
        >
          {status === "loading" ? "Creando..." : "Crear cuenta"}
        </button>
      </form>

      {message ? (
        <p
          className={`mt-4 text-sm ${
            status === "error" ? "text-red-600" : "text-emerald-700"
          }`}
        >
          {message}
        </p>
      ) : null}

      {typeof onSwitchMode === "function" ? (
        <p className="mt-6 text-center text-sm text-neutral-600">
          Ya tienes cuenta?{" "}
          <button
            type="button"
            onClick={onSwitchMode}
            className="font-semibold text-emerald-700 hover:underline"
          >
            Inicia sesion
          </button>
        </p>
      ) : null}
    </section>
  );
}