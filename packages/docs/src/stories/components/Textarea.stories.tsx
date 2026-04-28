import type { Meta, StoryObj } from "@storybook/react";
import { Field, Textarea } from "@santo-ds/ui";

const meta = {
  title: "Components/Inputs/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The **Textarea** is for **multi-line free-form text** — comments,
descriptions, feedback. The field starts at ~80px tall and is vertically
resizable by default (the browser handle).

### When to use

- Bios / descriptions
- Comment / message composition
- Long-form feedback or notes

### When **not** to use

- Single-line values → use \`<Input>\`.
- Rich-text / markdown editing → use a dedicated editor component.

Wrap in \`<Field>\` for label + helper / error messaging.
        `,
      },
    },
  },
  args: {
    placeholder: "Tell us more…",
    disabled: false,
    rows: 4,
  },
  argTypes: {
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    rows: { control: { type: "number", min: 2, max: 12 } },
    defaultValue: { control: "text" },
    value: { control: false, table: { disable: true } },
  },
  render: (args) => (
    <div className="w-80">
      <Textarea {...args} />
    </div>
  ),
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Drive every prop from the controls panel. */
export const Playground: Story = {};

export const Default: Story = {};
export const Filled: Story = {
  args: { defaultValue: "Santos é o time de futebol mais glorioso do Brasil." },
};
export const Disabled: Story = {
  args: { disabled: true, defaultValue: "Locked content" },
};

/** Wrapped in a Field with helper text. */
export const WithField: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Field label="Bio" htmlFor="bio" helperText="Up to 200 characters." className="w-80">
      <Textarea id="bio" rows={5} placeholder="Tell us about yourself…" />
    </Field>
  ),
};
