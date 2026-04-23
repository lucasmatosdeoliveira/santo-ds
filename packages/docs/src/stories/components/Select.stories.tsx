import type { Meta, StoryObj } from "@storybook/react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@santo-ds/ui";

const meta = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Choose a team" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="santos">Santos FC</SelectItem>
        <SelectItem value="palmeiras">Palmeiras</SelectItem>
        <SelectItem value="corinthians">Corinthians</SelectItem>
        <SelectItem value="saopaulo">São Paulo</SelectItem>
      </SelectContent>
    </Select>
  ),
};
