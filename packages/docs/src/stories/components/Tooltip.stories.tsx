import type { Meta, StoryObj } from "@storybook/react";
import { Info } from "lucide-react";
import {
  Button,
  IconButton,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@santo-ds/ui";

const meta = {
  title: "Components/Overlay/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  decorators: [(Story) => <TooltipProvider><Story /></TooltipProvider>],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The **Tooltip** shows **read-only** info on **hover or keyboard focus**.
Use it to label icon-only controls or to expand a brief acronym
without drawing the eye when the user isn't asking.

### When to use

- Labelling \`<IconButton>\` actions in a toolbar.
- Explaining a brief inline term or status indicator.

### When **not** to use

- Anything **interactive** (links, form controls) → tooltips disappear
  on mouse-out, so users can't reach them.
- Critical info → tooltip content is invisible by default and on touch
  devices it requires a press-hold gesture.

### Best practices

- Wrap the entire app once with \`<TooltipProvider>\`.
- Keep content **under one short sentence** (think labels, not docs).
- Pair with \`asChild\` so the trigger can be any \`<Button>\` /
  \`<IconButton>\`.
        `,
      },
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>This is a tooltip</TooltipContent>
    </Tooltip>
  ),
};

/** Common pattern: label an IconButton. */
export const OnIconButton: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <IconButton aria-label="More info" variant="plain">
            <Info />
          </IconButton>
        </TooltipTrigger>
        <TooltipContent>What does this metric mean?</TooltipContent>
      </Tooltip>
      <span className="text-sm text-foreground-soft">Conversion rate</span>
    </div>
  ),
};
