import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sintari — AI-konsult för svenska företag",
  description: "Vi hjälper svenska industriföretag att spara tid och pengar med praktisk AI. RAG-system, automatisering och datastrukturering.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
