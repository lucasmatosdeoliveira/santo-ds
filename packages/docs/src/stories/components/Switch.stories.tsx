import type { Meta, StoryObj } from "@storybook/react";
import { Label, Switch } from "@santo-ds/ui";

const meta = {
  title: "Components/Inputs/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The **Switch** is for binary settings that take effect **immediately** —
no save button, no commit step.

### Switch vs Checkbox

| | Switch | Checkbox |
|---|---|---|
| Commit | Immediate | Usually wait for *Save* |
| Wording | *On / Off* | *Yes / No* |
| Group | Standalone | Often a list |
| Example | *Email notifications* in settings | *Accept terms* in a sign-up form |

Built on \`@radix-ui/react-switch\` — supports controlled
(\`checked\` / \`onCheckedChange\`) and uncontrolled (\`defaultChecked\`)
modes.

> Always pair with a \`<Label htmlFor>\` so screen readers announce what the switch controls.
        `,
      },
    },
  },
  args: { disabled: false, defaultChecked: false },
  argTypes: {
    defaultChecked: { control: "boolean" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    checked: { control: false, table: { disable: true } },
  },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Switch id="notif" {...args} />
      <Label htmlFor="notif">Email notifications</Label>
    </div>
  ),
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Drive every prop from the controls panel. */
export const Playground: Story = {};

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Switch id="a" />
        <Label htmlFor="a">Off</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="b" defaultChecked />
        <Label htmlFor="b">On</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="c" disabled />
        <Label htmlFor="c">Disabled</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="d" disabled defaultChecked />
        <Label htmlFor="d">Disabled on</Label>
      </div>
    </div>
  ),
};

/** Typical settings row with subtitle. */
export const SettingsRow: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex w-96 items-start justify-between rounded-md border border-border-soft bg-background p-4">
      <div className="flex flex-col gap-1">
        <Label htmlFor="2fa" className="text-sm font-medium text-foreground">
          Two-factor authentication
        </Label>
        <span className="text-xs text-foreground-soft">
          Adds a second step every time you sign in.
        </span>
      </div>
      <Switch id="2fa" defaultChecked />
    </div>
  ),
};
