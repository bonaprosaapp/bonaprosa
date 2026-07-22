# Bona Prosa

Plataforma web de assinatura para o desenvolvimento de oratória, dicção, vocabulário e comunicação em português brasileiro.

Este repositório está na **Etapa 0 — Fundação**. A base técnica, o design system inicial, a observabilidade segura e o primeiro esquema do Supabase estão preparados. A landing page será reorganizada na próxima etapa, sem copiar a implementação monolítica usada como inspiração.

## Pré-requisitos

- Node.js 22 LTS ou 24 ou superior;
- npm 10 ou superior;
- Docker Desktop para executar o Supabase local.

## Primeiros passos

```bash
npm install
Copy-Item .env.example .env.local
npm run db:start
npm run dev
```

No macOS ou Linux, substitua o segundo comando por `cp .env.example .env.local`.

## Verificações

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

Para validar o banco local depois de iniciar o Docker:

```bash
npm run db:start
npm run db:reset
npm run db:lint
npm run db:test
```

## Organização atual

- `src/app`: rotas e composição de telas;
- `src/components`: componentes visuais e estados compartilhados;
- `src/integrations`: fronteiras com fornecedores externos;
- `src/server`: código exclusivo do servidor;
- `src/styles`: tokens e fundamentos visuais;
- `supabase`: configuração local e migrations versionadas;
- `docs`: memória oficial do produto;
- `templates`: modelos de tarefa e especificação de tela.

Leia [AGENTS.md](./AGENTS.md) e [docs/00_START_HERE.md](./docs/00_START_HERE.md) antes de alterar o projeto.
