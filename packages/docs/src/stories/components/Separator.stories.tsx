import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "@santo-ds/ui";

const meta = {
  title: "Components/Separator",
  component: Separator,
  tags: ["autodocs"],
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-3">
      <p className="text-sm">Line above</p>
      <Separator />
      <p className="text-sm text-foreground-soft">Line below</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-12 items-center gap-3 text-sm">
      <span>Docs</span>
      <Separator orientation="vertical" />
      <span>Guides</span>
      <Separator orientation="vertical" />
      <span>Changelog</span>
    </div>
  ),
};
