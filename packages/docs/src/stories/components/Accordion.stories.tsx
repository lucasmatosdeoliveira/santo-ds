import type { Meta, StoryObj } from "@storybook/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@santo-ds/ui";

const meta = {
  title: "Components/Navigation/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The **Accordion** is a **vertical stack of disclosure panels** — the
user expands the ones they care about, rest stay collapsed.

### When to use

- FAQs and help sections.
- Long settings lists where most users only touch one or two panes.
- Long forms broken into optional sections.

### When **not** to use

- Comparable views of the same entity → use \`<Tabs>\`.
- A single binary disclosure ("Show more / less") — use a plain
  \`<Button>\` with \`aria-expanded\`.

### Modes

- \`type="single" collapsible\` — only one panel open at a time, can
  collapse all (good for FAQs).
- \`type="multiple"\` — any number of panels open simultaneously
  (good for settings).

Built on \`@radix-ui/react-accordion\` — keyboard navigable
(↑↓ between triggers, Enter / Space toggles), proper
\`aria-expanded\` and \`region\` semantics.
        `,
      },
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

/** FAQ pattern — single open at a time, collapsible. */
export const Default: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Accordion type="single" collapsible className="w-96">
      <AccordionItem value="a">
        <AccordionTrigger>What is SantoDS?</AccordionTrigger>
        <AccordionContent>
          A design system powered by Figma tokens and React components.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>Is it themable?</AccordionTrigger>
        <AccordionContent>
          Yes — light and dark themes ship out of the box via CSS variables.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="c">
        <AccordionTrigger>How do I contribute?</AccordionTrigger>
        <AccordionContent>
          Open a PR on GitHub or reach out to the core team.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

/** Multiple panels can stay open — settings-style. */
export const Multiple: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Accordion type="multiple" defaultValue={["a"]} className="w-96">
      <AccordionItem value="a">
        <AccordionTrigger>Notifications</AccordionTrigger>
        <AccordionContent>
          Email, push and in-app channels for every event type.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>Privacy</AccordionTrigger>
        <AccordionContent>
          Visibility, indexing and data-sharing controls.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="c">
        <AccordionTrigger>Integrations</AccordionTrigger>
        <AccordionContent>
          Connected services — Slack, GitHub, Linear, Figma.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
