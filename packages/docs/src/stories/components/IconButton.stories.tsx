import type { Meta, StoryObj } from "@storybook/react";
import { Heart, Settings, Trash2 } from "lucide-react";
import { IconButton } from "@santo-ds/ui";

const meta = {
  title: "Components/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  args: { "aria-label": "Settings", children: <Settings /> },
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary", "ghost"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { variant: "primary" } };
export const Secondary: Story = { args: { variant: "secondary" } };
export const Ghost: Story = { args: { variant: "ghost" } };

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <IconButton size="sm" aria-label="Like"><Heart /></IconButton>
      <IconButton size="md" aria-label="Like"><Heart /></IconButton>
      <IconButton size="lg" aria-label="Like"><Heart /></IconButton>
    </div>
  ),
};

export const Gallery: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <IconButton variant="primary" aria-label="Add to favorites"><Heart /></IconButton>
      <IconButton variant="secondary" aria-label="Settings"><Settings /></IconButton>
      <IconButton variant="ghost" aria-label="Delete"><Trash2 /></IconButton>
    </div>
  ),
};
