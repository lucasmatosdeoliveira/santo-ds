import type { Meta, StoryObj } from "@storybook/react";
import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@santo-ds/ui";

const meta = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  decorators: [(Story) => <TooltipProvider><Story /></TooltipProvider>],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="secondary">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>This is a tooltip</TooltipContent>
    </Tooltip>
  ),
};
