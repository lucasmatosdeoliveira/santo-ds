import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Check, X } from "lucide-react";
import { Chip } from "@santo-ds/ui";

const meta = {
  title: "Components/Actions/Chip",
  component: Chip,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The **Chip** is a compact, pill-shaped action — the workhorse of filter
bars, tag pickers and active-criteria displays.

### When to use

- **Filter selection** — let users pick one or many criteria to narrow a
  list (use the \`active\` variant for selected state).
- **Tag input** — display existing tags with optional dismiss icons.
- **Categorisation** — present tappable category facets above a feed.

### When **not** to use

- For status / read-only labels → use \`<Badge>\`.
- For destructive or primary actions → use \`<Button>\`.

Chips are buttons by default (\`type="button"\`), so they participate in
keyboard navigation.
        `,
      },
    },
  },
  args: { children: "Filter", variant: "neutral" },
  argTypes: {
    children: { control: "text", description: "Chip label." },
    variant: {
      control: "inline-radio",
      options: ["neutral", "active"],
      description:
        "`neutral` = unselected default · `active` = selected / applied.",
      table: { defaultValue: { summary: "neutral" } },
    },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Drive every prop from the controls panel. */
export const Playground: Story = {};

export const Neutral: Story = { args: { variant: "neutral" } };
export const Active: Story = { args: { variant: "active" } };

/** Multi-select filter — clicking a chip toggles it. */
export const Toggleable: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const options = ["Men's", "Women's", "Kids", "Retro"];
    const [selected, setSelected] = useState<Set<string>>(new Set(["Men's"]));
    const toggle = (o: string) => {
      const next = new Set(selected);
      next.has(o) ? next.delete(o) : next.add(o);
      setSelected(next);
    };
    return (
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <Chip
            key={o}
            variant={selected.has(o) ? "active" : "neutral"}
            onClick={() => toggle(o)}
          >
            {selected.has(o) && <Check />}
            {o}
          </Chip>
        ))}
      </div>
    );
  },
};

/** Dismissible tags — pair the chip with a trailing close icon. */
export const Dismissible: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const [tags, setTags] = useState(["React", "TypeScript", "Tailwind"]);
    return (
      <div className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <Chip
            key={t}
            variant="active"
            onClick={() => setTags((prev) => prev.filter((p) => p !== t))}
          >
            {t} <X aria-hidden />
          </Chip>
        ))}
      </div>
    );
  },
};
