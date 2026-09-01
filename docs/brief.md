# Desafio técnico — Tecsa Group (Dev Mobile Pleno)

Enunciado original da avaliação técnica. Índice: [`README.md`](README.md). Decisões: [`decisoes.md`](decisoes.md). Escopo: [`escopo.md`](escopo.md). Agente: [`../AGENTS.md`](../AGENTS.md).

## Objetivo

Compreender a senioridade na orquestração de ferramentas, na estruturação de arquitetura em camadas e na qualidade de entrega Dev Mobile Pleno, por meio de um MVP focado em saúde.

## Cronograma

O teste foi enviado em **1º de setembro de 2026, às 14h**. O prazo limite para a devolução dos entregáveis era de **48 horas** a partir do recebimento do e-mail original.

## Entregáveis obrigatórios

Resposta por e-mail contendo:

| Entregável | Descrição |
| --- | --- |
| Repositório | Link para o código (público ou com acesso liberado) |
| Demonstração | Link para vídeo (Loom ou similar, 3 a 5 minutos) |
| Documentação | Relatório sobre o uso de IA documentado no README |

## Contexto do produto

Construir um app **core único e white-label** que atenda **duas marcas distintas** do grupo. A partir de uma base compartilhada, o app deve renderizar duas identidades visuais diferentes (design system).

Sobre esse core, entregar uma fatia vertical do **app do nutricionista**:

- carteira de pacientes
- detalhes com biomarcadores
- ações geradas por IA

## Stack tecnológica

| Camada | Tecnologia |
| --- | --- |
| Mobile | React Native, Expo (**TypeScript obrigatório**) |
| Backend | PHP com Laravel 10+ (preferencial) ou Node.js |
| Banco de dados | MySQL ou PostgreSQL |
| IA | API de LLM (Anthropic, OpenAI ou equivalente) |
| Infraestrutura | Docker — `docker compose up` sobe backend e banco; backend na porta **9000** |

## Requisitos técnicos

### Mobile (foco principal da avaliação)

- **Arquitetura:** desacoplada da marca; camada de API tipada; gerência de estado e navegação justificadas.
- **UX/UI:** tratamento de estados (carregando, erro, vazio e sucesso) e lista virtualizada para grandes bases.
- **Funcionalidades:** feature flag remota (com kill switch para IA), OTA de bundle JS (justificar ferramenta) e uso de capacidade nativa (ex.: HealthKit, biometria).
- **Offline:** persistência local da carteira e suporte a update otimista.

### Backend (arquitetura em camadas)

- **Padrão:** REST com verbos e status corretos.
- **Camadas:** Controller (validação), Service (regras de negócio e LLM) e Repository (banco).
- **Princípios:** SOLID, Clean Code e cobertura mínima de testes.

## Rubrica

| Peso | Critério |
| --- | --- |
| 32% | App core multimarca e arquitetura mobile |
| 23% | Plataforma e release (flag, OTA, nativo e offline) |
| 14% | Documentação e defesa das decisões |
| 13% | API e camadas do backend |
| 10% | IA e pensamento de produto |
| 08% | Testes |

## Red flags

Motivos de eliminação:

- Marca acoplada ao core
- Regra de negócio no Controller
- Ausência de TypeScript
- Chave de LLM exposta no commit
- Ausência de testes
- Ausência de virtualização de listas
