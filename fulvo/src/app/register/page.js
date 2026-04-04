import { redirect } from "next/navigation";

export const metadata = {
  title: "Register | Fulvo",
};

export default function RegisterPage() {
  redirect("/login?tab=register");
}
