import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "@santo-ds/ui";

const meta = {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  args: { placeholder: "Tell us more…", className: "w-80" },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true, value: "Locked content" } };
