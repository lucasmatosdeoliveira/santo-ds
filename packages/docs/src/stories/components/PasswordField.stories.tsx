import type { Meta, StoryObj } from "@storybook/react";
import { Field, PasswordField } from "@santo-ds/ui";

const meta = {
  title: "Components/Inputs/PasswordField",
  component: PasswordField,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The **PasswordField** is a single-line input that masks its value with
\`type="password"\` and ships a built-in **show / hide** toggle. The
toggle keeps focus inside the input and is announced as a button to
screen readers.

### When to use

- Login & sign-up flows.
- Account-settings password change.

### Composition

Always pair with \`<Field>\` for label + helper / error messaging.

> Treat it like a regular \`<input>\` — every native attribute
> (\`autoComplete\`, \`name\`, \`required\`, \`minLength\` …) is forwarded.
        `,
      },
    },
  },
  args: { placeholder: "Your password" },
  argTypes: {
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    defaultValue: { control: "text" },
    value: { control: false, table: { disable: true } },
  },
  render: (args) => (
    <div className="w-80">
      <PasswordField {...args} />
    </div>
  ),
} satisfies Meta<typeof PasswordField>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Drive every prop from the controls panel. */
export const Playground: Story = {};

export const WithField: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Field
      label="Password"
      htmlFor="pw"
      helperText="Use at least 12 characters."
      className="w-80"
    >
      <PasswordField id="pw" placeholder="Your password" autoComplete="new-password" />
    </Field>
  ),
};

export const WithError: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Field
      label="Password"
      htmlFor="pw-err"
      error="Password must contain a special character."
      className="w-80"
    >
      <PasswordField id="pw-err" defaultValue="weakpass" />
    </Field>
  ),
};
