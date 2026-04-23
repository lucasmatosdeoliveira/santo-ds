import type { Meta, StoryObj } from "@storybook/react";
import { Label, Switch } from "@santo-ds/ui";

const meta = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="notif" />
      <Label htmlFor="notif">Email notifications</Label>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Switch id="a" />
        <Label htmlFor="a">Off</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="b" defaultChecked />
        <Label htmlFor="b">On</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="c" disabled />
        <Label htmlFor="c">Disabled</Label>
      </div>
    </div>
  ),
};
