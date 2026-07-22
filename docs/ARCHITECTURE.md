# Arquitetura da aplicação

## Estratégia

Usar um monólito modular em Next.js. A aplicação é única, mas as responsabilidades são separadas por domínio.

Camadas:

1. marca e design;
2. telas e experiência;
3. regras do produto;
4. integrações e infraestrutura.

## Estado atual da fundação

A Etapa 0 inicia diretamente em `src/`, sem migrar a landing monolítica de inspiração. Foram materializadas somente áreas com responsabilidade atual:

- `src/app`: layout, rota temporária, loading, not found e limites globais de erro;
- `src/components`: componentes base, marca e estados compartilhados;
- `src/content`: conteúdo da tela temporária separado da rota;
- `src/integrations/supabase`: contrato e limites documentados, ainda sem cliente de aplicação;
- `src/server/observability`: logger estruturado com lista de campos permitidos, acionado por `src/instrumentation.ts` em erros não tratados no servidor;
- `src/styles`: tokens oficiais, reset, utilitários e movimento reduzido;
- `supabase`: configuração local e migration inicial de `profiles`.

As demais pastas serão criadas junto da primeira funcionalidade real que precisar delas. Isso evita diretórios vazios e abstrações antecipadas.

## Estrutura-alvo

```text
src/
├── app/             # rotas, layouts e composição
├── components/      # componentes visuais compartilhados
│   ├── ui/
│   ├── layout/
│   ├── brand/
│   └── states/
├── features/        # regras e UI de cada domínio
│   ├── identity/
│   ├── billing/
│   ├── onboarding/
│   ├── content/
│   ├── learning/
│   ├── audio-analysis/
│   ├── progress/
│   ├── profile/
│   ├── privacy/
│   └── admin/
├── integrations/    # fornecedores externos
│   ├── supabase/
│   ├── payment/
│   ├── transcription/
│   ├── feedback-ai/
│   └── email/
├── server/          # auth, banco, permissões, jobs e logs
├── shared/          # tipos, schemas, erros e utilitários
├── content/         # textos e navegação
└── styles/          # tokens, reset e utilitários
```

Se o projeto atual ainda usa `app/` na raiz, não mover tudo em uma única tarefa. A migração para `src/` pode ocorrer gradualmente quando trouxer benefício concreto.

## Dependências permitidas entre camadas

- `app` pode usar `features`, `components`, `server` e `shared`.
- `features` pode usar `components`, `integrations`, `server` e `shared`.
- `components/ui` não conhece Supabase, pagamento ou regras de plano.
- `integrations` implementa contratos internos e não renderiza interface.
- `shared` não depende de páginas ou de uma funcionalidade específica.

Evitar dependências circulares entre funcionalidades.

## Padrão de uma funcionalidade

```text
features/audio-analysis/
├── components/
├── actions/
├── services/
├── schemas/
├── types/
├── constants/
├── tests/
└── README.md
```

O `README.md` local deve informar objetivo, estados, permissões, tabelas, eventos, integrações e critérios de aceite.

## Integrações

O restante da aplicação deve usar contratos internos estáveis, por exemplo:

- `PaymentProvider.createCheckout()`;
- `PaymentProvider.verifyWebhook()`;
- `StorageProvider.createUpload()`;
- `TranscriptionProvider.transcribe()`;
- `FeedbackProvider.generateStructuredFeedback()`;
- `EmailProvider.sendTransactional()`.

Não criar sistema complexo de plugins. Um contrato simples e uma implementação são suficientes no MVP.

## Conteúdo e configuração

- textos da landing: `content/marketing`;
- navegação: `content/navigation`;
- mensagens reutilizáveis: `content/messages`;
- preço e plano: catálogo seguro do servidor;
- cores e medidas: `styles/tokens`;
- segredos: variáveis de ambiente do servidor;
- regras de banco: migrations e políticas RLS versionadas.

## Performance inicial

- páginas públicas estáticas ou com cache;
- carregar somente dados necessários no dashboard;
- upload de áudio direto e privado quando suportado;
- resultado assíncrono quando a análise exceder poucos segundos;
- não adicionar fila antes de medir limites e falhas;
- imagens otimizadas e scripts de terceiros mínimos.
