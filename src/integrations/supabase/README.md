# Integração com Supabase

Esta pasta será a única fronteira da aplicação com os clientes do Supabase.

Na fundação, somente a CLI local e a primeira migration estão configuradas. O cliente de aplicação será adicionado junto do fluxo de cadastro, evitando uma dependência sem uso real.

Regras obrigatórias:

- cliente público usa apenas URL e chave publicável;
- `service_role` permanece exclusivamente no servidor;
- tabelas expostas usam RLS com negação por padrão;
- páginas e componentes visuais não consultam o Supabase diretamente.

