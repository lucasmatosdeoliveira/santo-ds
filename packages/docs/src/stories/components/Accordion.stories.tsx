import type { Meta, StoryObj } from "@storybook/react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@santo-ds/ui";

const meta = {
  title: "Components/Accordion",
  component: Accordion,
  tags: ["autodocs"],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-96">
      <AccordionItem value="a">
        <AccordionTrigger>What is SantoDS?</AccordionTrigger>
        <AccordionContent>A design system powered by Figma tokens and React components.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>Is it themable?</AccordionTrigger>
        <AccordionContent>Yes — light and dark themes ship out of the box via CSS variables.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="c">
        <AccordionTrigger>How do I contribute?</AccordionTrigger>
        <AccordionContent>Open a PR on GitHub or reach out to the core team.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
