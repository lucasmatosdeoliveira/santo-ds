import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "@santo-ds/ui";

const meta = {
  title: "Components/Display/Separator",
  component: Separator,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The **Separator** is a thin rule that **groups or splits** related
content — list rows, sections in a sidebar, items in a horizontal
toolbar.

### When to use

- Between unrelated groups inside the same container.
- Between menu items and section labels in a dropdown.

### When **not** to use

- As padding — use whitespace.
- As visual decoration — Separators are part of the document outline
  (\`role="separator"\`), so screen readers announce them.

Built on \`@radix-ui/react-separator\`. Pass \`orientation\` to flip
horizontal ↔ vertical, and \`decorative\` if it's purely visual.
        `,
      },
    },
  },
  args: { orientation: "horizontal", decorative: true },
  argTypes: {
    orientation: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
      table: { defaultValue: { summary: "horizontal" } },
    },
    decorative: {
      control: "boolean",
      description: "When true, removes the `role=separator` semantics.",
    },
  },
  render: (args) => (
    <div className={args.orientation === "vertical" ? "flex h-12 items-center gap-3 text-sm" : "flex w-80 flex-col gap-3"}>
      <span className="text-sm">Item one</span>
      <Separator {...args} />
      <span className="text-sm text-foreground-soft">Item two</span>
    </div>
  ),
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Drive every prop from the controls panel. */
export const Playground: Story = {};

export const Horizontal: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex w-80 flex-col gap-3">
      <p className="text-sm">Line above</p>
      <Separator />
      <p className="text-sm text-foreground-soft">Line below</p>
    </div>
  ),
};

export const Vertical: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex h-12 items-center gap-3 text-sm">
      <span>Docs</span>
      <Separator orientation="vertical" />
      <span>Guides</span>
      <Separator orientation="vertical" />
      <span>Changelog</span>
    </div>
  ),
};
