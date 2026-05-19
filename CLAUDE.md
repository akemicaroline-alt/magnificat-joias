# CLAUDE.md — Magnificat Joias

Instruções definitivas para qualquer sessão futura trabalhando neste repositório.

## Identidade do projeto

- **Marca:** Magnificat Joias — joalheria sacra refinada (prata 950, ouro 18k).
- **Público:** feminino católico, classe média/alta.
- **Sede:** São Paulo, atendimento nacional.
- **Canal de venda:** WhatsApp (formulário de contato e CTAs sempre abrem `wa.me/...`).
- **Tom:** editorial, refinado, sacro, contemplativo. Nunca genérico, nunca apelativo.
- **Timezone padrão:** `America/Sao_Paulo`.

## Stack

- Next.js 16 (App Router) · React 19 · TypeScript estrito
- Tailwind CSS v4 com tokens em `src/app/globals.css` (`@theme`)
- Framer Motion · lucide-react
- Cormorant Garamond + Montserrat via `next/font/google`
- Vitest + Testing Library + jsdom

## Design tokens (fixos — não alterar sem autorização)

Paleta:

```
bg.deep        #0a0807
bg.elevated    #14110e
gold           #c8a96e
gold.light     #e8d5a3
gold.dark      #8a7448
text           #f5f0e8
text.muted     #a89c8a
text.faded     #6b6357
whatsapp       #25d366
border         rgba(200,169,110,0.15)
```

Tipografia:
- Display: Cormorant Garamond (pesos 300/400/500/600). Nunca usar serif negrito.
- Body/UI: Montserrat (pesos 200/300/400/500), peso padrão 300.

Princípios:
1. Espaço em branco generoso — seções >= 120px desktop / 80px mobile.
2. Headlines em serif leve; corpo em sans leve.
3. Animações lentas (600–1200ms, easing `[0.22, 1, 0.36, 1]`).
4. Dourado é acento — nunca bloco dominante.
5. Cada seção comunica UMA ideia.
6. Detalhes ornamentais sutis: linhas finas, números romanos para indexar seções, ligaturas, italics no subtítulo.

## Estrutura de pastas

Caminhos completos a partir da raiz `/Users/claudiobaidajr/projetos/magnificatjoias/`:

- `src/app/` — layout, page, sitemap, robots, globals.css.
- `src/components/` — base (Header, Footer, Logo, Container, SectionHeader, WhatsappButton, HeroConstellation, CollectionCard).
- `src/components/sections/` — Hero, Sobre, Colecoes, Diferenciais, Depoimentos, Contato.
- `src/lib/` — `env.ts`, `cn.ts`, `whatsapp.ts`.
- `src/**/__tests__/` — testes Vitest.
- `src/test/setup.ts` — mocks (next/image, next/font, next/link, canvas, IntersectionObserver, matchMedia).
- `public/` — `logo.png` (final), `logo-fallback.svg`, `og-image.svg`, `favicon.ico`.

## Regras invioláveis

- **Credenciais** nunca em código. Sempre `.env.local` (gitignored) + Vercel envs.
- **Nada hardcoded** de número, e-mail ou URL nos componentes — usar `@/lib/env`.
- **Nunca mencionar** nomes de modelos de IA em código/UX visível. Atribuir a “Magnificat Joias” ou “IA avançada”.
- **Testes sempre** para nova lógica. Mock para qualquer chamada externa — nunca rede real.
- **Português** em commits, copy, comentários e variáveis voltadas ao domínio.
- **Caminhos absolutos** (`/Users/.../magnificatjoias/...`) ao falar de arquivos em PRs/discussões.
- **Antes de editar um arquivo**, leia-o com `Read`.

## Checklist obrigatório antes de qualquer commit

Rodar **nesta ordem** e só prosseguir se todos passarem:

```bash
npx tsc --noEmit
npm run lint
npm run test
npm run build
```

Se qualquer um falhar: corrigir e rodar TODOS de novo desde o início. Nada de commit com erro.

## Padrão de commit

- Português, descritivo, no imperativo, com prefixo (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`).
- Após cada feature concluída: commit + push automático para `main` (deploy Vercel).
- Exemplo: `feat: animação editorial de entrada no hero com easing customizado`.

## Endereços / canais

- Repositório: `https://github.com/akemicaroline-alt/magnificat-joias`
- Domínio destino: `https://magnificatjoias.com.br`
- WhatsApp atendimento: `+55 (11) 99915-6462`
- E-mail: `akemicaroline@magnificatjoias.com.br`

## Prompts úteis (cole direto)

### Adicionar nova coleção

```
Adicione a coleção "<NOME>" ao site (id, roman, gradiente, descrição curta), inserindo-a em
src/components/sections/Colecoes.tsx, mantendo o padrão visual do card e gerando um ornamento SVG
em src/components/CollectionCard.tsx. Cubra com teste em
src/components/sections/__tests__/Colecoes.test.tsx. Rode tsc, lint, test e build antes de commitar.
```

### Trocar copy de uma seção

```
Atualize a copy da seção <NOME> no arquivo src/components/sections/<NOME>.tsx mantendo o tom
editorial sacro. Não introduza serif negrito nem mude tokens de design. Rode tsc, lint, test e
build antes de commitar.
```

### Subir uma nova imagem

```
Coloque o asset em public/<arquivo>.<ext>. Substitua a div placeholder correspondente por
<Image /> de next/image, com alt descritivo em português. Mantenha proporção e classes existentes.
```

## Finalização de tarefa

Ao concluir qualquer demanda, liste explicitamente os itens **não** implementados (com motivo) ou
confirme `Todos os itens do prompt foram implementados.`
