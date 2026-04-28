import type { Meta, StoryObj } from "@storybook/react";
import { Input, Field } from "@santo-ds/ui";

const meta = {
  title: "Components/Inputs/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The **Input** is the primary single-line text control. Use it for
emails, usernames, search, numeric values — anything that fits on one
line.

### Composition

In production code, **always wrap an Input in \`<Field>\`** so it gets a
visible label, helper text and validation messaging consistent with the
rest of the system.

### States

- **Default** — neutral border, focus ring on keyboard focus.
- **Filled** — a value is present.
- **Invalid** — \`invalid\` prop **or** \`aria-invalid\`. Border + ring
  switch to the danger token.
- **Read-only** — keeps content readable but blocks edits.
- **Disabled** — visually muted, non-interactive.

### Sizing

- \`sm\` (48px) — default.
- \`lg\` (56px) — hero forms / standalone CTAs.
        `,
      },
    },
  },
  args: { placeholder: "Type here…", size: "sm", invalid: false, disabled: false, readOnly: false },
  argTypes: {
    placeholder: { control: "text" },
    size: {
      control: "inline-radio",
      options: ["sm", "lg"],
      table: { defaultValue: { summary: "sm" } },
    },
    invalid: {
      control: "boolean",
      description: "Render in error state. Also sets `aria-invalid`.",
    },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
    type: {
      control: "select",
      options: ["text", "email", "password", "search", "tel", "url", "number"],
      table: { defaultValue: { summary: "text" } },
    },
    value: { control: false, table: { disable: true } },
    defaultValue: { control: "text" },
  },
  render: (args) => (
    <div className="w-80">
      <Input {...args} />
    </div>
  ),
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Drive every prop from the controls panel. */
export const Playground: Story = {};

export const Default: Story = {};
export const Filled: Story = { args: { defaultValue: "Santo Souza" } };
export const Invalid: Story = { args: { invalid: true, defaultValue: "invalid" } };
export const ReadOnly: Story = { args: { readOnly: true, defaultValue: "Read-only value" } };
export const Disabled: Story = { args: { disabled: true, defaultValue: "Disabled" } };

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex w-80 flex-col gap-3">
      <Input size="sm" placeholder="Small (48)" />
      <Input size="lg" placeholder="Large (56)" />
    </div>
  ),
};

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex w-80 flex-col gap-3">
      <Input placeholder="Default" />
      <Input defaultValue="Filled" />
      <Input invalid defaultValue="Error" />
      <Input readOnly defaultValue="Read-only" />
      <Input disabled defaultValue="Disabled" />
    </div>
  ),
};

/** **Recommended pattern** — always wrap inputs in `<Field>`. */
export const WithField: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <Field label="Email" htmlFor="email" required helperText="We'll never share it.">
        <Input id="email" type="email" placeholder="you@domain.com" />
      </Field>
      <Field label="Username" htmlFor="user" error="This username is taken.">
        <Input id="user" defaultValue="santos" invalid />
      </Field>
    </div>
  ),
};
