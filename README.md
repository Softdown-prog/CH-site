# Softdown Assets

Catálogo estático de assets originais da Softdown, construído com Astro e preparado para hospedagem no Cloudflare Pages.

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
