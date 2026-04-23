import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Combobox, type ComboboxOption } from "@santo-ds/ui";

const options: ComboboxOption[] = [
  { value: "santos", label: "Santos FC" },
  { value: "palmeiras", label: "Palmeiras" },
  { value: "corinthians", label: "Corinthians" },
  { value: "saopaulo", label: "São Paulo" },
  { value: "flamengo", label: "Flamengo" },
  { value: "fluminense", label: "Fluminense" },
];

const meta = {
  title: "Components/Combobox",
  component: Combobox,
  tags: ["autodocs"],
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string>("");
    return (
      <div className="w-72">
        <Combobox options={options} value={value} onValueChange={setValue} placeholder="Pick a team" />
      </div>
    );
  },
};
