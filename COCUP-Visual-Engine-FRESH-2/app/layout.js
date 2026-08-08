import "./globals.css";

export const metadata = {
  title: "COCUP Visual Engine",
  description: "Kilitli COCUP maç sonucu görsel üreticisi"
};

export default function RootLayout({ children }) {
  return <html lang="tr"><body>{children}</body></html>;
}
