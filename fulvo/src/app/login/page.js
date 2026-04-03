import LoginForm from "@/components/auth/LoginForm";

export const metadata = {
  title: "Login | Fulvo",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-neutral-50 p-6 md:p-10">
      <LoginForm />
    </main>
  );
}
