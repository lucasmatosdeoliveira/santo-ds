import type { Meta, StoryObj } from "@storybook/react";
import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@santo-ds/ui";

const meta = {
  title: "Components/Feedback/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The **Alert** is an **inline, persistent banner** that surfaces an
important state or message tied to its surrounding context — *not* a
toast that floats and disappears.

### Variant guide

- \`info\` — neutral hints, tips, *did you know* messaging.
- \`success\` — confirmation that an action succeeded.
- \`warning\` — soft alert about an upcoming consequence.
- \`danger\` — hard error that blocks completion until resolved.

### When **not** to use

- For transient feedback (*Saved!*) → use a **Toast**.
- For inline form-field errors → use \`<Field error="…">\`.

### Anatomy

\`\`\`
<Alert variant="info">
  <Info />                 ← optional leading icon (lucide / svg)
  <AlertTitle />           ← short headline (1 line)
  <AlertDescription />     ← supporting copy (1–3 lines)
</Alert>
\`\`\`

The Alert sets \`role="alert"\` so screen readers announce the message
when it appears.
        `,
      },
    },
  },
  args: { variant: "info" },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["info", "success", "warning", "danger"],
      table: { defaultValue: { summary: "info" } },
    },
  },
  render: (args) => (
    <Alert {...args} className="w-96">
      <Info />
      <AlertTitle>Heads up</AlertTitle>
      <AlertDescription>
        You can customize your team's colors from Settings.
      </AlertDescription>
    </Alert>
  ),
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Drive every prop from the controls panel. */
export const Playground: Story = {};

export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex w-96 flex-col gap-3">
      <Alert variant="info">
        <Info />
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>You can customize your team's colors from Settings.</AlertDescription>
      </Alert>
      <Alert variant="success">
        <CheckCircle2 />
        <AlertTitle>All set</AlertTitle>
        <AlertDescription>Your profile has been published.</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <AlertTriangle />
        <AlertTitle>Careful</AlertTitle>
        <AlertDescription>Your subscription expires in 3 days.</AlertDescription>
      </Alert>
      <Alert variant="danger">
        <XCircle />
        <AlertTitle>Something went wrong</AlertTitle>
        <AlertDescription>We couldn't save your changes. Try again.</AlertDescription>
      </Alert>
    </div>
  ),
};
