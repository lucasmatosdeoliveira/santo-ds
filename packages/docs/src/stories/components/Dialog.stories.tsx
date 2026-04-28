import type { Meta, StoryObj } from "@storybook/react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Field,
  Input,
} from "@santo-ds/ui";

const meta = {
  title: "Components/Overlay/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The **Dialog** is a **focused, blocking modal** that interrupts the user
to confirm an action, edit a focused subset of data, or surface
critical info.

### When to use

- Editing a **discrete** chunk of data (a single profile, a setting).
- Confirming a **destructive** or **irreversible** action.
- Critical errors that require a decision.

### When **not** to use

- For multi-step flows or complex forms — use a **dedicated page** or
  **drawer**.
- For non-blocking helper info — use a \`<Popover>\` or \`<Tooltip>\`.
- For toast-like confirmations — use a **Toast**.

### Anatomy

\`\`\`
<Dialog>
  <DialogTrigger asChild>...</DialogTrigger>     ← any focusable element
  <DialogContent>
    <DialogHeader>
      <DialogTitle />                            ← required (a11y)
      <DialogDescription />                      ← optional, used for aria
    </DialogHeader>
    {/* body */}
    <DialogFooter />
  </DialogContent>
</Dialog>
\`\`\`

Built on \`@radix-ui/react-dialog\` — handles focus trap, scroll lock,
\`Esc\` to close, and ARIA \`dialog\` role automatically.
        `,
      },
    },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A typical "edit profile" modal. */
export const Default: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Update your public information. Changes save instantly.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 py-2">
          <Field label="Name" htmlFor="name">
            <Input id="name" defaultValue="Pelé" />
          </Field>
          <Field label="Handle" htmlFor="handle">
            <Input id="handle" defaultValue="@pele" />
          </Field>
        </div>
        <DialogFooter>
          <Button variant="plain">Cancel</Button>
          <Button>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

/** Destructive confirmation — match copy + button color to severity. */
export const Destructive: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" neutral>
          Delete account
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>Delete your account?</DialogTitle>
          <DialogDescription>
            This permanently removes your data, billing history and team
            access. This action <strong>cannot be undone</strong>.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="plain">Keep account</Button>
          <Button className="bg-danger hover:bg-danger-dark active:bg-danger-darker">
            Delete forever
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
