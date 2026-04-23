import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "@santo-ds/ui";

const meta = {
  title: "Components/Progress",
  component: Progress,
  tags: ["autodocs"],
  args: { value: 60, className: "w-80" },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Empty: Story = { args: { value: 0 } };
export const Full: Story = { args: { value: 100 } };
