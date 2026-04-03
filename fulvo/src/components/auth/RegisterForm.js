"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterForm() {
  const router = useRouter();
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("loading");
    setMessage("");

    const formData = new FormData(form);
    const body = {
      username: formData.get("username"),
      password: formData.get("password"),
      password_confirmation: formData.get("password_confirmation"),
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

      form.reset();
      setStatus("success");
      const createdUsername = result?.user?.username || body.username;
      setMessage(`Usuario ${createdUsername} creado correctamente`);
      router.push("/");
      router.refresh();
    } catch {
      setStatus("error");
      setMessage("No se pudo conectar con el servidor");
    }
  }

  return (
    <section className="mx-auto w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <h1 className="text-xl font-semibold text-neutral-900">Register</h1>
      <p className="mt-2 text-sm text-neutral-600">Crea tu usuario inicial.</p>

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

        <label className="block">
          <span className="mb-1 block text-sm text-neutral-700">Confirm password</span>
          <input
            name="password_confirmation"
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
          {status === "loading" ? "Creando..." : "Crear usuario"}
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
        Ya tienes cuenta?{" "}
        <Link href="/login" className="font-medium text-neutral-900 underline">
          Inicia sesion
        </Link>
      </p>
    </section>
  );
}