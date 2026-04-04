import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export const metadata = {
  title: "Feed | Fulvo",
};

export default async function FeedPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-neutral-50 p-6 md:p-10">
      <section className="mx-auto w-full max-w-2xl rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-neutral-900">Feed privado</h1>
        <p className="mt-2 text-sm text-neutral-600">
          Esta pantalla solo la ve el usuario autenticado.
        </p>

        <div className="mt-6 rounded-xl border border-neutral-200 bg-neutral-50 p-4">
          <p className="text-sm text-neutral-700">
            <span className="font-medium">current_user.id:</span> {session.user.id}
          </p>
          <p className="mt-1 text-sm text-neutral-700">
            <span className="font-medium">current_user.username:</span> {session.user.username}
          </p>
        </div>

        <div className="mt-6">
          <Link
            href="/"
            className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-900 transition hover:bg-neutral-100"
          >
            Volver al inicio
          </Link>
        </div>
      </section>
    </main>
  );
}
