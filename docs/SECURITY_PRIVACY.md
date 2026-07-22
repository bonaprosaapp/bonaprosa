# Segurança e privacidade

## Autenticação

- usar Supabase Auth;
- confirmar e-mail antes de liberar recursos pagos;
- recuperação de senha sem enumerar e-mails;
- proteger contra tentativas em massa;
- invalidar sessões quando necessário;
- MFA obrigatório para administradores.

## Autorização e RLS

- RLS em toda tabela exposta;
- políticas separadas para SELECT, INSERT, UPDATE e DELETE;
- usuário acessa somente seus dados;
- papel administrativo não vem de metadado alterável pelo usuário;
- service role somente no servidor;
- testar acesso cruzado entre duas contas.

## Pagamentos

- catálogo oficial no servidor;
- checkout criado pelo servidor;
- webhook assinado;
- processamento idempotente;
- reconciliação entre gateway e assinatura;
- nenhuma informação completa de cartão no Bona Prosa;
- acesso liberado pelo estado confirmado no servidor.

## Áudio

- bucket privado;
- caminho organizado por usuário e tentativa;
- nome de arquivo gerado pelo servidor;
- lista permitida de MIME types;
- validar conteúdo, tamanho, duração e frequência;
- URLs assinadas de curta duração;
- política clara de retenção e exclusão;
- suporte não baixa gravação por padrão.

## Aplicação web

- validação de entrada e saída no servidor;
- proteção contra XSS, CSRF e abuso;
- CSP e cabeçalhos de segurança adequados;
- rate limits separados para login, checkout, upload, análise e admin;
- mensagens de erro sem detalhes internos;
- segredos separados por ambiente;
- nenhuma chave secreta em variável pública.

### Estado da fundação web

O `next.config.ts` envia CSP, bloqueio de frame, `nosniff`, política de referência e política de permissões. A CSP inicial restringe origens externas, objetos, formulários, frames, mídia e conexões. O runtime atual do Next ainda usa script inline na renderização; antes de adicionar scripts de terceiros ou conteúdo dinâmico sensível, a política deve evoluir para nonces por requisição e ser novamente testada.

Erros não tratados no servidor passam por `src/instrumentation.ts`, que registra apenas digest, tipo de operação e padrão de rota. Mensagem, URL acessada, cabeçalhos e dados do usuário não entram no log.

## Logs

Pode registrar:

- horário;
- ambiente;
- rota ou operação;
- código de erro;
- duração;
- identificador de correlação.

Não registrar:

- senha;
- token ou cookie;
- chave de API;
- cartão;
- áudio bruto;
- URL assinada completa;
- prompt completo com dados pessoais;
- transcrição completa sem necessidade aprovada.

## LGPD

- informar finalidade e retenção de cada dado;
- coletar somente o necessário;
- obter consentimento claro antes de gravar ou analisar áudio quando aplicável;
- separar consentimentos opcionais;
- permitir acesso, correção, exportação e exclusão conforme as regras legais;
- registrar versão do texto aceito;
- não usar gravações para treinamento próprio sem base legal e decisão explícita;
- não aceitar menores até existir definição de idade e fluxo adequado.

## Testes mínimos de segurança

- usuário A não lê ou altera dados do usuário B;
- arquivo privado não abre publicamente;
- plano e preço manipulados no cliente são rejeitados;
- webhook inválido é rejeitado;
- webhook repetido não duplica efeito;
- usuário comum não acessa admin;
- segredo não aparece no bundle do navegador;
- exclusão e exportação exigem a confirmação esperada.
