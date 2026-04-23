import type { Meta, StoryObj } from "@storybook/react";
import { Label, RadioGroup, RadioGroupItem } from "@santo-ds/ui";

const meta = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="starter" className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="starter" id="r-starter" />
        <Label htmlFor="r-starter">Starter</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="pro" id="r-pro" />
        <Label htmlFor="r-pro">Pro</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="enterprise" id="r-enterprise" />
        <Label htmlFor="r-enterprise">Enterprise</Label>
      </div>
    </RadioGroup>
  ),
};
