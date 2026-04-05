import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Sintari — AI-konsult för svenska företag",
  description: "Praktisk AI för industri och tillverkning. RAG-system, automatisering och datastrukturering med fast pris och tydlig leverans.",
  openGraph: {
    title: "Sintari — AI-konsult för svenska företag",
    description: "Praktisk AI för industri och tillverkning.",
    locale: "sv_SE",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
