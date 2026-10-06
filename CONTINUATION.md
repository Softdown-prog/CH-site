# CONTINUATION — Softdown Assets / Game Asset SaaS

Este arquivo existe para permitir retomar o projeto em outro chat sem perder as decisões já tomadas.

## Objetivo atual

O repositório `CH-site` é a base pública do **Softdown Assets**: um catálogo de assets originais para jogos produzidos pelas ferramentas procedurais da Softdown.

A prioridade imediata é **terminar a página inicial do site antes de publicar assets reais**. Não começar pelo SaaS completo, banco, pagamentos ou render farm antes de a home estar visualmente convincente e a navegação básica definida.

## Estado atual do repositório

Stack atual:

- Astro
- site estático
- CSS próprio
- catálogo baseado em JSON
- páginas estáticas por asset
- preparado para Cloudflare Pages
- GitHub Action para validar o build

Arquivos principais:

- `src/pages/index.astro` — página inicial
- `src/pages/sobre-nos.astro` — página Sobre nós; explica a origem das ferramentas próprias e a distribuição gratuita de outputs procedurais não usados nos projetos
- `src/pages/arte-procedural.astro` — página educativa pública sobre arte procedural, workers, coerência visual e tecnologias usadas, sem expor segredos internos do pipeline
- `src/styles/global.css` — sistema visual atual
- `src/pages/assets/[slug].astro` — página individual
- `src/lib/assets.ts` — leitura e filtragem do catálogo
- `src/data/assets/` — metadata dos assets
- `public/previews/` — previews
- `public/downloads/` — ZIPs/downloads

Um asset só aparece no catálogo quando `published: true`.

## Próximo passo confirmado

Trabalhar primeiro na **home**.

Direção desejada:

- identidade própria Softdown Assets
- visual profissional para desenvolvedor de jogos
- fundo escuro, cards grandes e previews limpos
- hero que explique rapidamente o produto
- categorias de assets
- seção de assets em destaque
- explicação curta sobre origem procedural própria
- licença/uso de forma clara
- rodapé simples
- responsivo em mobile

Não publicar asset real apenas para “encher” a página. Primeiro acertar a estrutura e identidade da home.

## Conceito do catálogo

Os assets gratuitos podem vir de outputs procedurais de testes, validações, variações e outras etapas das ferramentas próprias da Softdown. Quando não são usados nos jogos ou projetos de origem, mas continuam úteis e apresentáveis, podem ser selecionados para distribuição gratuita no site.

Fluxo planejado:

1. asset é gerado
2. asset é avaliado
3. se não entrar no jogo mas tiver qualidade, vira Library Candidate
4. somente após aprovação explícita ele entra no site
5. worker prepara preview otimizado, metadata e ZIP
6. `published: true` libera a página no catálogo

Não regenerar assets bons sem necessidade.

## Futuro SaaS

Existe a intenção de transformar as ferramentas de geração em um SaaS para criação de game assets.

A arquitetura discutida até agora é deliberadamente separada em camadas:

### Web / apresentação

- Astro + HTML/CSS/JavaScript simples
- Cloudflare Pages para o site estático
- evitar frontend pesado sem necessidade

### API

Preferência atual:

- Node.js
- JavaScript vanilla, sem TypeScript inicialmente
- JSON simples
- REST simples
- Cloud Run como candidato forte para API

O motivo é manter poucas camadas, pouco build tooling e código fácil de abrir e entender.

### Banco / estado

Não instalar banco dentro de VM Windows.

Candidato atual:

- Firestore para usuários, créditos, jobs e estado

Evitar começar com MySQL/MariaDB/PHP/WAMP/Composer. Esse caminho já gerou manutenção excessiva em SaaS anteriores.

### IA

A IA deve ser usada principalmente como:

`prompt do usuário -> receita JSON validada`

Ela não deve ficar ocupada durante o render.

O usuário já possui acesso/créditos de API de modelo econômico, então a IA tende a ser uma parte barata do custo total.

### Execução dos assets

O trabalho pesado deve ficar separado do backend web.

Executores possíveis:

- Cloud Run Jobs
- worker Windows
- futuros workers Linux

Contrato futuro sugerido:

`CH_GENERATION_JOB_V1`

Cada job deve possuir estado assíncrono, por exemplo:

- queued
- preparing
- generating
- rendering
- packaging
- completed
- failed

Nunca manter uma requisição HTTP aberta esperando um render de 5–10 minutos terminar.

### VM Windows

Se for usada, a VM Windows deve ser **worker**, não servidor web completo.

Instalar nela somente o necessário para gerar assets:

- Blender
- Python
- Forge 2D
- CH Blender
- executáveis auxiliares
- um Worker Service

Não colocar nela o banco principal, pagamentos, autenticação, site e render ao mesmo tempo.

Uma VM maior pode executar vários jobs em paralelo até o limite real de CPU/RAM. Jobs excedentes ficam pendentes. O limite deve ser baseado em benchmark, não em chute.

## Cloud Run e benchmark

Os tempos observados localmente servem como referência melhor que GitHub Actions.

Referência informada:

- PC local: 6 núcleos, 16 GB RAM
- jobs leves: ~30–60 segundos
- jobs pesados: ~5–10 minutos
- GitHub Actions pode ser bem mais lento e não deve ser usado como referência comercial de custo

Quando o SaaS começar a ser testado, executar o mesmo job em configurações diferentes e medir:

- duração
- pico de RAM
- CPU
- custo por job
- tamanho do output

Configurações a comparar podem incluir:

- 1 vCPU / 512 MiB para Forge 2D leve
- 1 vCPU / 1 GiB
- 2 vCPU / 2 GiB
- 4 vCPU / 4 GiB

Não assumir que a menor máquina é a mais barata por job. Se mais CPU reduzir muito o tempo, a configuração maior pode ter custo semelhante e experiência muito melhor.

## Reaproveitamento do softload-engine-v3

Repositório de referência:

`Softdown-prog/softload-engine-v3`

Ele já é um SaaS funcional e contém muita infraestrutura que pode ser reaproveitada seletivamente no futuro SaaS de assets.

Partes consideradas valiosas para reaproveitar/adaptar:

- Node + Express
- Cloud Run
- Dockerfile
- Firestore
- Firebase Auth
- sessões persistentes em Firestore
- sistema de planos
- sistema de créditos
- billing logs
- Mercado Pago
- Pix
- webhook com verificação
- rate limiting
- middlewares de autenticação
- Cloud Storage
- health check
- CI/deploy
- dashboard/admin
- monitoramento de workers/logs

Não copiar cegamente o projeto inteiro.

Não levar partes específicas de Blogger/Solaris/RAG que não tenham utilidade no novo produto.

A ideia é reaproveitar o **núcleo SaaS**, não transformar o novo projeto numa cópia do produto antigo.

## Diretrizes de continuidade

Ao retomar em outro chat:

1. abrir este arquivo primeiro
2. ler o estado atual do `main` antes de escrever
3. não presumir que arquivos continuam iguais
4. evitar reescrever arquivos grandes sem necessidade
5. preservar trabalho já validado
6. fazer mudanças pequenas e verificáveis
7. manter o foco atual: **home do Softdown Assets primeiro**
8. não iniciar infraestrutura SaaS pesada antes de existir necessidade real
9. não misturar este site dentro do repositório City Horizon
10. manter o `softload-engine-v3` original intacto; usar como fonte de módulos/referência quando chegar a hora

## Ordem de trabalho recomendada

1. fechar a home
2. validar mobile/desktop
3. escolher primeiro asset real
4. fechar card e página individual
5. preparar preview + ZIP
6. publicar primeiro asset
7. conectar/deploy no Cloudflare Pages
8. só depois expandir catálogo
9. somente então iniciar protótipo do SaaS de geração
