import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "@santo-ds/ui";

const meta = {
  title: "Components/Display/Progress",
  component: Progress,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The **Progress** bar communicates the **completion percentage** of a
known-length task — file upload, multi-step form, profile completion.

### When to use

- Linear, finite tasks where the percentage is meaningful.
- Visual encouragement (onboarding checklists, achievements).

### When **not** to use

- Indeterminate work without a known end → use a spinner.
- Layout placeholders → use \`<Skeleton>\`.

The visual tracks 0 → 100. Pass \`value={null}\` (or omit) to render an
empty bar. Built on \`@radix-ui/react-progress\` so it sets
\`role="progressbar"\` and exposes \`aria-valuenow\` / \`aria-valuemax\`
automatically.
        `,
      },
    },
  },
  args: { value: 60, className: "w-80" },
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "0–100 percentage. `null`/`undefined` = empty bar.",
    },
    max: {
      control: { type: "number" },
      description: "Maximum value. Defaults to 100.",
    },
    className: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Drive every prop from the controls panel. */
export const Playground: Story = {};

export const Empty: Story = { args: { value: 0 } };
export const Half: Story = { args: { value: 50 } };
export const Full: Story = { args: { value: 100 } };

/** Pair with a label and percent indicator. */
export const Labelled: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex w-80 flex-col gap-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">Profile completion</span>
        <span className="text-foreground-soft">68%</span>
      </div>
      <Progress value={68} />
    </div>
  ),
};
