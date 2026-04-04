"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";

const TABS = {
  LOGIN: "login",
  REGISTER: "register",
};

function getValidTab(rawTab) {
  if (rawTab === TABS.REGISTER) {
    return TABS.REGISTER;
  }

  return TABS.LOGIN;
}

export default function AuthPanel() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = useMemo(() => getValidTab(searchParams.get("tab")), [searchParams]);
  const [mode, setMode] = useState(currentTab);

  useEffect(() => {
    setMode(currentTab);
  }, [currentTab]);

  function changeMode(nextMode) {
    const validatedTab = getValidTab(nextMode);
    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.set("tab", validatedTab);
    router.replace(`${pathname}?${nextParams.toString()}`);
    setMode(validatedTab);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_15%_20%,#0f6936_0%,#0b2e1f_44%,#091511_100%)] px-4 py-6 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDHJs9Yzq82nOrol1-Jp_v5Q9VST_rr7x7t6O8uoKHgNhT6ye57yhTWMiEP8Lk808wlLzdwqgb-N_CK2XpEYlM2zs40cSr0l7mVuyDKY_2BkWGBqSfCTh-l6qfxniSFZcBBvEtbkCQG6_j48Q561b9y77E4kx_-GHHP0ONLHjiu2XvV9h3NjBby-js_vDy9lt6e1v208WzH-WjonO-8-IaCtQ6iKa8fZYdM9WZHOQEzudSRXKoiBYS_vrq55wZki5c4b98lhuzxRXE9')",
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(7,14,10,0.94),rgba(8,20,15,0.52)_45%,rgba(0,0,0,0.2))]" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-7xl items-center justify-center">
        <section className="grid w-full overflow-hidden rounded-4xl bg-white/5 shadow-[0_18px_60px_rgba(3,10,7,0.55)] backdrop-blur-[2px] lg:grid-cols-12">
          <aside className="hidden bg-emerald-700/15 p-10 text-white lg:col-span-7 lg:flex lg:flex-col lg:justify-between">
            <div>
              <h1 className="font-headline text-5xl font-black tracking-[-0.04em] text-emerald-300">
                FULVO
              </h1>
              <p className="mt-4 max-w-md text-lg text-emerald-50/95">
                Futbol Amateur Elite. Scouting, partidos y gloria empiezan aqui.              </p>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <article className="rounded-2xl bg-white/10 p-6 backdrop-blur-md">
                <div className="text-3xl text-emerald-300">O</div>
                <h2 className="mt-3 font-headline text-xl font-semibold">Encontrar partidos</h2>
                <p className="mt-2 text-sm text-emerald-50/80">
                  Conecta con otras personas y organiza o unete a sus partidos!!.
                </p>
              </article>
              <article className="rounded-2xl bg-white/10 p-6 backdrop-blur-md">
                <div className="text-3xl text-amber-300">*</div>
                <h2 className="mt-3 font-headline text-xl font-semibold">Ganar trofeos</h2>
                <p className="mt-2 text-sm text-emerald-50/80">
                  Únete a torneos con tu equipo y compite a maximo nivel.
                </p>
              </article>
            </div>

            <p className="text-sm text-emerald-50/80">
              Únete a 500+ jugadores.
            </p>
          </aside>

          <section className="bg-[#f9faf9] p-6 sm:p-8 lg:col-span-5 lg:p-10">
            <div className="mx-auto flex h-full w-full max-w-md flex-col">
              <div className="mb-7 flex items-center justify-between">
                <span className="font-headline text-xl font-black tracking-tight text-emerald-700 lg:hidden">
                  FULVO
                </span>
                <div className="inline-flex rounded-full bg-neutral-200 p-1">
                  <button
                    type="button"
                    onClick={() => changeMode(TABS.LOGIN)}
                    aria-pressed={mode === TABS.LOGIN}
                    className={`rounded-full px-5 py-2 font-headline text-sm font-bold transition ${
                      mode === TABS.LOGIN
                        ? "bg-emerald-700 text-white shadow"
                        : "text-neutral-700 hover:text-neutral-900"
                    }`}
                  >
                    Inicar Sesion
                  </button>
                  <button
                    type="button"
                    onClick={() => changeMode(TABS.REGISTER)}
                    aria-pressed={mode === TABS.REGISTER}
                    className={`rounded-full px-5 py-2 font-headline text-sm font-bold transition ${
                      mode === TABS.REGISTER
                        ? "bg-emerald-700 text-white shadow"
                        : "text-neutral-700 hover:text-neutral-900"
                    }`}
                  >
                    Registrarse
                  </button>
                </div>
              </div>

              <div className="flex-1">
                {mode === TABS.LOGIN ? (
                  <LoginForm key="login-form" onSwitchMode={() => changeMode(TABS.REGISTER)} />
                ) : (
                  <RegisterForm key="register-form" onSwitchMode={() => changeMode(TABS.LOGIN)} />
                )}
              </div>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}