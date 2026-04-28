import type { Meta, StoryObj } from "@storybook/react";
import { Bold, Italic, Underline } from "lucide-react";
import { Toggle } from "@santo-ds/ui";

const meta = {
  title: "Components/Actions/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The **Toggle** is a two-state button — pressed or unpressed — for
**inline tool actions**: text formatting (bold/italic), view toggles
(grid/list), filter pills.

### When to use

- The action toggles a binary visual / data state immediately (no commit).
- The action lives inside a toolbar of similar mutually-independent toggles.

### When **not** to use

- For form inputs that need a label → use \`<Switch>\` or \`<Checkbox>\`.
- For sets where only one can be active at a time → use a radio group.

Built on \`@radix-ui/react-toggle\` — exposes \`pressed\` /
\`onPressedChange\` and uses \`data-state="on|off"\` for variant styling.
        `,
      },
    },
  },
  args: {
    "aria-label": "Toggle bold",
    children: <Bold />,
    variant: "default",
    size: "md",
  },
  argTypes: {
    "aria-label": {
      control: "text",
      description: "Required. Read by screen readers as the toggle name.",
    },
    variant: {
      control: "inline-radio",
      options: ["default", "outline"],
      table: { defaultValue: { summary: "default" } },
    },
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
      table: { defaultValue: { summary: "md" } },
    },
    pressed: {
      control: "boolean",
      description: "Controlled pressed state.",
    },
    defaultPressed: {
      control: "boolean",
      description: "Initial pressed state (uncontrolled).",
    },
    disabled: { control: "boolean" },
    children: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Drive every prop from the controls panel. */
export const Playground: Story = {};

export const Default: Story = {
  args: { "aria-label": "Toggle bold", children: <Bold /> },
};

export const Outline: Story = {
  args: { variant: "outline", "aria-label": "Toggle italic", children: <Italic /> },
};

/** A typical text-formatting toolbar. */
export const Toolbar: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-1 rounded-md border border-border-soft bg-background p-1">
      <Toggle aria-label="Bold" defaultPressed>
        <Bold />
      </Toggle>
      <Toggle aria-label="Italic">
        <Italic />
      </Toggle>
      <Toggle aria-label="Underline">
        <Underline />
      </Toggle>
    </div>
  ),
};
