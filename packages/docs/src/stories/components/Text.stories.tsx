import type { Meta, StoryObj } from "@storybook/react";
import { Text, type TextVariant } from "@santo-ds/ui";

const meta = {
  title: "Components/Text",
  component: Text,
  tags: ["autodocs"],
  args: { children: "The quick brown fox jumps over the lazy dog" },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "headline-lg",
        "headline-md",
        "headline-sm",
        "title-xl",
        "title-lg",
        "title-md",
        "title-sm",
        "title-xs",
        "title-xxs",
        "paragraph-lg",
        "paragraph-md",
        "paragraph-sm",
        "paragraph-xs",
        "label-lg",
        "label-md",
        "label-sm",
        "label-xs",
        "overline-md",
        "overline-sm",
        "reading-only-md",
      ] satisfies TextVariant[],
    },
    as: { control: false },
    asChild: { control: false },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ParagraphMd: Story = { args: { variant: "paragraph-md" } };
export const HeadlineLg: Story = { args: { variant: "headline-lg" } };
export const TitleLg: Story = { args: { variant: "title-lg" } };
export const LabelMd: Story = { args: { variant: "label-md" } };
export const OverlineMd: Story = { args: { variant: "overline-md", children: "Section label" } };

export const FullScale: Story = {
  args: {},
  render: () => {
    const variants: TextVariant[] = [
      "headline-lg",
      "headline-md",
      "headline-sm",
      "title-xl",
      "title-lg",
      "title-md",
      "title-sm",
      "title-xs",
      "paragraph-lg",
      "paragraph-md",
      "paragraph-sm",
      "paragraph-xs",
      "label-lg",
      "label-md",
      "label-sm",
      "label-xs",
      "overline-md",
      "reading-only-md",
    ];
    return (
      <div className="flex flex-col gap-6">
        {variants.map((v) => (
          <div key={v} className="flex flex-col gap-1">
            <span className="font-mono text-xs text-foreground-soft">{v}</span>
            <Text variant={v}>The quick brown fox jumps over the lazy dog</Text>
          </div>
        ))}
      </div>
    );
  },
};
