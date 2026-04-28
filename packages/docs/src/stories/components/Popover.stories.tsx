import type { Meta, StoryObj } from "@storybook/react";
import { Settings2 } from "lucide-react";
import {
  Button,
  IconButton,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@santo-ds/ui";

const meta = {
  title: "Components/Overlay/Popover",
  component: Popover,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The **Popover** is a **non-modal floating panel** anchored to a trigger.
The page **stays interactive** behind it — it doesn't take focus by
force, and doesn't lock scroll.

### When to use

- Quick settings (filters, layout options, color picker).
- Contextual info that's slightly more than a tooltip but less than a
  modal.
- Compact forms tied to a specific control.

### When **not** to use

- For info-only hover hints → use \`<Tooltip>\`.
- For focused, blocking interactions → use \`<Dialog>\`.

Built on \`@radix-ui/react-popover\` — handles outside-click dismissal,
keyboard (\`Esc\`), positioning and focus management automatically.
        `,
      },
    },
  },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Dimensions</Button>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <h4 className="text-sm font-semibold">Dimensions</h4>
            <p className="text-xs text-foreground-soft">Set the layout size.</p>
          </div>
          <div className="flex items-center gap-3">
            <Label htmlFor="w" className="w-16 text-sm">Width</Label>
            <Input id="w" defaultValue="320px" className="h-8" />
          </div>
          <div className="flex items-center gap-3">
            <Label htmlFor="h" className="w-16 text-sm">Height</Label>
            <Input id="h" defaultValue="240px" className="h-8" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

/** Anchored to an IconButton — typical toolbar pattern. */
export const FromIconButton: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <IconButton aria-label="View options" variant="plain">
          <Settings2 />
        </IconButton>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-56">
        <div className="flex flex-col gap-2 text-sm">
          <span className="font-medium">View</span>
          <label className="flex items-center justify-between text-foreground-soft">
            Compact rows <input type="checkbox" defaultChecked />
          </label>
          <label className="flex items-center justify-between text-foreground-soft">
            Show avatars <input type="checkbox" />
          </label>
          <label className="flex items-center justify-between text-foreground-soft">
            Auto-refresh <input type="checkbox" />
          </label>
        </div>
      </PopoverContent>
    </Popover>
  ),
};
