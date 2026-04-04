"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { applyRememberChoice } from "@/lib/remember-session";

export default function LoginForm({ onSwitchMode }) {
  const router = useRouter();
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "").trim().toLowerCase();
    const password = String(formData.get("password") || "");
    const remember = formData.get("remember") === "on";

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/feed",
      });

      if (!result || result.error) {
        setStatus("error");
        setMessage("Email o contrasena incorrectos");
        return;
      }

      applyRememberChoice(remember);
      setStatus("success");
      setMessage("Sesion iniciada correctamente");
      router.push(result.url || "/feed");
      router.refresh();
    } catch {
      setStatus("error");
      setMessage("No se pudo conectar con el servidor");
    }
  }

  return (
    <section>
      <h1 className="font-headline text-3xl font-black tracking-tight text-neutral-900">
        Bienvenido de Nuevo!.
      </h1>
      <p className="mt-2 text-sm text-neutral-600">
        Entra al vestuario y ponete los botines.
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <label className="block">
          <span className="mb-1 block text-xs font-bold uppercase tracking-[0.2em] text-neutral-600">
            Email
          </span>
          <input
            name="email"
            type="email"
            required
            className="w-full rounded-xl bg-neutral-200 px-4 py-3 text-sm outline-none transition focus:bg-white focus:ring-2 focus:ring-emerald-700/20"
            placeholder="ejemplo@gmail.com"
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
            placeholder="********"
          />
        </label>

        <label className="flex items-center gap-2 text-sm text-neutral-700">
          <input
            type="checkbox"
            name="remember"
            className="h-4 w-4 rounded border-neutral-400 text-emerald-700 focus:ring-emerald-700/30"
          />
          Mantener sesion iniciada
        </label>

        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-2 w-full rounded-full bg-emerald-700 px-4 py-4 font-headline text-sm font-extrabold uppercase tracking-[0.08em] text-white transition hover:scale-[1.01] hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-emerald-300"
        >
          {status === "loading" ? "Ingresando..." : "Iniciar Sesion"}
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
          Nuevo aquí?{" "}
          <button
            type="button"
            onClick={onSwitchMode}
            className="font-semibold text-emerald-700 hover:underline"
          >
            Crea una cuenta de jugador
          </button>
        </p>
      ) : null}
    </section>
  );
}
