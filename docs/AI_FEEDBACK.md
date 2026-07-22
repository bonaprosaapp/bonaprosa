# Transcrição, métricas e feedback por IA

## Princípio

O feedback deve combinar:

1. transcrição;
2. métricas determinísticas;
3. rubrica pedagógica aprovada;
4. modelo de linguagem para apresentar a orientação em linguagem clara.

O modelo de linguagem não decide pagamento, permissão, plano ou conclusão diretamente.

## Fluxo

1. confirmar sessão, assinatura e propriedade da tentativa;
2. receber áudio em armazenamento privado;
3. marcar tentativa como `uploaded`;
4. iniciar processamento;
5. transcrever;
6. calcular métricas permitidas;
7. gerar feedback com rubrica e contexto mínimo;
8. validar JSON contra schema;
9. salvar resultado e versão técnica;
10. marcar tentativa como `completed`;
11. exibir limitações e coletar utilidade percebida.

## Formato mínimo

```json
{
  "summary": "Resumo curto e acolhedor.",
  "strengths": [
    {
      "code": "clear_structure",
      "evidence": "Evidência baseada na tentativa."
    }
  ],
  "priorities": [
    {
      "code": "filler_words",
      "evidence": "Evidência observável.",
      "action": "Uma ação simples para o próximo treino."
    }
  ],
  "metrics": {
    "words_per_minute": 128,
    "filler_word_count": 4
  },
  "next_exercise_id": null,
  "limitations": [
    "A transcrição pode conter erros."
  ]
}
```

Os códigos e métricas aceitos devem ser enumerados em schema. Campos desconhecidos são rejeitados ou ignorados de forma controlada.

## Linguagem do feedback

- português brasileiro;
- uma prioridade principal por tentativa no MVP;
- mostrar evidência e próxima ação;
- evitar excesso de notas e termos técnicos;
- não humilhar ou comparar o aluno com outras pessoas;
- não fazer promessa absoluta;
- diferenciar observação, inferência e limitação.

## Proibições

- detectar mentira;
- diagnosticar emoção, saúde ou transtorno;
- definir personalidade;
- afirmar capacidade profissional;
- inferir atributo sensível;
- usar sotaque regional como falha;
- penalizar diversidade legítima da fala brasileira;
- permitir que o conteúdo do usuário altere as instruções internas do sistema.

## Qualidade e custo

Registrar quando disponível:

- provedor e modelo;
- versão da rubrica e do prompt;
- duração do áudio;
- tempo de transcrição e feedback;
- tokens ou custo estimado;
- status e código de falha;
- utilidade informada pelo usuário.

Manter um conjunto de exemplos revisados para comparar versões antes de trocar modelo, rubrica ou prompt.

