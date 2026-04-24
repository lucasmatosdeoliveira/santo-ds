# SantoDS

Design system construído a partir de variáveis do Figma. Tokens normalizados via Style Dictionary, componentes em React + Radix UI + Tailwind, documentação viva em Storybook.

[![CI](https://github.com/lucasmatosdeoliveira/santo-ds/actions/workflows/ci.yml/badge.svg)](https://github.com/lucasmatosdeoliveira/santo-ds/actions/workflows/ci.yml)
[![Storybook](https://img.shields.io/badge/Storybook-online-ff4785)](https://lucasmatosdeoliveira.github.io/santo-ds/)

## Stack

- **Tokens**: W3C DTCG + [Style Dictionary v4](https://styledictionary.com) → CSS vars, JS constants, Tailwind preset
- **UI**: React 18, [Radix UI](https://www.radix-ui.com/), [CVA](https://cva.style), Tailwind v3, `tailwind-merge`
- **Docs**: Storybook 8.4 (Vite)
- **Monorepo**: pnpm workspaces, Node ≥ 20

## Estrutura

```
packages/
├── tokens/   # @santo-ds/tokens  — design-tokens.json → dist/{css,js,tailwind}
├── ui/       # @santo-ds/ui      — componentes React
└── docs/     # @santo-ds/docs    — Storybook (privado)
```

## Como rodar

```bash
pnpm install
pnpm tokens:build      # gera dist/ do pacote de tokens
pnpm ui:build          # typecheck do pacote de UI
pnpm storybook         # abre em http://localhost:6006
```

Para build completo: `pnpm build`.

## Pacotes

| Pacote | Descrição | Exports |
| --- | --- | --- |
| `@santo-ds/tokens` | Tokens extraídos do Figma, convertidos para DTCG e gerados via Style Dictionary | `.`, `./css`, `./tailwind`, `./raw` |
| `@santo-ds/ui` | Componentes React (Button, Field, Combobox, DateField, PasswordField, SocialButton, Toggle, …) | `.`, `./styles.css` |
| `@santo-ds/docs` | Storybook com foundations (cores, tipografia, espaçamento, raios, opacidade, grids) e galerias de componentes | — |

## Uso

```tsx
import "@santo-ds/tokens/css";
import "@santo-ds/ui/styles.css";
import { Button, Field, Combobox } from "@santo-ds/ui";

export function Example() {
  return (
    <Field label="Time" htmlFor="team">
      <Combobox
        id="team"
        options={[{ value: "santos", label: "Santos FC" }]}
        placeholder="Escolha um time"
      />
    </Field>
  );
}
```

Tema claro/escuro via atributo no `<html>`:

```html
<html data-theme="dark">
```

## Fluxo de tokens

1. Variáveis exportadas do Figma (`design-tokens.json`)
2. `packages/tokens/scripts/preprocess.mjs` normaliza para DTCG limpo
3. Style Dictionary gera `dist/css/tokens.css`, `dist/js/tokens.js`, `dist/tailwind/preset.js`
4. `@santo-ds/ui` consome via preset do Tailwind

## Licença

[MIT](./LICENSE) © Lucas Matos de Oliveira
