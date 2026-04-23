import type { Meta, StoryObj } from "@storybook/react";
import { Input, Field } from "@santo-ds/ui";

const meta = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  args: { placeholder: "Type here…" },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true, value: "Read-only" } };

export const WithField: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <Field label="Email" htmlFor="email" required helperText="We'll never share it.">
        <Input id="email" type="email" placeholder="you@domain.com" />
      </Field>
      <Field label="Username" htmlFor="user" error="This username is taken.">
        <Input id="user" defaultValue="santos" aria-invalid />
      </Field>
    </div>
  ),
};
