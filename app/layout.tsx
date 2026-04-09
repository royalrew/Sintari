import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Sintari — Praktisk AI för företag i Skaraborg",
  description: "Vi hjälper lokala företag i Skaraborg spara tid med smart AI. Inget krångel, bara verktyg som faktiskt gör nytta i vardagen.",
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
