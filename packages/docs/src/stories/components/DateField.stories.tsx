import type { Meta, StoryObj } from "@storybook/react";
import { DateField, Field } from "@santo-ds/ui";

const meta = {
  title: "Components/Inputs/DateField",
  component: DateField,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The **DateField** is a single-line input that uses the native browser
date picker (\`<input type="date">\`). It ships with the same sizing,
border and focus tokens as the other Input controls.

### When to use

- Quick date entry where the native picker is acceptable
  (booking, schedule, due-date filters).

### When **not** to use

- Date *ranges*, multi-select dates, or business-rule-driven
  availability — reach for a dedicated date-picker component.

Always wrap in \`<Field>\` for label + helper / error messaging.
        `,
      },
    },
  },
  args: { disabled: false },
  argTypes: {
    disabled: { control: "boolean" },
    defaultValue: { control: "text" },
    value: { control: false, table: { disable: true } },
    min: { control: "text", description: "Minimum selectable date (ISO yyyy-mm-dd)." },
    max: { control: "text", description: "Maximum selectable date (ISO yyyy-mm-dd)." },
  },
  render: (args) => (
    <Field label="Match day" htmlFor="match" className="w-80">
      <DateField id="match" {...args} />
    </Field>
  ),
} satisfies Meta<typeof DateField>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Drive every prop from the controls panel. */
export const Playground: Story = {};

export const WithError: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Field
      label="Match day"
      htmlFor="match-err"
      error="Please pick a future date."
      className="w-80"
    >
      <DateField id="match-err" defaultValue="2020-01-01" />
    </Field>
  ),
};

export const Disabled: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Field label="Match day" htmlFor="match-disabled" className="w-80">
      <DateField id="match-disabled" disabled defaultValue="2026-04-28" />
    </Field>
  ),
};
