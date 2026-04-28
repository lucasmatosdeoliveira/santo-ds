import type { Meta, StoryObj } from "@storybook/react";
import { Heart, Settings, Trash2 } from "lucide-react";
import { IconButton } from "@santo-ds/ui";

const meta = {
  title: "Components/Actions/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The **IconButton** is a square, icon-only counterpart to \`<Button>\`. Use it
in toolbars, table rows, card headers, and anywhere screen real-estate
is tight.

### When to use

- Action repeats often and the icon is unambiguous (settings ⚙, delete 🗑, like ♥).
- The action is **secondary** to the surrounding context.
- You need a tap-target without a label.

### When **not** to use

- The action is the page's primary CTA → use \`<Button>\` with a label.
- The icon's meaning is ambiguous → use \`<Button>\` with a label.

### Accessibility

\`aria-label\` is **required**. Screen readers read it as the button name.
Pair with \`<Tooltip>\` for sighted hover discoverability.

### Sizing

The size token (\`xs\` → \`2xl\`) drives both the button square and the
inner icon — they always stay proportional via the
\`size-icon-btn-{size}\` and \`size-icon-btn-icon-{size}\` token pair.
        `,
      },
    },
  },
  args: {
    "aria-label": "Settings",
    children: <Settings />,
    variant: "tonal",
    size: "lg",
    neutral: false,
  },
  argTypes: {
    "aria-label": {
      control: "text",
      description: "Required. Read by screen readers as the button name.",
      table: { type: { summary: "string" } },
    },
    variant: {
      control: "inline-radio",
      options: ["primary", "outline", "tonal", "elevated", "plain"],
      table: { defaultValue: { summary: "tonal" } },
    },
    size: {
      control: "inline-radio",
      options: ["xs", "sm", "md", "lg", "xl", "2xl"],
      table: { defaultValue: { summary: "lg" } },
    },
    neutral: {
      control: "boolean",
      description: "Use foreground (neutral) instead of accent palette.",
    },
    children: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Drive every prop from the controls panel. */
export const Playground: Story = {};

export const Primary: Story = { args: { variant: "primary" } };
export const Outline: Story = { args: { variant: "outline" } };
export const Tonal: Story = { args: { variant: "tonal" } };
export const Elevated: Story = { args: { variant: "elevated" } };
export const Plain: Story = { args: { variant: "plain" } };

/** Six size tokens — `xs` (28) up to `2xl` (64). */
export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-3">
      <IconButton size="xs" aria-label="Like"><Heart /></IconButton>
      <IconButton size="sm" aria-label="Like"><Heart /></IconButton>
      <IconButton size="md" aria-label="Like"><Heart /></IconButton>
      <IconButton size="lg" aria-label="Like"><Heart /></IconButton>
      <IconButton size="xl" aria-label="Like"><Heart /></IconButton>
      <IconButton size="2xl" aria-label="Like"><Heart /></IconButton>
    </div>
  ),
};

export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-3">
      <IconButton variant="primary" aria-label="Favorite"><Heart /></IconButton>
      <IconButton variant="outline" aria-label="Settings"><Settings /></IconButton>
      <IconButton variant="tonal" aria-label="Delete"><Trash2 /></IconButton>
      <IconButton variant="elevated" aria-label="Settings"><Settings /></IconButton>
      <IconButton variant="plain" aria-label="Delete"><Trash2 /></IconButton>
    </div>
  ),
};

export const Neutral: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-3">
      <IconButton variant="primary" neutral aria-label="Favorite"><Heart /></IconButton>
      <IconButton variant="outline" neutral aria-label="Settings"><Settings /></IconButton>
      <IconButton variant="tonal" neutral aria-label="Delete"><Trash2 /></IconButton>
      <IconButton variant="elevated" neutral aria-label="Settings"><Settings /></IconButton>
      <IconButton variant="plain" neutral aria-label="Delete"><Trash2 /></IconButton>
    </div>
  ),
};
