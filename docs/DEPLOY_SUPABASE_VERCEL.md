# Supabase + Vercel

## Supabase conectado

Projeto: `Bona Prosa Application` (`vlmizleoxlpzzvnktppy`).

A migração `supabase/migrations/20260718000100_create_profiles.sql` já foi aplicada. Ela cria `public.profiles`, o gatilho de criação automática de perfil e políticas RLS para cada aluno acessar apenas os próprios dados.

## Variáveis de ambiente

Configure localmente em `.env.local` e no Vercel, nos ambientes Development, Preview e Production:

```env
NEXT_PUBLIC_APP_URL=https://seu-dominio.vercel.app
NEXT_PUBLIC_SUPABASE_URL=https://vlmizleoxlpzzvnktppy.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<chave-publicavel-do-projeto>
```

A chave publicável pode ficar no navegador. Nunca use a chave `service_role` em variáveis `NEXT_PUBLIC_*`.

## Implantação no Vercel

1. Importe este diretório como um projeto Next.js.
2. Use Node.js 22 ou superior.
3. Cadastre as três variáveis acima.
4. Execute o build padrão: `npm run build`.
5. No Supabase Auth, configure a URL do site e as URLs de redirecionamento para o domínio de produção e previews necessários.

O arquivo `vercel.json` já identifica o framework e o comando de build.
