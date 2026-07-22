# Observabilidade

O logger aceita nomes de evento estáveis e somente campos previamente permitidos. Campos livres são descartados para reduzir o risco de registrar senha, token, cookie, cartão, áudio, prompt ou transcrição.

Não passe mensagens de erro completas para `logEvent`. Registre um `errorCode` estável e mantenha detalhes sensíveis fora dos logs.

O campo `routePattern` recebe apenas o padrão estável da rota, como `/app/tentativas/[attemptId]/resultado`. Nunca envie a URL acessada, query string, slug ou identificador real.

