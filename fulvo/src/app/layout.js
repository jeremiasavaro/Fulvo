import "./globals.css";

export const metadata = {
  title: "Fulvo",
  description: "Minimal backend starter",
};

export default function RootLayout({ children }) {
  return <html lang="es"><body>{children}</body></html>;
}
