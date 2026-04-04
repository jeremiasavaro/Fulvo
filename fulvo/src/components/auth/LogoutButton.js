"use client";

import { signOut } from "next-auth/react";
import { clearRememberChoiceState } from "@/lib/remember-session";

export default function LogoutButton() {
  return (
    <button
      type="button"
      onClick={() => {
        clearRememberChoiceState();
        signOut({ callbackUrl: "/" });
      }}
      className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-900 transition hover:bg-neutral-100"
    >
      Cerrar sesion
    </button>
  );
}
