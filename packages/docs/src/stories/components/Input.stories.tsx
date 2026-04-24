import type { Meta, StoryObj } from "@storybook/react";
import { Input, Field } from "@santo-ds/ui";

const meta = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  args: { placeholder: "Type here…" },
  argTypes: {
    size: { control: "select", options: ["sm", "lg"] },
    invalid: { control: "boolean" },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Filled: Story = { args: { defaultValue: "Santo Souza" } };
export const Invalid: Story = { args: { invalid: true, defaultValue: "invalid" } };
export const ReadOnly: Story = { args: { readOnly: true, defaultValue: "Read-only value" } };
export const Disabled: Story = { args: { disabled: true, defaultValue: "Disabled" } };

export const Sizes: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-3">
      <Input size="sm" placeholder="Medium (48)" />
      <Input size="lg" placeholder="Large (56)" />
    </div>
  ),
};

export const States: Story = {
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

export const WithField: Story = {
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
