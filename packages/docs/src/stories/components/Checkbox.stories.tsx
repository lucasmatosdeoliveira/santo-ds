import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox, Label } from "@santo-ds/ui";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms & conditions</Label>
    </div>
  ),
};

export const States: Story = {
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
        <Checkbox id="c" disabled />
        <Label htmlFor="c">Disabled</Label>
      </div>
    </div>
  ),
};
