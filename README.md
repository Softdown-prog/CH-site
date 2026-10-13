# Softdown Assets

Catálogo estático de assets originais da Softdown, construído com Astro e preparado para hospedagem no Cloudflare Pages.

> Para retomar este projeto em outro chat, leia primeiro [CONTINUATION.md](./CONTINUATION.md).

## Desenvolvimento

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Saída: `dist/`.

## Publicação de assets

Cada asset publicado possui um JSON em `src/data/assets/`. O campo `published` precisa ser `true` para aparecer no site.

Arquivos de preview ficam em `public/previews/` e pacotes de download em `public/downloads/`.

O arquivo `src/data/assets/_example.json` documenta o formato mínimo e permanece como rascunho.

## Cloudflare Pages

- Build command: `npm run build`
- Output directory: `dist`
- Node: versão LTS atual

O repositório é propositalmente estático nesta primeira fase: sem banco, login ou backend.

## Games — jogos HTML5 no mesmo domínio

A rota `/games/` reúne os cards. Cada jogo possui sua página; o Lan House Simulator usa `/games/lan-house-simulator/` e o HTML5 compilado fica em `/play/lan-house-simulator/`.

O jogo continua sendo desenvolvido no repositório `Softdown-prog/A7-forge-2D-`. Antes de compilar o Astro, `npm run sync:games` faz checkout temporário desse repositório público, instala dependências travadas (`npm ci`), compila apenas `games/lan_house_simulator` e copia `dist/` para `public/play/lan-house-simulator/`. Não há Docker nem servidor separado; os arquivos são servidos pelo mesmo Cloudflare Pages.

**Atenção:** os builds precisam de Git, Node >= 22 e acesso HTTPS ao GitHub e npm. Como o site não é reconstruído automaticamente em cada commit do jogo, alterações no Lan House Simulator só chegam à página após novo deploy do CH-site. O script aceita `LHS_GAME_REF` para fixar uma revisão e não copia o código TypeScript-fonte para o site.
