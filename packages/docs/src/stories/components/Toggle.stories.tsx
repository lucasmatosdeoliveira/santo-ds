import type { Meta, StoryObj } from "@storybook/react";
import { Bold, Italic } from "lucide-react";
import { Toggle } from "@santo-ds/ui";

const meta = {
  title: "Components/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default", "outline"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { "aria-label": "Toggle bold", children: <Bold /> },
};

export const Outline: Story = {
  args: { variant: "outline", "aria-label": "Toggle italic", children: <Italic /> },
};
