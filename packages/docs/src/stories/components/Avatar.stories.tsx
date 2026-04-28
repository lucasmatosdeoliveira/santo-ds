import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, AvatarFallback, AvatarImage } from "@santo-ds/ui";

const meta = {
  title: "Components/Display/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The **Avatar** represents a **user, team or entity** in a circular
frame — typical placement is next to a name in a list, header or
comment.

### Anatomy

\`\`\`
<Avatar>           ← circular wrapper
  <AvatarImage />  ← actual image (loads in the background)
  <AvatarFallback> ← shown while loading or on error (initials, icon, …)
\`\`\`

### Why the fallback matters

Always include \`<AvatarFallback>\`. Radix renders it during image load
and *also* if the image 404s — without it, broken images stay broken.

> The image and fallback are mutually exclusive: Radix swaps them
> automatically based on load state, so you never see both at once.
        `,
      },
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithImage: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Avatar>
      <AvatarImage src="https://i.pravatar.cc/80?img=12" alt="@pele" />
      <AvatarFallback>PE</AvatarFallback>
    </Avatar>
  ),
};

export const Fallback: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Avatar>
      <AvatarFallback>SD</AvatarFallback>
    </Avatar>
  ),
};

/** Multiple sizes via Tailwind size utilities — Avatar accepts `className`. */
export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-end gap-3">
      <Avatar className="size-6"><AvatarFallback className="text-[10px]">XS</AvatarFallback></Avatar>
      <Avatar className="size-8"><AvatarFallback className="text-xs">SM</AvatarFallback></Avatar>
      <Avatar className="size-10"><AvatarFallback>MD</AvatarFallback></Avatar>
      <Avatar className="size-14"><AvatarFallback>LG</AvatarFallback></Avatar>
      <Avatar className="size-20"><AvatarFallback className="text-lg">XL</AvatarFallback></Avatar>
    </div>
  ),
};

/** Stacked avatars — overlap with negative margin and a border to clip. */
export const Stack: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex -space-x-2">
      <Avatar className="ring-2 ring-background">
        <AvatarImage src="https://i.pravatar.cc/80?img=12" alt="@pele" />
        <AvatarFallback>PE</AvatarFallback>
      </Avatar>
      <Avatar className="ring-2 ring-background">
        <AvatarImage src="https://i.pravatar.cc/80?img=15" alt="@neymar" />
        <AvatarFallback>NJ</AvatarFallback>
      </Avatar>
      <Avatar className="ring-2 ring-background">
        <AvatarImage src="https://i.pravatar.cc/80?img=20" alt="@robinho" />
        <AvatarFallback>RB</AvatarFallback>
      </Avatar>
      <Avatar className="ring-2 ring-background">
        <AvatarFallback>+9</AvatarFallback>
      </Avatar>
    </div>
  ),
};
