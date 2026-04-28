import type { Meta, StoryObj } from "@storybook/react";
import { Text, type TextVariant } from "@santo-ds/ui";

const ALL_VARIANTS: TextVariant[] = [
  "headline-lg",
  "headline-md",
  "headline-sm",
  "title-xl",
  "title-lg",
  "title-md",
  "title-sm",
  "title-xs",
  "title-xxs",
  "paragraph-lg",
  "paragraph-md",
  "paragraph-sm",
  "paragraph-xs",
  "label-lg",
  "label-md",
  "label-sm",
  "label-xs",
  "overline-md",
  "overline-sm",
  "reading-only-md",
];

const meta = {
  title: "Components/Display/Text",
  component: Text,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The **Text** component is the canonical way to render typography in the
system. Each \`variant\` resolves to a **composite typography token**
(font-family, size, weight, line-height, letter-spacing) generated as a
\`.sds-text-{variant}\` utility class.

### Typography roles

- **headline** — landing-page hero copy, marketing slabs.
- **title** — section / card / page headings (\`xxs\` → \`xl\`).
- **paragraph** — body copy.
- **label** — UI element labels (form fields, button-shaped tags).
- **overline** — small uppercase eyebrows above titles.
- **reading-only** — long-form prose (articles, terms-of-service).

### Element semantics

Each variant maps to a sensible default HTML element (\`headline-lg → h1\`,
\`label-md → span\`). Override with \`as\` when the document outline
demands it:

\`\`\`tsx
<Text variant="title-lg" as="h2">Section title</Text>
\`\`\`

Use \`asChild\` to forward the styles onto a child element via Radix
Slot (e.g. when wrapping a \`<Link>\`).
        `,
      },
    },
  },
  args: { children: "The quick brown fox jumps over the lazy dog", variant: "paragraph-md" },
  argTypes: {
    children: { control: "text" },
    variant: {
      control: "select",
      options: ALL_VARIANTS,
      table: { defaultValue: { summary: "paragraph-md" } },
    },
    as: { control: false, table: { disable: true } },
    asChild: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Drive every prop from the controls panel. */
export const Playground: Story = {};

export const ParagraphMd: Story = { args: { variant: "paragraph-md" } };
export const HeadlineLg: Story = { args: { variant: "headline-lg" } };
export const TitleLg: Story = { args: { variant: "title-lg" } };
export const LabelMd: Story = { args: { variant: "label-md" } };
export const OverlineMd: Story = {
  args: { variant: "overline-md", children: "Section label" },
};

/** Every variant in the system, side-by-side. */
export const FullScale: Story = {
  parameters: { controls: { disable: true } },
  args: {},
  render: () => (
    <div className="flex flex-col gap-6">
      {ALL_VARIANTS.map((v) => (
        <div key={v} className="flex flex-col gap-1">
          <span className="font-mono text-xs text-foreground-soft">{v}</span>
          <Text variant={v}>The quick brown fox jumps over the lazy dog</Text>
        </div>
      ))}
    </div>
  ),
};
