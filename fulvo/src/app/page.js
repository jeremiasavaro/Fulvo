import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-50 p-6 md:p-10">
      <section className="mx-auto w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-neutral-900">Fulvo</h1>
        <p className="mt-2 text-sm text-neutral-600">Selecciona una opcion para continuar.</p>

        <div className="mt-6 flex flex-col gap-3">
          <Link
            href="/login"
            className="rounded-lg bg-neutral-900 px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-neutral-700"
          >
            Ir a Login
          </Link>

          <Link
            href="/register"
            className="rounded-lg border border-neutral-300 px-4 py-2 text-center text-sm font-medium text-neutral-900 transition hover:bg-neutral-100"
          >
            Ir a Register
          </Link>
        </div>
      </section>
    </main>
  );
}
