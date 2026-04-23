import type { Meta, StoryObj } from "@storybook/react";
import { Field, PasswordField } from "@santo-ds/ui";

const meta = {
  title: "Components/PasswordField",
  component: PasswordField,
  tags: ["autodocs"],
} satisfies Meta<typeof PasswordField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Field label="Password" htmlFor="pw" helperText="Use at least 12 characters." className="w-80">
      <PasswordField id="pw" placeholder="Your password" />
    </Field>
  ),
};
