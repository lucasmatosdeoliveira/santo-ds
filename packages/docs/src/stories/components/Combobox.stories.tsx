import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Combobox, type ComboboxOption } from "@santo-ds/ui";

const teams: ComboboxOption[] = [
  { value: "santos", label: "Santos FC" },
  { value: "palmeiras", label: "Palmeiras" },
  { value: "corinthians", label: "Corinthians" },
  { value: "saopaulo", label: "São Paulo" },
  { value: "flamengo", label: "Flamengo" },
  { value: "fluminense", label: "Fluminense" },
  { value: "vasco", label: "Vasco da Gama" },
  { value: "botafogo", label: "Botafogo" },
  { value: "gremio", label: "Grêmio" },
  { value: "internacional", label: "Internacional" },
];

const meta = {
  title: "Components/Inputs/Combobox",
  component: Combobox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The **Combobox** is a **searchable Select** — a popover that filters
its options as the user types.

### When to use

- 10+ options where scanning is slow.
- Mixed lookups (cities, users, countries) where the user knows roughly
  what they're looking for.

### When **not** to use

- 2–5 options → \`<RadioGroup>\`.
- 6–10 options without typing benefit → \`<Select>\`.
- The user might enter a *new* value that's not in the list → consider a
  free-form \`<Input>\` with autocomplete suggestions instead.

Pass an \`options\` array of \`{ value, label }\` and use the controlled
\`value\` / \`onValueChange\` API.
        `,
      },
    },
  },
  args: { placeholder: "Pick a team", disabled: false },
  argTypes: {
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    options: { control: false, table: { disable: true } },
    value: { control: false, table: { disable: true } },
    onValueChange: { control: false, table: { disable: true } },
  },
  render: (args) => {
    const [value, setValue] = useState<string>("");
    return (
      <div className="w-72">
        <Combobox {...args} options={teams} value={value} onValueChange={setValue} />
      </div>
    );
  },
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Drive every prop from the controls panel. */
export const Playground: Story = {};

/** A pre-selected default value. */
export const WithDefault: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const [value, setValue] = useState<string>("santos");
    return (
      <div className="w-72">
        <Combobox
          options={teams}
          value={value}
          onValueChange={setValue}
          placeholder="Pick a team"
        />
      </div>
    );
  },
};
