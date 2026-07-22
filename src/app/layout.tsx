import type { Metadata } from "next";
import type { ReactNode } from "react";

import "@fontsource-variable/inter";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Bona Prosa",
    template: "%s | Bona Prosa",
  },
  description:
    "Plataforma de desenvolvimento da comunicação em português brasileiro.",
  icons: {
    icon: "/brand/logos/bona-prosa-symbol.png",
  },
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
