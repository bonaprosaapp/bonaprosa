import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bona Prosa | Fale com mais clareza e confiança",
  description:
    "Treinos curtos e orientações personalizadas para desenvolver sua comunicação.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
