import type { Meta, StoryObj } from "@storybook/react";
import { ArrowRight, Plus } from "lucide-react";
import { Button } from "@santo-ds/ui";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  args: { children: "Button" },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "outline", "tonal", "elevated", "plain"],
    },
    size: { control: "select", options: ["sm", "md", "lg"] },
    neutral: { control: "boolean" },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Button>;

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
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button leadingIcon={<Plus />}>Add item</Button>
      <Button variant="outline" trailingIcon={<ArrowRight />}>
        Continue
      </Button>
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button loading>Saving</Button>
      <Button variant="outline" loading>Loading</Button>
      <Button variant="tonal" loading>Loading</Button>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button variant="primary">Primary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="tonal">Tonal</Button>
      <Button variant="elevated">Elevated</Button>
      <Button variant="plain">Plain</Button>
    </div>
  ),
};

export const Neutral: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button variant="primary" neutral>Primary</Button>
      <Button variant="outline" neutral>Outline</Button>
      <Button variant="tonal" neutral>Tonal</Button>
      <Button variant="elevated" neutral>Elevated</Button>
      <Button variant="plain" neutral>Plain</Button>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button disabled>Primary</Button>
      <Button variant="outline" disabled>Outline</Button>
      <Button variant="tonal" disabled>Tonal</Button>
      <Button variant="elevated" disabled>Elevated</Button>
      <Button variant="plain" disabled>Plain</Button>
    </div>
  ),
};
