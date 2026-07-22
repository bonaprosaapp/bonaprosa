import { ErrorState } from "@/components/states/ErrorState";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <ErrorState
      title="Página não encontrada."
      description="Confira o endereço ou retorne ao início."
      action={<ButtonLink href="/">Voltar ao início</ButtonLink>}
    />
  );
}

