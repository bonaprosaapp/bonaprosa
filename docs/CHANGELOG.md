# Changelog

## 28 de julho de 2026

### Código

- incorporada a landing page à árvore canônica `src/app`;
- removida a árvore duplicada `app/` da raiz;
- corrigido o alias `@/*` para resolver módulos dentro de `src/`;
- restaurados os scripts e as dependências de typecheck, lint e testes;
- alinhados `package.json`, lockfile, README e documentação de arquitetura;
- corrigido o build de produção executado pela Vercel.

### Verificação

- typecheck, lint, testes unitários e build de produção executados localmente.

## 18 de julho de 2026

### Documentação

- criado conjunto inicial de instruções para desenvolvimento com Codex;
- definida arquitetura de monólito modular;
- definido fluxo principal do MVP;
- registradas regras de branding, segurança, privacidade e feedback por IA;
- criado mapa inicial de telas e dados;
- definidos preços oficiais em BRL:
  - Basic: R$ 47,99/mês;
  - Pro: R$ 97,99/mês;
  - Vitalício: R$ 499,00 em pagamento único.

### Código

- criada a fundação Next.js com React e TypeScript estrito em `src/`;
- configurados typecheck, lint, testes unitários, build e lockfile reproduzível;
- adicionados tokens oficiais, estilos globais mínimos e componentes base;
- adicionados estados globais de loading, erro e página não encontrada;
- adicionados os ativos oficiais de logo e do mascote Bono em `public/`;
- criado logger estruturado que descarta campos não permitidos e remove query strings;
- integrada a captura de erros não tratados do servidor à instrumentação oficial do Next;
- configurada a CLI local do Supabase com confirmação de e-mail e suporte a MFA TOTP;
- criada a primeira migration de `profiles` com RLS e permissões mínimas;
- adicionados 13 testes pgTAP para criação de perfil, isolamento entre usuários e operações negadas;
- adicionados CSP e cabeçalhos HTTP básicos de segurança;
- carregada a fonte Inter Variable localmente;
- ajustado o token de ação preenchida para contraste AA e criado teste automatizado;
- corrigida vulnerabilidade transitiva do PostCSS por override compatível;
- criada uma tela temporária de fundação, sem simular recursos futuros.

### Verificação

- typecheck, lint, 4 testes unitários e build de produção executados com sucesso;
- auditoria npm concluída sem vulnerabilidades conhecidas;
- execução local da migration e dos 13 testes pgTAP pendente porque o ambiente atual não possui Docker Desktop ativo.
