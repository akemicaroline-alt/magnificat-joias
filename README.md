# Magnificat Joias

Site institucional da **Magnificat Joias** — joalheria sacra refinada em prata 950 e ouro 18k, com sede em São Paulo. Foco no público feminino católico, classe média/alta. Atendimento e vendas direcionados ao WhatsApp.

> *Magnificat anima mea Dominum.*

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (tokens via `@theme` em `src/app/globals.css`)
- **Framer Motion** para animações editoriais
- **lucide-react** para ícones outline
- **Cormorant Garamond** (display) + **Montserrat** (sans) via `next/font/google`
- **Vitest** + **Testing Library** + **jsdom** para testes

## Estrutura

```
src/
├── app/                     # App Router (layout, page, sitemap, robots, globals)
├── components/
│   ├── Container.tsx
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Logo.tsx
│   ├── SectionHeader.tsx
│   ├── WhatsappButton.tsx
│   ├── HeroConstellation.tsx
│   ├── CollectionCard.tsx
│   ├── sections/            # Hero, Sobre, Colecoes, Diferenciais, Depoimentos, Contato
│   ├── __tests__/
│   └── sections/__tests__/
├── lib/                     # env, cn, whatsapp
│   └── __tests__/
└── test/setup.ts            # mocks (next/image, next/font, next/link, canvas, IO, matchMedia)

public/
├── logo.png                 # logo final (PNG transparente — fornecido pela cliente)
├── logo-fallback.svg        # fallback editorial caso logo.png esteja ausente
├── og-image.svg             # Open Graph 1200×630
└── favicon.ico
```

## Rodando localmente

```bash
cp .env.local.example .env.local
npm install
npm run dev
```

Abra http://localhost:3000.

## Scripts

| Script                  | Função                                       |
|-------------------------|----------------------------------------------|
| `npm run dev`           | servidor de desenvolvimento Next.js          |
| `npm run build`         | build de produção                            |
| `npm run start`         | servidor produção (após build)               |
| `npm run lint`          | ESLint (regras `eslint-config-next`)         |
| `npm run typecheck`     | `tsc --noEmit`                               |
| `npm test`              | Vitest em modo single-run                    |
| `npm run test:watch`    | Vitest em watch                              |
| `npm run test:coverage` | Vitest com cobertura                         |

## Variáveis de ambiente

Definidas em `.env.local` (não comitado) e na Vercel:

| Variável                       | Exemplo                                  |
|--------------------------------|------------------------------------------|
| `NEXT_PUBLIC_WHATSAPP_NUMBER`  | `5511999156462`                          |
| `NEXT_PUBLIC_CONTACT_EMAIL`    | `contato@magnificatjoias.com.br`         |
| `NEXT_PUBLIC_SITE_URL`         | `https://magnificatjoias.com.br`         |

Nenhum desses valores está hardcoded em componente — toda leitura passa por `src/lib/env.ts`.

## Design system

Paleta (tokens Tailwind v4 em `src/app/globals.css`):

| Token                | Cor       | Uso                              |
|----------------------|-----------|----------------------------------|
| `bg-deep`            | `#0a0807` | fundo principal                  |
| `bg-elevated`        | `#14110e` | cards e seções alternadas        |
| `gold`               | `#c8a96e` | primária                         |
| `gold-light`         | `#e8d5a3` | acentos                          |
| `gold-dark`          | `#8a7448` | sombras e detalhes               |
| `text`               | `#f5f0e8` | corpo                            |
| `text-muted`         | `#a89c8a` | texto secundário                 |
| `text-faded`         | `#6b6357` | legendas, divisores              |
| `whatsapp`           | `#25d366` | FAB WhatsApp                     |
| `border`             | rgba dourada 0.15 | bordas finas              |

Tipografia:
- `--font-display` → Cormorant Garamond 300/400/500/600
- `--font-sans`    → Montserrat 200/300/400/500

## Deploy

Push em `main` faz deploy automático na Vercel. Garanta que as três env vars públicas estejam configuradas no projeto.

## Logo

Coloque `public/logo.png` (PNG transparente). Enquanto não houver arquivo, o componente `<Logo />` faz fallback automático para `public/logo-fallback.svg`.
