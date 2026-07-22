# Registro de decisões

## Formato

```md
## DEC-000 — Título
- Data:
- Status: proposta | aprovada | substituída
- Contexto:
- Decisão:
- Consequências:
- Substitui:
```

## DEC-001 — Monólito modular

- Data: 18 de julho de 2026
- Status: aprovada
- Contexto: o MVP precisa ser simples de construir e manter, mas preparado para crescimento.
- Decisão: usar uma aplicação Next.js modular com TypeScript como linguagem principal.
- Consequências: não criar microserviços ou serviço Python até existir necessidade comprovada.
- Substitui: nenhuma.

## DEC-002 — Design substituível

- Data: 18 de julho de 2026
- Status: aprovada
- Contexto: o design é a parte mais incerta e poderá mudar bastante.
- Decisão: separar tokens, componentes visuais, conteúdo, regras de produto e integrações.
- Consequências: páginas não concentram regras e cores não ficam espalhadas.
- Substitui: nenhuma.

## DEC-003 — Planos e preços em Real Brasileiro

- Data: 18 de julho de 2026
- Status: aprovada
- Contexto: havia divergências entre documentos e a landing.
- Decisão:
  - Basic: R$ 47,99 por mês, `4799` centavos;
  - Pro: R$ 97,99 por mês, `9799` centavos;
  - Vitalício: R$ 499,00 em pagamento único, `49900` centavos;
  - moeda: `BRL`.
- Consequências: o catálogo do servidor é a fonte oficial. Interface em português usa `Vitalício`.
- Substitui: Basic R$ 47; Pro R$ 97; Ultra R$ 497; nome Ultra; nome Lifetime.

## DEC-004 — Fluxos completos e pequenos

- Data: 18 de julho de 2026
- Status: aprovada
- Contexto: muitas funções parcialmente prontas dificultariam validação e manutenção.
- Decisão: desenvolver uma funcionalidade pequena de ponta a ponta por vez.
- Consequências: frontend, regra, dados, segurança e teste da função evoluem juntos.
- Substitui: abordagem de construir todo o frontend e somente depois todo o backend.

## DEC-005 — Contraste das ações preenchidas

- Data: 18 de julho de 2026
- Status: aprovada
- Contexto: o verde principal `#4E9F70` com texto branco alcança cerca de 3,22:1 e não atende ao contraste mínimo para o texto normal dos botões.
- Decisão: preservar `#4E9F70` como cor principal da marca e usar o verde escuro oficial `#2F6F4E` em ações preenchidas com texto branco.
- Consequências: os tokens semânticos priorizam acessibilidade sem inventar uma nova cor; um teste automatizado protege a relação mínima de 4,5:1.
- Substitui: uso do verde principal como fundo de botão com texto branco pequeno.
