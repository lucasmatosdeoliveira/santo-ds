import type { Meta, StoryObj } from "@storybook/react";
import { Button, Input, Label, Popover, PopoverContent, PopoverTrigger } from "@santo-ds/ui";

const meta = {
  title: "Components/Popover",
  component: Popover,
  tags: ["autodocs"],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Dimensions</Button>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <h4 className="text-sm font-semibold">Dimensions</h4>
            <p className="text-xs text-foreground-soft">Set the layout size.</p>
          </div>
          <div className="flex items-center gap-3">
            <Label htmlFor="w" className="w-16 text-sm">Width</Label>
            <Input id="w" defaultValue="320px" className="h-8" />
          </div>
          <div className="flex items-center gap-3">
            <Label htmlFor="h" className="w-16 text-sm">Height</Label>
            <Input id="h" defaultValue="240px" className="h-8" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};
