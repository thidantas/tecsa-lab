# Benchmark — marcas e apps de nutrição

Referência para modelar **vita** e **nexo** no core white-label. Não muda o escopo da US-03: o contrato continua carteira, biomarcadores e flags. Isto informa tokens Restyle, copy e o que a fatia vertical *parece*.

O app é do **nutricionista**, não do paciente. Apps de calorias entram só como referência de UX/marca.

## Dois polos (o que o core precisa provar)

O vídeo de duas marcas só convence se os temas forem **opostos o bastante** — mesma tela, outro produto.

| Polo | Sensação | Referências | Encaixa em |
| --- | --- | --- | --- |
| Acolhimento / hábito | Quente, baixo ruído, consultório | [Lifesum](https://caloriappdirectory.com/reviews/lifesum-review/), [Nutrium](https://nutrium.com/) | **vita** |
| Clínica / dado | Frio, densidade, lab | [Cronometer](https://cronometer.com/), [ZOE](https://zoe.com/), Levels | **nexo** |

## Apps de prática (mais próximos da fatia)

O que o nutricionista usa no dia a dia. Fontes: comparativos 2026 ([Practice Better](https://practicebetter.io/blog/the-6-best-nutritionist-software-tools-for-2026), [Notrispace](https://www.notrispace.com/en/blog/best-nutrition-practice-management-software), [MealCircle](https://mealcircle.co/blog/best-nutrition-software-for-dietitians)).

| App | Para quem | O que interessa ao MVP | O que **não** copiar |
| --- | --- | --- | --- |
| [Nutrium](https://nutrium.com/) | Nutricionista solo, análise + app do cliente | Lista de clientes limpa; detalhe com medidas e evolução; visual clínico sem ser hospital | Plano alimentar completo, base de alimentos, chat |
| [Healthie](https://www.gethealthie.com/) | Clínica / EHR | Carteira como *caseload*; detalhe = prontuário curto (labs + notas) | Billing, telehealth, seguro |
| [Practice Better](https://practicebetter.io/) | Wellness practice | Estados de UI claros; próximo passo do paciente visível | Automação de agenda e funil |
| [Cronometer](https://cronometer.com/) (Pro) | Quem vive de micronutriente | Biomarcadores como lab: glicemia, HbA1c, vitamina D, peso — números + unidade + data | Diário de 95 nutrientes |
| Dietbox (BR) | Consultório local | Tom de produto “consultório”, não “gym bro” | ERP de clínica |

Padrão comum nesses apps: **lista → pessoa → poucos sinais vitais/labs → ação**. É exatamente a fatia (carteira → detalhe → ações de IA).

## Apps de consumidor (só marca e densidade)

| App | Marca | Lição para tokens |
| --- | --- | --- |
| [Lifesum](https://www.lifesum.com/) | Escandinavo, cream/coral, tipografia amigável | vita: fundo quente, raio grande, texto curto, empty states gentis |
| [ZOE](https://zoe.com/) | Ciência editorial, roxo/off-white, scores | nexo: hierarquia de *score* no biomarcador (alto/ok/atenção), não só o número |
| Levels / metabólico | Escuro ou navy, tipo técnico | nexo: superfície fria, mono para números, pouco “emoji wellness” |
| Apple Saúde | Sistema, lista de labs | Detalhe: nome do marcador, valor, unidade, tendência — sem dashboard lotado |
| MyFitnessPal | — | Anti-padrão: densidade e ads; não usar como referência visual |

## Cores mais comuns nesses perfis

Hex observados em brand guides ou UI (não copiar logo). Semântica de lab (ok / atenção / fora) é quase universal.

### Polo quente — hábito / consultório (vita)

| App | Papel | Hex de referência | Uso na UI |
| --- | --- | --- | --- |
| Lifesum ([brand](https://app.bravemark.co/kevdsouza/lifesum), [Mobbin](https://mobbin.com/colors/brand/lifesum)) | Âncora de UI | Fundo `#FAFAF5`, verde `#37B97D` / forest `#05462D`, neon `#5AF05A`, terra `#F5B441`, texto `#242424` | Cream + verde vivo + âmbar de hábito |
| Nutrium | Prática | Teal/mint ~`#00B4A6`, fundo branco, texto grafite | Accent clínico-amigável (menos “gym”) |
| Dietbox | BR consultório | Laranja + verde em marketing | Quente, pouco slate |

Padrão do polo: **fundo cream/off-white quente**, **verde (sage → ocean)** como primária, **âmbar** para destaque, texto almost-black quente. Raios grandes.

### Polo frio — lab / dado (nexo)

| App | Papel | Hex de referência | Uso na UI |
| --- | --- | --- | --- |
| Cronometer | Labs / micros | Laranja de marca (~`#F15A24`), charcoal, fundo branco ou dark | Número em destaque; laranja = precisão, não “snack” |
| ZOE ([rebrand](https://www.commarts.com/exhibit/zoe-identity)) | Score científico | Amarelo editorial + off-white; UI às vezes roxo | Cor como *score*, não como decoração |
| Levels | Metabólico | Quase-preto, accent lima/oliva | Superfície fria, pouco pastel |
| Healthie | EHR | Navy no chrome (default), roxo no marketing (~`#5B4DC7`) | Chrome escuro + conteúdo claro |
| Apple Saúde | Lista de labs | `#FF2D55` no ícone; UI system gray | Cor da marca só no glyph; lista é neutra |

Padrão do polo: **fundo frio (`#F4F6F8` / slate)**, **azul ameno ou índigo contido** (não o verde da vita), **números em charcoal**. Raios menores.

### Azuis amenos (padrão de clínica)

Sim — e são **mais comuns** em software de consultório/EHR do que índigo saturado ou navy de marketing. O mercado chama isso de “medical / trust blue”: transmite dado e cuidado sem parecer fintech.

| Onde aparece | Tom | Hex típico |
| --- | --- | --- |
| Portais e EHR (Healthie chrome, Practice Better, SimplePractice, Jane-adjacent) | Powder / dusty blue no fundo e na sidebar clara | `#E8F1F8`, `#D5E3EF`, accent `#5B8FA8`–`#4A7C96` |
| Apps de saúde do sistema (Apple Saúde chrome, Google Fit) | Azul-acinzentado, pouco saturação | `#6B8CAE`, `#8AA4B8` |
| Nutrium / teal clínico | Azul esverdeado ameno (não neon) | `#2A8F8A`, `#3D8B9A` |
| Índigo de marketing (Healthie site, alguns “AI health”) | Mais saturado — marca, não lista | `#3D4C8A`, `#5B4DC7` |

Para o **nexo**, o azul ameno encaixa melhor que o índigo: a carteira parece clínica, não dashboard. O índigo fica como opção “tech”; o dusty blue é o default do polo frio.

Não usar esse azul na **vita** — o contraste do switch some se as duas marcas forem “verde vs teal”.

### Semântica (os dois temas)

| Estado | Cor típica do mercado | Token Restyle |
| --- | --- | --- |
| Na faixa | Verde `#22A06B`–`#37B97D` | `success` |
| Atenção | Âmbar `#F5B441` / `#E8A317` | `warning` |
| Fora da faixa | Coral/vermelho `#E24B4A` | `danger` |
| Superfície | Branco `#FFFFFF` | `surface` |
| Texto | `#1A1F16` (quente) ou `#12141A` (frio) | `text` |

### Tokens sugeridos (US-04)

Não clonar as marcas; extrair o *eixo* cream+verde vs slate+azul ameno.

| Token | vita | nexo (azul ameno, preferido) | nexo (índigo, opcional) |
| --- | --- | --- | --- |
| `background` | `#F4F1EA` (já no placeholder) | `#F3F6F8` | `#F1F3F6` |
| `surface` | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` |
| `text` | `#1A1F16` | `#1A2228` | `#12141A` |
| `textMuted` | `#5C6654` | `#5A6B76` | `#5C6470` |
| `accent` | `#2F5D50` (sage) | `#4A7C96` (dusty blue) | `#3D4C8A` |
| `accentSoft` | `#E4EDE4` | `#E8F1F8` | `#E4E7F2` |
| `warning` | `#F5B441` | `#D4A017` |
| `danger` | `#C45C4A` | `#C63B3B` |
| `success` | `#37B97D` | `#2A8F6D` |
| `border` | `#D9D3C7` | `#D0D5DE` |
| `borderRadii.l` | `16` | `8` |

## Proposta de posicionamento (vita vs nexo)

Mesmo core; copy e tema mudam o *produto percebido*.

### vita — consultório de hábito

- **Promessa:** acompanhar o paciente no ritmo do consultório (peso, vitamina D, adesão).
- **Tom:** “vamos ver juntos”. Títulos curtos, verbos suaves.
- **Visual:** cream `#F4F1EA`, sage `#2F5D50`, âmbar `#F5B441`, raios `l`.
- **Ações de IA:** 3 recomendações de hábito (“revisar lanche da tarde”, “repetir 25-OH em 8 semanas”).
- **Âncora:** Lifesum (UI) + Nutrium (papel do profissional).

### nexo — clínica de biomarcadores

- **Promessa:** priorizar o que está fora da faixa (HbA1c, glicemia).
- **Tom:** “o que exige ação agora”. Labels técnicos, menos adjetivo.
- **Visual:** slate `#F3F6F8`, dusty blue `#4A7C96` (não índigo saturado), raios `s`/`m`, números em tabular/mono.
- **Ações de IA:** alertas clínicos estruturados (“HbA1c 7,2% — discutir intensificação”, “glicemia de jejum em tendência de alta”).
- **Âncora:** Cronometer (labs) + ZOE/Levels (leitura do dado).

O switch no vídeo deve mudar **cor, raio, título da home e copy do card de IA** — não só o hex do header.

## O que isso muda (e o que não muda)

**Para a US-03 (API):** o modelo pode nascer já “brand-agnostic”: paciente, biomarcador (`name`, `value`, `unit`, `measuredAt`, faixa opcional `refLow`/`refHigh`), flag `ai_actions`. Nenhuma marca no banco.

**Para a US-04 (temas):** dois `createTheme` com paleta, `borderRadii` e `textVariants` distintos; `copy` (home title, empty state, rótulo de ações) fora do tema.

**Fora do MVP (os apps acima têm e nós não):** diário alimentar, receita, agenda, pagamento, app do paciente, chat com LLM.

## Fontes

- [Practice Better — 6 best nutritionist tools 2026](https://practicebetter.io/blog/the-6-best-nutritionist-software-tools-for-2026)
- [Notrispace — nutrition software comparison](https://www.notrispace.com/en/blog/best-nutrition-practice-management-software)
- [MealCircle — dietitian software 2026](https://mealcircle.co/blog/best-nutrition-software-for-dietitians)
- [Lifesum UX review](https://caloriappdirectory.com/reviews/lifesum-review/)
- [ZOE vs Cronometer](https://zoe.com/learn/zoe-vs-cronometer-best-for-personalized-nutrition)
- [Lifesum brand colors (Brave Mark)](https://app.bravemark.co/kevdsouza/lifesum)
- [Lifesum UI colors (Mobbin)](https://mobbin.com/colors/brand/lifesum)
- [ZOE identity (Communication Arts)](https://www.commarts.com/exhibit/zoe-identity)
- [Cronometer visual refresh](https://cronometer.com/blog/our-new-look/)
