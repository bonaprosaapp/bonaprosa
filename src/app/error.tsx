"use client";

import { ErrorState } from "@/components/states/ErrorState";
import { Button } from "@/components/ui/Button";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <ErrorState
      title="Não foi possível carregar esta página."
      description="Tente novamente. Se o problema continuar, volte mais tarde."
      action={<Button onClick={reset}>Tentar novamente</Button>}
    />
  );
}

