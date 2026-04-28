import type { Meta, StoryObj } from "@storybook/react";
import { ChevronDown, LogOut, Settings, User, Users } from "lucide-react";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@santo-ds/ui";

const meta = {
  title: "Components/Overlay/DropdownMenu",
  component: DropdownMenu,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The **DropdownMenu** is a list of **commands** anchored to a button —
profile menus, *More actions*, table-row context menus.

### When to use

- 3 + actions that don't all need to be visible at once.
- Settings menus (account, preferences, sign-out).
- *More* / *…* menus on items in a list or table.

### When **not** to use

- Picking a value from a list → use \`<Select>\` (with semantics) or
  \`<Combobox>\`.
- Filter / settings panels → use \`<Popover>\`.
- A single action → just use a \`<Button>\`.

### Anatomy

Drawing a typical menu:

\`\`\`
<DropdownMenu>
  <DropdownMenuTrigger asChild>...</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel />        ← non-clickable header
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
      <DropdownMenuItem />       ← keyboard-navigable command
    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>
\`\`\`

Built on \`@radix-ui/react-dropdown-menu\` — full keyboard support
(↑↓ navigate, Enter activate, Esc close, type-ahead).
        `,
      },
    },
  },
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" trailingIcon={<ChevronDown />}>
          Account
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Profile <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          Billing <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          Settings <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

/** Items grouped + with leading icons for scannability. */
export const WithIcons: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" trailingIcon={<ChevronDown />}>
          Workspace
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>santodos</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User aria-hidden /> Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Users aria-hidden /> Team
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings aria-hidden /> Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-danger-dark">
          <LogOut aria-hidden /> Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};
