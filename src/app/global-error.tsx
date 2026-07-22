"use client";

import { ErrorState } from "@/components/states/ErrorState";
import { Button } from "@/components/ui/Button";

import "./globals.css";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ reset }: GlobalErrorProps) {
  return (
    <html lang="pt-BR">
      <body>
        <ErrorState
          title="O Bona Prosa encontrou um problema."
          description="Nenhum detalhe sensível foi exibido. Tente carregar a aplicação novamente."
          action={<Button onClick={reset}>Carregar novamente</Button>}
        />
      </body>
    </html>
  );
}

