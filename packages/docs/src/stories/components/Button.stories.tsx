import type { Meta, StoryObj } from "@storybook/react";
import { ArrowRight, Plus, Trash2 } from "lucide-react";
import { Button } from "@santo-ds/ui";

const meta = {
  title: "Components/Actions/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The **Button** is the primary call-to-action of the system. Use it whenever
the user needs to commit to an action — submitting a form, opening a
modal, kicking off navigation.

### When to use which variant

- **\`primary\`** — the most important action on the screen. Use **one
  per view**. Carries the brand accent color.
- **\`outline\`** — secondary actions that sit next to a primary
  (e.g. *Cancel*).
- **\`tonal\`** — secondary actions that need slightly more weight than
  outline, or live on accent backgrounds.
- **\`elevated\`** — buttons floating above content (cards, image
  overlays). Pairs with \`shadow-sm\`.
- **\`plain\`** — tertiary actions / table rows / inline links.

### Sizing

- \`sm\` (40px) — dense layouts, table rows.
- \`md\` (48px) — default.
- \`lg\` (56px) — hero CTAs.

### Accessibility

- Always provide a textual label. Icon-only buttons should use
  \`<IconButton>\` instead.
- The \`loading\` state sets \`aria-busy\` and disables interaction.
- Focus styles use the \`shadow-focus-accent\` ring token (3px outset).
        `,
      },
    },
  },
  args: {
    children: "Button",
    variant: "primary",
    size: "md",
    neutral: false,
    loading: false,
    disabled: false,
  },
  argTypes: {
    children: {
      control: "text",
      description: "Button label.",
      table: { type: { summary: "ReactNode" } },
    },
    variant: {
      control: "inline-radio",
      options: ["primary", "outline", "tonal", "elevated", "plain"],
      description: "Visual style. See *When to use which variant* above.",
      table: { defaultValue: { summary: "primary" } },
    },
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
      description: "Vertical size. Maps to component tokens (h-btn-*).",
      table: { defaultValue: { summary: "md" } },
    },
    neutral: {
      control: "boolean",
      description:
        "Swap accent palette for foreground/neutral. Use on accent backgrounds.",
    },
    loading: {
      control: "boolean",
      description: "Replaces the leading icon with a spinner and disables interaction.",
    },
    disabled: {
      control: "boolean",
      description: "Visually muted, non-interactive. Sets `aria-disabled`.",
    },
    asChild: { control: false, table: { disable: true } },
    leadingIcon: { control: false, table: { disable: true } },
    trailingIcon: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Drive every prop from the controls panel. */
export const Playground: Story = {};

export const Primary: Story = { args: { variant: "primary" } };
export const Outline: Story = { args: { variant: "outline" } };
export const Tonal: Story = { args: { variant: "tonal" } };
export const Elevated: Story = { args: { variant: "elevated" } };
export const Plain: Story = { args: { variant: "plain" } };

/** All five variants side-by-side at default size. */
export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button variant="primary">Primary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="tonal">Tonal</Button>
      <Button variant="elevated">Elevated</Button>
      <Button variant="plain">Plain</Button>
    </div>
  ),
};

/** Sizes follow the `h-btn-{sm,md,lg}` component tokens (40 / 48 / 56 px). */
export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

/** Pass a Lucide icon (or any ReactNode) to `leadingIcon` / `trailingIcon`. */
export const WithIcon: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button leadingIcon={<Plus />}>Add item</Button>
      <Button variant="outline" trailingIcon={<ArrowRight />}>
        Continue
      </Button>
      <Button variant="tonal" leadingIcon={<Trash2 />} neutral>
        Delete
      </Button>
    </div>
  ),
};

/** `loading` keeps the label but swaps the leading icon for a spinner. */
export const Loading: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button loading>Saving</Button>
      <Button variant="outline" loading>
        Loading
      </Button>
      <Button variant="tonal" loading>
        Loading
      </Button>
    </div>
  ),
};

/** Use `neutral` when the button sits over an accent background or in a
 *  monochrome surface where the accent would compete. */
export const Neutral: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button variant="primary" neutral>
        Primary
      </Button>
      <Button variant="outline" neutral>
        Outline
      </Button>
      <Button variant="tonal" neutral>
        Tonal
      </Button>
      <Button variant="elevated" neutral>
        Elevated
      </Button>
      <Button variant="plain" neutral>
        Plain
      </Button>
    </div>
  ),
};

/** Disabled state across every variant. */
export const Disabled: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button disabled>Primary</Button>
      <Button variant="outline" disabled>
        Outline
      </Button>
      <Button variant="tonal" disabled>
        Tonal
      </Button>
      <Button variant="elevated" disabled>
        Elevated
      </Button>
      <Button variant="plain" disabled>
        Plain
      </Button>
    </div>
  ),
};
