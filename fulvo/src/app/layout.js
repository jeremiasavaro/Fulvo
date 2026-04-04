import "./globals.css";
import SessionProvider from "@/components/auth/SessionProvider";
import { Lexend, Manrope } from "next/font/google";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata = {
  title: "Fulvo",
  description: "Minimal backend starter",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${lexend.variable} ${manrope.variable}`}>
      <body className="font-body">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
