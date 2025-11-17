import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Pokémon Battle Arena",
  description: "Battaglie AI-driven con DeepSeek",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
