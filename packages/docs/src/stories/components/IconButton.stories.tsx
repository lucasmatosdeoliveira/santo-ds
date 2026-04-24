import type { Meta, StoryObj } from "@storybook/react";
import { Heart, Settings, Trash2 } from "lucide-react";
import { IconButton } from "@santo-ds/ui";

const meta = {
  title: "Components/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  args: { "aria-label": "Settings", children: <Settings /> },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "outline", "tonal", "elevated", "plain"],
    },
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl", "2xl"] },
    neutral: { control: "boolean" },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { variant: "primary" } };
export const Outline: Story = { args: { variant: "outline" } };
export const Tonal: Story = { args: { variant: "tonal" } };
export const Elevated: Story = { args: { variant: "elevated" } };
export const Plain: Story = { args: { variant: "plain" } };

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <IconButton size="xs" aria-label="Like"><Heart /></IconButton>
      <IconButton size="sm" aria-label="Like"><Heart /></IconButton>
      <IconButton size="md" aria-label="Like"><Heart /></IconButton>
      <IconButton size="lg" aria-label="Like"><Heart /></IconButton>
      <IconButton size="xl" aria-label="Like"><Heart /></IconButton>
      <IconButton size="2xl" aria-label="Like"><Heart /></IconButton>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <IconButton variant="primary" aria-label="Favorite"><Heart /></IconButton>
      <IconButton variant="outline" aria-label="Settings"><Settings /></IconButton>
      <IconButton variant="tonal" aria-label="Delete"><Trash2 /></IconButton>
      <IconButton variant="elevated" aria-label="Settings"><Settings /></IconButton>
      <IconButton variant="plain" aria-label="Delete"><Trash2 /></IconButton>
    </div>
  ),
};

export const Neutral: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <IconButton variant="primary" neutral aria-label="Favorite"><Heart /></IconButton>
      <IconButton variant="outline" neutral aria-label="Settings"><Settings /></IconButton>
      <IconButton variant="tonal" neutral aria-label="Delete"><Trash2 /></IconButton>
      <IconButton variant="elevated" neutral aria-label="Settings"><Settings /></IconButton>
      <IconButton variant="plain" neutral aria-label="Delete"><Trash2 /></IconButton>
    </div>
  ),
};
