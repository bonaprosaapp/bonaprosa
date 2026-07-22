# Modelo de dados inicial

## Princípios

- usar UUIDs gerados de forma segura;
- registrar datas em UTC;
- usar migrations versionadas;
- aplicar RLS por operação;
- negar acesso por padrão;
- não armazenar valor monetário em ponto flutuante;
- não criar tabela sem funcionalidade aprovada;
- separar dados pedagógicos de cobrança e de auditoria.

## Tabelas do MVP

| Tabela | Responsabilidade |
| --- | --- |
| `profiles` | dados mínimos e papel do usuário |
| `subscriptions` | plano, status, período e identificadores do gateway |
| `modules` | módulos de aprendizagem |
| `lessons` | aulas pertencentes a um módulo |
| `exercises` | instrução, tipo, duração, limites e rubrica |
| `attempts` | tentativa, proprietário, arquivo e estado |
| `attempt_results` | transcrição, métricas e feedback estruturado |
| `lesson_progress` | início, conclusão e última atividade |
| `feedback_ratings` | utilidade percebida do feedback |
| `consents` | finalidade, versão, resposta e data |
| `privacy_requests` | exportação, correção ou exclusão |
| `webhook_events` | eventos de pagamento e idempotência |
| `admin_audit_logs` | ações administrativas relevantes |

## Estado implementado

A fundação cria somente `profiles`, por meio de `supabase/migrations/20260718000100_create_profiles.sql`. A tabela é vinculada a `auth.users`, ativa RLS e permite ao usuário autenticado ler o próprio perfil e atualizar apenas `display_name`.

O papel começa como `student` e não pode ser alterado pelo cliente. As outras tabelas deste documento serão criadas somente junto da funcionalidade aprovada que as utilizar.

O isolamento da entidade é especificado em `supabase/tests/database/profiles_rls.test.sql`, com dois usuários, visitante anônimo e tentativas de alterar colunas protegidas.

## Assinaturas

Campos conceituais:

- `user_id`;
- `plan_code`: `basic`, `pro` ou `vitalicio`;
- `status`;
- `currency`: `BRL`;
- `amount_in_cents`;
- `billing_type`: `recurring` ou `one_time`;
- `provider_customer_id`;
- `provider_subscription_id` ou `provider_payment_id`;
- `current_period_start` e `current_period_end` quando aplicáveis;
- `created_at` e `updated_at`.

Não guardar dados completos do cartão.

## Estado da tentativa

Estados mínimos:

- `created`;
- `uploaded`;
- `processing`;
- `completed`;
- `failed`;
- `deleted`.

Transições:

```text
created → uploaded → processing → completed
                              ↘ failed → processing
created/uploaded/completed/failed → deleted
```

O progresso só é atualizado após uma regra determinística confirmar a conclusão. A resposta livre da IA não decide isso.

## Resultado estruturado

O resultado deve guardar:

- transcrição e idioma;
- métricas objetivas permitidas;
- resumo;
- pontos fortes com evidências;
- prioridade de melhoria com ação prática;
- próxima atividade sugerida;
- limitações;
- versão da rubrica;
- provedor/modelo e status técnico;
- timestamps.

## Dados futuros não criar agora

- organizações;
- equipes;
- ranking;
- feed social;
- análise de vídeo;
- marketplace;
- modelo próprio de vocabulário;
- gamificação complexa.
