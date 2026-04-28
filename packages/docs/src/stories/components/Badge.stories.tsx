import type { Meta, StoryObj } from "@storybook/react";
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { Badge } from "@santo-ds/ui";

const meta = {
  title: "Components/Display/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The **Badge** is a small, **read-only** label for **status, count or
category** of a nearby element.

### Badge vs Chip

| | Badge | Chip |
|---|---|---|
| Interactive | ❌ Read-only | ✅ Clickable |
| Use for | Status, count | Filter, tag |
| Example | *Beta*, *3 unread* | *Men's*, *Women's* |

### Variant guide

- \`neutral\` — generic info (*Beta*, *New*).
- \`accent\` — brand-tinted highlight.
- \`success\` / \`warning\` / \`danger\` — status semantics.
- \`solid\` — high-contrast ink-on-accent for premium emphasis.
        `,
      },
    },
  },
  args: { children: "Badge", variant: "neutral" },
  argTypes: {
    children: { control: "text" },
    variant: {
      control: "inline-radio",
      options: ["neutral", "accent", "success", "warning", "danger", "solid"],
      table: { defaultValue: { summary: "neutral" } },
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Drive every prop from the controls panel. */
export const Playground: Story = {};

export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="neutral">Neutral</Badge>
      <Badge variant="accent">Accent</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="solid">Solid</Badge>
    </div>
  ),
};

/** Pair with an icon for stronger semantics. */
export const WithIcon: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="success">
        <CheckCircle2 aria-hidden className="size-3" /> Active
      </Badge>
      <Badge variant="warning">
        <AlertTriangle aria-hidden className="size-3" /> Trial expiring
      </Badge>
      <Badge variant="danger">
        <XCircle aria-hidden className="size-3" /> Failed
      </Badge>
    </div>
  ),
};

/** As a numeric count next to a label. */
export const Count: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="inline-flex items-center gap-2">
      <span className="text-sm font-medium">Inbox</span>
      <Badge variant="solid">12</Badge>
    </div>
  ),
};
