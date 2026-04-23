import type { Meta, StoryObj } from "@storybook/react";
import { DateField, Field } from "@santo-ds/ui";

const meta = {
  title: "Components/DateField",
  component: DateField,
  tags: ["autodocs"],
} satisfies Meta<typeof DateField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Field label="Match day" htmlFor="match" className="w-80">
      <DateField id="match" />
    </Field>
  ),
};
