import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "@santo-ds/ui";

const meta = {
  title: "Components/Inputs/Slider",
  component: Slider,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The **Slider** picks a **numeric value** (or **range**) from a
continuous span. The range is visualised so the user can quickly judge
how far along they are.

### When to use

- Volume / brightness / opacity controls.
- Price-range filters.
- Any numeric input where ±1 precision matters less than seeing the
  full span at a glance.

### When **not** to use

- Exact numeric input → use a \`type="number"\` \`<Input>\`.
- Discrete values that read better as labels → use \`<Select>\` or chips.

Built on \`@radix-ui/react-slider\`. Pass \`defaultValue={[40]}\` for a
single thumb or \`defaultValue={[20, 80]}\` for a range. The component is
fully keyboard accessible (←→ adjust, Home/End jump to bounds, Page
Up/Down step in 10s).
        `,
      },
    },
  },
  args: {
    defaultValue: [40],
    max: 100,
    min: 0,
    step: 1,
    disabled: false,
  },
  argTypes: {
    min: { control: { type: "number" } },
    max: { control: { type: "number" } },
    step: { control: { type: "number", min: 1 } },
    disabled: { control: "boolean" },
    defaultValue: { control: false, table: { disable: true } },
    value: { control: false, table: { disable: true } },
    onValueChange: { control: false, table: { disable: true } },
  },
  render: (args) => (
    <div className="w-80">
      <Slider {...args} />
    </div>
  ),
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Drive every prop from the controls panel. */
export const Playground: Story = {};

export const Default: Story = { args: { defaultValue: [40] } };

/** Two thumbs make a range slider. */
export const Range: Story = { args: { defaultValue: [20, 80] } };

/** Stepped values — only multiples of `step` are reachable. */
export const Stepped: Story = { args: { defaultValue: [50], step: 10 } };
