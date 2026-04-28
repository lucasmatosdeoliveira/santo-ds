import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox, Label } from "@santo-ds/ui";

const meta = {
  title: "Components/Inputs/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The **Checkbox** lets the user toggle individual values **on or off** —
or pick **multiple items** from a list.

### When to use

- Single binary decisions that aren't immediately committed
  (e.g. *Accept terms*, *Remember me*).
- Multi-select lists where each row is independent.
- Settings panels with a list of toggleable preferences.

### When **not** to use

- A binary state that takes effect *immediately* → use \`<Switch>\`.
- A single choice from a small set → use \`<RadioGroup>\`.

Built on \`@radix-ui/react-checkbox\` — supports controlled
(\`checked\` / \`onCheckedChange\`) and indeterminate (\`checked="indeterminate"\`)
states.

> Pair with a \`<Label htmlFor>\` for clickable text and proper screen-reader announcement.
        `,
      },
    },
  },
  args: { disabled: false, defaultChecked: false },
  argTypes: {
    defaultChecked: { control: "boolean" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    checked: { control: false, table: { disable: true } },
  },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" {...args} />
      <Label htmlFor="terms">Accept terms & conditions</Label>
    </div>
  ),
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Drive every prop from the controls panel. */
export const Playground: Story = {};

/** All states side-by-side. */
export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Checkbox id="a" />
        <Label htmlFor="a">Unchecked</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="b" defaultChecked />
        <Label htmlFor="b">Checked</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="c" checked="indeterminate" />
        <Label htmlFor="c">Indeterminate</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="d" disabled />
        <Label htmlFor="d">Disabled</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="e" disabled defaultChecked />
        <Label htmlFor="e">Disabled checked</Label>
      </div>
    </div>
  ),
};

/** Multi-select list of preferences. */
export const Group: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Checkbox id="news" defaultChecked />
        <Label htmlFor="news">Weekly newsletter</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="updates" />
        <Label htmlFor="updates">Product updates</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="marketing" />
        <Label htmlFor="marketing">Marketing emails</Label>
      </div>
    </div>
  ),
};
