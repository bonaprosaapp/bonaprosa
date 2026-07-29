# Bona Prosa

Plataforma web para desenvolver oratória, dicção, vocabulário e comunicação
em português brasileiro. A landing page e as rotas iniciais usam Next.js,
React e TypeScript na estrutura canônica `src/`.

## Executar localmente

```bash
npm ci
npm run dev
```

Abra `http://localhost:3000`.

## Verificações

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

O comando `npm run verify` executa todas as verificações na mesma sequência
usada antes de uma publicação.

## Estrutura principal

- `src/app`: landing page, autenticação, dashboard e estados globais;
- `src/components`: componentes compartilhados;
- `src/integrations`: integrações externas;
- `src/server`: código exclusivo do servidor;
- `src/styles`: tokens e fundamentos visuais;
- `supabase`: configuração, migrations e testes do banco;
- `docs`: decisões e documentação oficial do produto.

Leia `AGENTS.md` e `docs/00_START_HERE.md` antes de alterar o projeto.
