begin;

create extension if not exists pgtap with schema extensions;
set local search_path = public, extensions;

select plan(13);

insert into auth.users (id, email, raw_user_meta_data)
values
  (
    '11111111-1111-4111-8111-111111111111',
    'usuario-a@example.invalid',
    '{}'::jsonb
  ),
  (
    '22222222-2222-4222-8222-222222222222',
    'usuario-b@example.invalid',
    '{}'::jsonb
  );

select results_eq(
  $$
    select count(*)
    from public.profiles
    where id in (
      '11111111-1111-4111-8111-111111111111'::uuid,
      '22222222-2222-4222-8222-222222222222'::uuid
    )
  $$,
  array[2::bigint],
  'o gatilho cria um perfil para cada usuário do Auth'
);

select results_eq(
  $$
    select role::text
    from public.profiles
    where id in (
      '11111111-1111-4111-8111-111111111111'::uuid,
      '22222222-2222-4222-8222-222222222222'::uuid
    )
    order by id
  $$,
  array['student', 'student']::text[],
  'novos perfis sempre começam como student'
);

select is(
  (
    select relrowsecurity
    from pg_catalog.pg_class
    where oid = 'public.profiles'::regclass
  ),
  true,
  'profiles mantém RLS habilitada'
);

select set_config(
  'request.jwt.claim.sub',
  '11111111-1111-4111-8111-111111111111',
  true
);
set local role authenticated;

select results_eq(
  $$ select id from public.profiles order by id $$,
  array['11111111-1111-4111-8111-111111111111'::uuid],
  'usuário A lê somente o próprio perfil'
);

select lives_ok(
  $$
    update public.profiles
    set display_name = 'Usuário A'
    where id = '11111111-1111-4111-8111-111111111111'::uuid
  $$,
  'usuário A atualiza o próprio display_name'
);

select results_eq(
  $$
    update public.profiles
    set display_name = 'Alterado por A'
    where id = '22222222-2222-4222-8222-222222222222'::uuid
    returning id
  $$,
  array[]::uuid[],
  'usuário A não altera o perfil do usuário B'
);

reset role;

select is(
  (
    select display_name
    from public.profiles
    where id = '22222222-2222-4222-8222-222222222222'::uuid
  ),
  null::text,
  'o perfil do usuário B permaneceu intacto'
);

set local role authenticated;

select throws_ok(
  $$
    update public.profiles
    set role = 'admin'
    where id = '11111111-1111-4111-8111-111111111111'::uuid
  $$,
  '42501',
  null,
  'usuário autenticado não altera o próprio role'
);

select throws_ok(
  $$
    update public.profiles
    set id = '33333333-3333-4333-8333-333333333333'::uuid
    where id = '11111111-1111-4111-8111-111111111111'::uuid
  $$,
  '42501',
  null,
  'usuário autenticado não altera o próprio id'
);

select throws_ok(
  $$
    insert into public.profiles (id)
    values ('33333333-3333-4333-8333-333333333333'::uuid)
  $$,
  '42501',
  null,
  'usuário autenticado não insere perfis diretamente'
);

select throws_ok(
  $$
    delete from public.profiles
    where id = '11111111-1111-4111-8111-111111111111'::uuid
  $$,
  '42501',
  null,
  'usuário autenticado não exclui perfis diretamente'
);

reset role;
select set_config(
  'request.jwt.claim.sub',
  '22222222-2222-4222-8222-222222222222',
  true
);
set local role authenticated;

select results_eq(
  $$ select id from public.profiles order by id $$,
  array['22222222-2222-4222-8222-222222222222'::uuid],
  'usuário B também lê somente o próprio perfil'
);

reset role;
set local role anon;

select throws_ok(
  $$ select id from public.profiles $$,
  '42501',
  null,
  'visitante anônimo não lê perfis'
);

reset role;
select * from finish();
rollback;

