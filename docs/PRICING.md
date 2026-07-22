# Planos e preços oficiais

## Catálogo aprovado

| Código interno | Nome | Periodicidade | Preço exibido | Valor em centavos | Moeda |
| --- | --- | --- | ---: | ---: | --- |
| `basic` | Basic | mensal recorrente | R$ 47,99 | `4799` | `BRL` |
| `pro` | Pro | mensal recorrente | R$ 97,99 | `9799` | `BRL` |
| `vitalicio` | Vitalício | pagamento único | R$ 499,00 | `49900` | `BRL` |

## Fonte oficial no código

O catálogo deve existir uma única vez no servidor. Exemplo conceitual:

```ts
export const PLAN_CATALOG = {
  basic: {
    code: "basic",
    name: "Basic",
    currency: "BRL",
    amountInCents: 4799,
    billingType: "recurring",
    interval: "month",
  },
  pro: {
    code: "pro",
    name: "Pro",
    currency: "BRL",
    amountInCents: 9799,
    billingType: "recurring",
    interval: "month",
  },
  vitalicio: {
    code: "vitalicio",
    name: "Vitalício",
    currency: "BRL",
    amountInCents: 49900,
    billingType: "one_time",
    interval: null,
  },
} as const;
```

O exemplo não contém IDs do gateway. IDs reais devem ficar em variáveis de ambiente do servidor ou em configuração segura.

## Regras obrigatórias

- usar inteiro em centavos para cálculo e persistência;
- formatar para `pt-BR` apenas na apresentação;
- não confiar no valor recebido do navegador;
- o navegador envia somente o código do plano;
- o servidor confirma se o plano está ativo e cria o checkout;
- confirmar pagamento por webhook assinado;
- tornar o webhook idempotente;
- liberar acesso a partir do estado confirmado no servidor;
- guardar o preço efetivamente contratado no registro financeiro quando necessário;
- benefícios exibidos devem corresponder a recursos realmente disponíveis;
- mudanças futuras de preço não podem alterar silenciosamente contratos existentes.

## Formatação de exibição

```ts
new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
}).format(amountInCents / 100);
```

## Nomenclatura atual

- usar `Basic`, `Pro` e `Vitalício`;
- não usar `Ultra`;
- não usar `Lifetime` na interface em português;
- Vitalício significa pagamento único de R$ 499,00, sujeito às condições comerciais e legais aprovadas pelos fundadores.

