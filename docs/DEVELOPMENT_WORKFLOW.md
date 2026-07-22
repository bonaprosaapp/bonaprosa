# Fluxo de desenvolvimento com Codex

## Unidade de trabalho

Uma tarefa deve entregar um comportamento observável pequeno. Não misturar redesign geral, banco, pagamento e IA em uma única solicitação.

Exemplos adequados:

- extrair o cabeçalho da landing para componente;
- criar tokens oficiais e substituir cores da Hero;
- implementar cadastro com validação;
- criar catálogo de planos no servidor;
- implementar upload privado de uma tentativa;
- exibir estados de processamento;
- validar o JSON do feedback.

## Processo

1. definir objetivo e critérios de aceite;
2. ler documentos relevantes;
3. inspecionar código e alterações existentes;
4. declarar suposições necessárias;
5. implementar a menor solução completa;
6. executar verificações;
7. revisar segurança, acessibilidade e responsividade;
8. atualizar documentação e changelog;
9. entregar resumo e pendências.

## Ordem recomendada do projeto

1. fundação e documentos;
2. reorganização gradual da landing;
3. cadastro e autenticação;
4. catálogo, checkout e assinatura;
5. onboarding e dashboard mínimo;
6. módulos, aulas e progresso básico;
7. exercício de voz ponta a ponta;
8. perfil, privacidade e administração mínima;
9. validação com usuários;
10. expansão somente com evidência.

## Verificações

Usar os scripts existentes no `package.json`. Quando disponíveis:

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

Não criar um comando fictício. Se o script não existir, informar e usar a alternativa existente.

Para mudanças de alto risco, testar também:

- autenticação e acesso cruzado;
- políticas RLS;
- webhook repetido e inválido;
- upload inválido;
- tela mobile;
- navegação por teclado;
- falha do provedor externo;
- reprocessamento idempotente.

## Resumo final do Codex

O Codex deve informar:

- resultado entregue;
- arquivos alterados;
- decisões tomadas;
- verificações executadas e resultados;
- pendências ou riscos reais;
- próxima etapa natural, sem ampliar o escopo automaticamente.

