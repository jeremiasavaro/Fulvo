import "./globals.css";
import SessionProvider from "@/components/auth/SessionProvider";

export const metadata = {
  title: "Fulvo",
  description: "Minimal backend starter",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
