# Branding e design system

## Personalidade

O Bona Prosa deve transmitir tranquilidade, confiança, proximidade, aprendizado e brasilidade. O visual deve ser limpo, moderno e acolhedor.

Tom de voz:

- direto;
- respeitoso;
- motivador;
- simples, sem ser raso;
- brasileiro, sem estereótipo;
- nunca infantilizado.

## Paleta oficial

| Token | Cor | Uso |
| --- | --- | --- |
| Verde principal | `#4E9F70` | destaques de marca, bordas e áreas sem texto pequeno branco |
| Verde escuro | `#2F6F4E` | ações preenchidas, títulos e contraste |
| Verde claro | `#E8F4EC` | fundos suaves |
| Azul | `#3566A8` | informação, links e apoio visual |
| Azul claro | `#EAF1FA` | estados informativos |
| Amarelo | `#F2C94C` | conquista e destaque pontual |
| Amarelo claro | `#FFF7D6` | avisos leves |
| Fundo | `#F7F8F6` | página |
| Superfície | `#FFFFFF` | cards e formulários |
| Texto | `#26332B` | conteúdo principal |
| Texto secundário | `#68736D` | descrições |
| Borda | `#DDE5E0` | divisores e campos |
| Erro | `#C94A4A` | erros e ação destrutiva |
| Sucesso | `#3D8B5F` | confirmação |

Usar aproximadamente 60% branco/cinza claro, 25% verdes, 10% azul e 5% amarelo. Não usar todas as cores com a mesma força ao mesmo tempo.

## Tokens

A fonte executável atual dos tokens é `src/styles/tokens.css`. Mudanças aprovadas de marca devem atualizar este documento e o arquivo de tokens na mesma tarefa.

Para texto de tamanho normal, botões preenchidos usam o verde escuro `#2F6F4E` com branco, alcançando contraste de aproximadamente 5,99:1. O verde principal `#4E9F70` continua sendo a cor central da marca, mas não recebe texto branco pequeno porque essa combinação alcança apenas aproximadamente 3,22:1. Estados de sucesso também usam o verde escuro quando contêm texto; `#3D8B5F` permanece disponível para elementos visuais que não carregam texto pequeno.

Todo componente deve consumir tokens semânticos, como:

- `--color-page`;
- `--color-surface`;
- `--color-text`;
- `--color-text-muted`;
- `--color-action-primary`;
- `--color-action-primary-hover`;
- `--color-info`;
- `--color-accent`;
- `--color-border`;
- `--color-error`;
- `--color-success`.

Evitar códigos hexadecimais dentro de páginas e componentes de produto.

## Tipografia e medidas

- Fonte principal: Inter Variable, distribuída localmente pelo pacote `@fontsource-variable/inter`; fallback para Arial e `system-ui`.
- Título principal: `clamp(2rem, 5vw, 3.5rem)`.
- Texto corrido: 16–18 px, altura de linha entre 1,45 e 1,65.
- Texto auxiliar: mínimo de 14 px.
- Escala de espaçamento: 4, 8, 12, 16, 24, 32, 48 e 64 px.
- Campos e botões: raio de 10–12 px.
- Cards: raio de 16–24 px.
- Área útil máxima: 1200 px centralizada.

## Mascote Bono

- preservar cores, asas, bico, olho e efeito visual oficial;
- usar as variações emocionais conforme o estado da interface;
- não alterar proporções ou criar uma nova versão sem pedido explícito;
- fornecer texto alternativo quando a imagem comunicar informação;
- imagens decorativas usam `alt=""`.

Estados sugeridos:

- feliz: conclusão e conquista;
- relaxado: boas-vindas e conteúdo leve;
- preocupado: aviso recuperável;
- surpreso: novidade;
- bravo: evitar em erro do usuário; reservar para contexto narrativo aprovado.

## Responsividade e acessibilidade

- mobile first;
- layout fluido com `minmax`, `auto-fit`, `%`, `fr` e `clamp`;
- não usar altura fixa para conteúdo variável;
- não truncar explicações, preços, erros ou benefícios;
- não usar `overflow: hidden` para esconder falha de layout;
- área clicável mínima de 44 × 44 px;
- foco de teclado visível;
- contraste suficiente;
- não depender apenas de cor, som ou animação;
- respeitar `prefers-reduced-motion`;
- testar zoom de 200% e larguras intermediárias.
