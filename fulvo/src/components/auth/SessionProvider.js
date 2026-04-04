"use client";

import { useEffect } from "react";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import { signOut, useSession } from "next-auth/react";
import { shouldForceEphemeralSignOut, clearRememberChoiceState } from "@/lib/remember-session";

function SessionLifespanGuard() {
  const { status } = useSession();

  useEffect(() => {
    if (status !== "authenticated") {
      return;
    }

    if (!shouldForceEphemeralSignOut()) {
      return;
    }

    clearRememberChoiceState();
    signOut({ callbackUrl: "/login" });
  }, [status]);

  return null;
}

export default function SessionProvider({ children }) {
  return (
    <NextAuthSessionProvider>
      <SessionLifespanGuard />
      {children}
    </NextAuthSessionProvider>
  );
}
