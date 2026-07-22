# Testes do banco

Os testes pgTAP de `database/profiles_rls.test.sql` cobrem criação automática do perfil, isolamento entre dois usuários, anonimato e bloqueio de alterações em `role`, `id`, `INSERT` e `DELETE`.

Execute após iniciar o ambiente local:

```bash
npm run db:start
npm run db:reset
npm run db:test
```

Os testes exigem Docker e são revertidos ao final da transação.
