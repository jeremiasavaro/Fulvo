"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const username = String(formData.get("username") || "").trim();
    const password = String(formData.get("password") || "");

    try {
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (!result || result.error) {
        setStatus("error");
        setMessage("Usuario o contrasena incorrectos");
        return;
      }

      setStatus("success");
      setMessage("Sesion iniciada correctamente");
      router.push("/feed");
      router.refresh();
    } catch {
      setStatus("error");
      setMessage("No se pudo conectar con el servidor");
    }
  }

  return (
    <section className="mx-auto w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <h1 className="text-xl font-semibold text-neutral-900">Login</h1>
      <p className="mt-2 text-sm text-neutral-600">Ingresa con tu usuario y contrasena.</p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <label className="block">
          <span className="mb-1 block text-sm text-neutral-700">Username</span>
          <input
            name="username"
            required
            minLength={3}
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-500"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm text-neutral-700">Password</span>
          <input
            name="password"
            type="password"
            required
            minLength={8}
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-500"
          />
        </label>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700 disabled:cursor-not-allowed disabled:bg-neutral-400"
        >
          {status === "loading" ? "Ingresando..." : "Iniciar sesion"}
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

      <p className="mt-6 text-sm text-neutral-600">
        Aun no tienes cuenta?{" "}
        <Link href="/register" className="font-medium text-neutral-900 underline">
          Registrate
        </Link>
      </p>
    </section>
  );
}
