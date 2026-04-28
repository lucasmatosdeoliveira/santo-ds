import type { Meta, StoryObj } from "@storybook/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@santo-ds/ui";

const meta = {
  title: "Components/Inputs/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The **Select** picks **one option from a list** that's revealed in a
floating popover. Use it for **6 + items** (under that, prefer
\`<RadioGroup>\` so users see every option without a click).

### When to use

- Country / region pickers
- Long static dropdowns (timezone, language)
- Categorisation pickers in forms

### When **not** to use

- Free-text + suggestions → use \`<Combobox>\` instead.
- 2–5 mutually-exclusive options → use \`<RadioGroup>\`.

Built on \`@radix-ui/react-select\` — fully keyboard accessible, supports
groups, separators and labels.
        `,
      },
    },
  },
  args: { disabled: false },
  argTypes: {
    disabled: { control: "boolean" },
    defaultValue: {
      control: "select",
      options: [undefined, "santos", "palmeiras", "corinthians", "saopaulo"],
    },
    value: { control: false, table: { disable: true } },
  },
  render: (args) => (
    <Select {...args}>
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
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Drive every prop from the controls panel. */
export const Playground: Story = {};

/** Use `SelectGroup` + `SelectLabel` for a grouped menu. */
export const Grouped: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Select>
      <SelectTrigger className="w-64">
        <SelectValue placeholder="Pick a club" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Brasileirão A</SelectLabel>
          <SelectItem value="santos">Santos FC</SelectItem>
          <SelectItem value="palmeiras">Palmeiras</SelectItem>
          <SelectItem value="corinthians">Corinthians</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Premier League</SelectLabel>
          <SelectItem value="arsenal">Arsenal</SelectItem>
          <SelectItem value="liverpool">Liverpool</SelectItem>
          <SelectItem value="city">Manchester City</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};
