import type { Meta, StoryObj } from "@storybook/react";
import { Label, RadioGroup, RadioGroupItem } from "@santo-ds/ui";

const meta = {
  title: "Components/Inputs/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The **RadioGroup** lets the user pick **exactly one** option from a
**small, mutually-exclusive set** (typically 2–5 items).

### When to use

- 2–5 visible, mutually-exclusive options where seeing them all helps the
  decision (plan tiers, payment methods, t-shirt size).

### When **not** to use

- 6+ options → use \`<Select>\` to avoid overwhelming the page.
- Multi-select → use \`<Checkbox>\` rows.
- Binary on/off → use \`<Switch>\`.

Built on \`@radix-ui/react-radio-group\` — keyboard navigable
(↑↓ between items, Space to select). The whole group shares a single
\`name\`, so it submits as one form value.
        `,
      },
    },
  },
  args: { defaultValue: "starter", disabled: false },
  argTypes: {
    defaultValue: {
      control: "inline-radio",
      options: ["starter", "pro", "enterprise"],
      description: "Initial selected value (uncontrolled).",
    },
    disabled: { control: "boolean", description: "Disable every item in the group." },
    value: { control: false, table: { disable: true } },
  },
  render: (args) => (
    <RadioGroup className="flex flex-col gap-3" {...args}>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="starter" id="r-starter" />
        <Label htmlFor="r-starter">Starter — $0/mo</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="pro" id="r-pro" />
        <Label htmlFor="r-pro">Pro — $19/mo</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="enterprise" id="r-enterprise" />
        <Label htmlFor="r-enterprise">Enterprise — Talk to sales</Label>
      </div>
    </RadioGroup>
  ),
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Drive every prop from the controls panel. */
export const Playground: Story = {};

/** A horizontal layout for short labels. */
export const Horizontal: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <RadioGroup defaultValue="md" className="flex gap-4">
      {["xs", "sm", "md", "lg", "xl"].map((s) => (
        <div key={s} className="flex items-center gap-2">
          <RadioGroupItem value={s} id={`size-${s}`} />
          <Label htmlFor={`size-${s}`}>{s.toUpperCase()}</Label>
        </div>
      ))}
    </RadioGroup>
  ),
};
