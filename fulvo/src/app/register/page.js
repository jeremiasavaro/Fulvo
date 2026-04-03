import RegisterForm from "@/components/auth/RegisterForm";

export const metadata = {
  title: "Register | Fulvo",
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-neutral-50 p-6 md:p-10">
      <RegisterForm />
    </main>
  );
}
