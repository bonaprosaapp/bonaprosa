# AGENTS.md — Bona Prosa

Estas instruções se aplicam a todo o repositório. Arquivos `AGENTS.md` mais específicos podem adicionar regras locais, mas não podem enfraquecer segurança, privacidade, branding ou decisões comerciais registradas aqui.

## 1. Antes de alterar o projeto

1. Leia `docs/00_START_HERE.md`.
2. Leia o documento relacionado à tarefa.
3. Inspecione o código e os testes existentes antes de propor uma nova estrutura.
4. Preserve alterações do usuário e não faça mudanças fora do escopo.
5. Se documentos e código divergirem, informe o conflito. Não escolha silenciosamente.

## 2. Objetivo do produto

O Bona Prosa é uma plataforma web de assinatura para desenvolver oratória, dicção, vocabulário e comunicação em português brasileiro.

Fluxo principal do MVP:

`Landing → Cadastro → Verificação → Plano → Pagamento → Onboarding → Dashboard → Aula → Exercício de voz → Feedback → Progresso`

O MVP deve provar:

1. pessoas querem aprender pela plataforma;
2. pessoas concluem exercícios de comunicação;
3. o feedback é percebido como útil.

## 3. Princípios de implementação

- Comece pela solução mais simples que atenda ao requisito atual.
- Desenvolva uma funcionalidade pequena e completa por vez.
- Use um monólito modular; não crie microserviços no MVP.
- Use TypeScript como linguagem principal.
- Não adicione Python, worker ou fila antes de uma necessidade medida.
- Reutilize componentes, tipos, validações e serviços existentes.
- Não crie abstração genérica sem pelo menos um uso claro e uma necessidade real.
- Páginas compõem a interface; regras ficam em módulos de funcionalidade.
- Fornecedores externos ficam isolados em integrações.
- Consultas ao banco não devem ficar espalhadas em componentes visuais.
- Não instale dependências sem justificar por que o projeto atual não resolve a necessidade.

## 4. Arquitetura-alvo

- Aplicação: Next.js + React + TypeScript estrito.
- Banco, autenticação e arquivos privados: Supabase.
- Estilos: CSS Variables e CSS Modules.
- Pagamentos: gateway externo chamado apenas pelo servidor.
- Transcrição e IA: provedores externos chamados apenas pelo servidor.
- Estrutura: `app`, `components`, `features`, `integrations`, `server`, `shared`, `content` e `styles`.

Não refatore todo o repositório de uma vez para alcançar a estrutura-alvo. Faça migrações pequenas junto com funcionalidades reais.

## 5. Planos oficiais

| Código | Nome exibido | Cobrança | Preço BRL | Centavos |
| --- | --- | --- | ---: | ---: |
| `basic` | Basic | mensal recorrente | R$ 47,99 | `4799` |
| `pro` | Pro | mensal recorrente | R$ 97,99 | `9799` |
| `vitalicio` | Vitalício | pagamento único | R$ 499,00 | `49900` |

Regras:

- Moeda: `BRL`.
- Não usar `float` para dinheiro; usar centavos inteiros.
- O servidor é a fonte oficial de preço, plano e benefício.
- O navegador envia apenas o código do plano.
- O servidor valida o código e cria o checkout com dados confiáveis.
- Não alterar nome, preço, periodicidade ou promessa sem decisão explícita dos fundadores.
- Não usar os nomes `Ultra` ou `Lifetime` na interface atual. O nome oficial é `Vitalício`.

## 6. Branding e design

- Personalidade: acolhedora, clara, brasileira, moderna e motivadora.
- Evitar linguagem infantilizada, promessas absolutas e excesso de termos técnicos.
- Usar verde, azul, amarelo e branco com brasilidade sutil.
- Usar os tokens de `docs/BRAND.md`; não espalhar códigos de cor pelas páginas.
- Preservar as cores e características oficiais do mascote Bono.
- O design é substituível: regras do produto não podem depender de aparência, animação ou posição visual.
- Mobile first.
- Não cortar texto ou conteúdo para corrigir layout.
- Não usar altura fixa em contêiner com texto variável.
- Não usar `overflow: hidden` para esconder erro de dimensionamento.
- Respeitar teclado, foco visível, contraste, zoom e movimento reduzido.

## 7. Segurança e privacidade

- Nunca expor service role, chave de pagamento, chave de IA ou segredo no cliente.
- Usar Supabase Auth; não implementar armazenamento próprio de senha.
- Aplicar RLS a tabelas expostas e testar isolamento entre usuários.
- Validar sessão, autorização e entrada no servidor.
- Áudio sempre privado, com upload controlado e URL temporária.
- Validar tipo, tamanho, duração e frequência de arquivos.
- Validar assinatura de webhook e garantir idempotência.
- Não confiar em preço, papel, plano ou permissão enviados pelo navegador.
- Não registrar senha, token, cookie, cartão, áudio bruto ou prompt completo com dados pessoais.
- Administradores devem usar MFA e menor privilégio.
- Exportação e exclusão de dados precisam de confirmação e auditoria adequadas.

## 8. Regras para IA e feedback

- A IA não é um avaliador mágico nem uma fonte de verdade absoluta.
- Combinar transcrição, métricas determinísticas, rubrica pedagógica e modelo de linguagem.
- Validar a resposta do modelo contra schema antes de salvar.
- Texto livre da IA não altera cobrança, acesso ou progresso diretamente.
- Informar limitações da transcrição e da análise.
- Não alegar detecção de mentira, emoção, personalidade, saúde ou capacidade profissional.
- Registrar versão da rubrica, provedor/modelo, duração, status e custo quando disponível.

## 9. Estados obrigatórios da interface

Quando aplicável, prever:

- inicial;
- carregando;
- vazio;
- sucesso;
- erro;
- sem conexão;
- acesso bloqueado;
- permissão negada;
- desabilitado;
- nova tentativa.

## 10. Como executar uma tarefa

1. Resuma o comportamento esperado.
2. Liste arquivos que provavelmente serão alterados.
3. Implemente a menor mudança completa.
4. Atualize tipos, validações e testes relacionados.
5. Atualize a documentação se houver nova decisão.
6. Execute os comandos disponíveis de typecheck, lint, testes e build na proporção do risco.
7. Revise responsividade, acessibilidade, autorização e estados de falha.
8. Entregue um resumo objetivo com arquivos alterados, verificações e pendências reais.

## 11. Proibições

- Não reescrever áreas não relacionadas.
- Não remover alterações existentes sem autorização.
- Não usar dados reais de produção em testes.
- Não inserir segredo em código, exemplo, log ou commit.
- Não duplicar preço, benefício ou regra crítica em vários componentes.
- Não marcar exercício como concluído após falha de transcrição ou feedback.
- Não criar funcionalidades futuras apenas para “deixar preparado”.
- Não afirmar que algo foi testado sem executar a verificação.

## 12. Definition of Done

Uma tarefa só está concluída quando:

- critérios de aceite são demonstráveis;
- tipos e validações estão consistentes;
- estados relevantes foram tratados;
- autorização foi verificada no servidor;
- mobile e acessibilidade foram considerados;
- testes relacionados passam;
- não há segredo ou dado sensível indevido;
- documentação afetada foi atualizada;
- o resumo final informa qualquer limitação restante.

