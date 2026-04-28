import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "@santo-ds/ui";

const meta = {
  title: "Components/Display/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The **Skeleton** is a **placeholder** for content that's still loading.
It mimics the rough shape of the upcoming UI so the page feels stable
during data fetching — no layout shift, no spinning beach-ball.

### When to use

- Initial page load with predictable shape (cards, lists, profile pages).
- Subsequent data refreshes that take more than ~200 ms.

### When **not** to use

- Quick (< 200 ms) updates — show stale data instead of flicker.
- Indeterminate progress without known shape → use \`<Progress>\` or a
  spinner.

Skeletons are pure visual — pass any Tailwind sizing utility via
\`className\`. The pulse animation comes from
\`tailwindcss-animate\` and respects \`prefers-reduced-motion\`.
        `,
      },
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A typical row in a table or list. */
export const Row: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex w-80 items-center gap-4">
      <Skeleton className="size-12 rounded-full" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  ),
};

/** An entire card layout. */
export const Card: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex w-80 flex-col gap-3 rounded-md border border-border-soft p-4">
      <Skeleton className="h-32 w-full rounded-md" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-8 w-20 rounded-md" />
        <Skeleton className="h-8 w-20 rounded-md" />
      </div>
    </div>
  ),
};

/** Stack of list rows. */
export const List: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex w-96 flex-col gap-3">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton className="size-10 rounded-full" />
          <div className="flex flex-1 flex-col gap-1.5">
            <Skeleton className="h-3.5 w-2/3" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  ),
};
