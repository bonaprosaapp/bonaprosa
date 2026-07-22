# Telas e rotas

## Fluxo principal

`/ → /cadastro → /verificar-email → /planos → checkout → /app/onboarding → /app/dashboard → aula → exercício → processamento → resultado → progresso`

## Tela temporária da fundação

- Rota: `/`
- Objetivo: confirmar visualmente que a base técnica e o design system carregam corretamente antes da landing definitiva.
- Quem pode acessar: qualquer visitante.
- Pré-condições: nenhuma.
- Dados necessários: conteúdo estático de `src/content/foundation.ts`.
- Componentes reutilizados: `Logo`, `BonoMascot`, `ButtonLink`, `Card` e `Alert`.
- Ação principal: navegar até o resumo da fundação na própria página.
- Ações secundárias: nenhuma.
- Estados: sucesso estático; loading, erro global e página não encontrada são tratados pelos limites de `src/app`.
- Validações: nenhuma entrada de usuário é coletada.
- Eventos de produto: nenhum; telemetria de produto ainda não foi conectada.
- Critérios de aceite:
  1. renderiza em português brasileiro e funciona sem JavaScript do cliente;
  2. usa somente tokens oficiais e componentes compartilhados;
  3. informa claramente que autenticação, pagamentos, aulas e voz ainda não estão implementados;
  4. mantém leitura e navegação por teclado em mobile e desktop.
- Fora do escopo: conteúdo final da landing, demonstração interativa, cadastro, checkout e métricas promocionais.

Esta tela é transitória e será substituída na Etapa 1 pelo contrato definitivo da landing descrito abaixo.

## Área pública

| Rota | Objetivo | Ação principal |
| --- | --- | --- |
| `/` | apresentar proposta, benefícios, experiência e planos | começar ou escolher plano |
| `/planos` | comparar planos | iniciar checkout |
| `/entrar` | autenticar | entrar |
| `/cadastro` | criar conta | cadastrar |
| `/verificar-email` | orientar confirmação | reenviar ou continuar |
| `/recuperar-senha` | solicitar recuperação | enviar instruções |
| `/redefinir-senha` | trocar senha | salvar nova senha |
| `/termos` | termos de uso | consultar |
| `/privacidade` | política de privacidade | consultar |
| `/suporte` | contato e ajuda | enviar solicitação |

## Área do aluno

| Rota | Objetivo | Ação principal |
| --- | --- | --- |
| `/app/onboarding` | coletar objetivo, nível e interesses mínimos | concluir onboarding |
| `/app/dashboard` | mostrar próxima atividade e progresso | continuar treino |
| `/app/trilhas` | listar módulos | abrir módulo |
| `/app/trilhas/[moduleSlug]` | listar aulas | abrir aula |
| `/app/aulas/[lessonId]` | ensinar e preparar prática | iniciar exercício |
| `/app/exercicios/[exerciseId]` | instruir, consentir, gravar e enviar | enviar gravação |
| `/app/tentativas/[attemptId]/processando` | acompanhar análise | aguardar ou sair |
| `/app/tentativas/[attemptId]/resultado` | apresentar orientação | seguir próxima ação |
| `/app/progresso` | mostrar histórico e evolução | abrir tentativa |
| `/app/perfil` | dados e preferências | salvar |
| `/app/perfil/assinatura` | plano, status e cancelamento | gerenciar assinatura |
| `/app/perfil/privacidade` | consentimentos, exportação e exclusão | solicitar ação |

## Administração mínima

| Rota | Objetivo |
| --- | --- |
| `/admin` | resumo operacional |
| `/admin/conteudo` | módulos, aulas e exercícios |
| `/admin/usuarios` | conta e acesso com menor privilégio |
| `/admin/assinaturas` | divergências entre pagamento e acesso |
| `/admin/processamentos` | tentativas falhas e reprocessamento auditado |

## Contrato obrigatório de tela

Antes de criar uma nova tela, preencher:

```md
## Nome
- Rota:
- Objetivo:
- Quem pode acessar:
- Pré-condições:
- Dados necessários:
- Componentes reutilizados:
- Ação principal:
- Ações secundárias:
- Estados:
- Validações:
- Eventos de produto:
- Critérios de aceite:
- Fora do escopo:
```

## Componentes prioritários

- Button, Input, PasswordInput, Checkbox, RadioCard e Select;
- Modal, Drawer, Alert, Toast e ProgressBar;
- LoadingState, EmptyState, ErrorState e PermissionDeniedState;
- PublicHeader, StudentSidebar, MobileNavigation e Footer;
- Logo e BonoMascot;
- PlanCard, ModuleCard e LessonCard;
- AudioRecorder, RecordingPreview e ProcessingStatus;
- FeedbackSummary, FeedbackPriorityCard e ProgressSummary.
