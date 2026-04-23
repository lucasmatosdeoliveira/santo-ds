import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Chip } from "@santo-ds/ui";

const meta = {
  title: "Components/Chip",
  component: Chip,
  tags: ["autodocs"],
  args: { children: "Filter" },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = { args: { variant: "neutral" } };
export const Active: Story = { args: { variant: "active" } };

export const Toggleable: Story = {
  render: () => {
    const options = ["Men's", "Women's", "Kids", "Retro"];
    const [selected, setSelected] = useState<Set<string>>(new Set(["Men's"]));
    const toggle = (o: string) => {
      const next = new Set(selected);
      next.has(o) ? next.delete(o) : next.add(o);
      setSelected(next);
    };
    return (
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <Chip key={o} variant={selected.has(o) ? "active" : "neutral"} onClick={() => toggle(o)}>
            {o}
          </Chip>
        ))}
      </div>
    );
  },
};
