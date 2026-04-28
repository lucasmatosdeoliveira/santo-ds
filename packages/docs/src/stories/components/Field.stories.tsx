import type { Meta, StoryObj } from "@storybook/react";
import { Field, Input, Textarea } from "@santo-ds/ui";

const meta = {
  title: "Components/Inputs/Field",
  component: Field,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
**Field** is the form-control wrapper that ties together a **Label**,
the input itself, and either **helper text** or an **error message**.

It's the recommended way to render any form input in the system —
ensures consistent vertical spacing, accessible labelling
(\`htmlFor\` ↔ \`id\`), and a single place to display validation feedback.

### Anatomy

\`\`\`
Label (optional, required asterisk)
└── children (Input / Textarea / Select / Combobox / DateField / etc.)
    └── Helper or Error (mutually exclusive)
\`\`\`

If both \`error\` and \`helperText\` are passed, **error wins** — the
helper text is hidden so the validation message is the only one seen.
        `,
      },
    },
  },
  args: {
    label: "Email",
    htmlFor: "email",
    helperText: "We'll never share it.",
    required: false,
  },
  argTypes: {
    label: { control: "text", description: "Field label." },
    htmlFor: {
      control: "text",
      description: "Forwarded to the inner Label `htmlFor` — must match input `id`.",
    },
    helperText: {
      control: "text",
      description: "Subtle hint shown below the input. Hidden when `error` is set.",
    },
    error: {
      control: "text",
      description: "Validation message. When set, replaces helper text and tints red.",
    },
    required: {
      control: "boolean",
      description: "Renders a red asterisk next to the label.",
    },
    children: { control: false, table: { disable: true } },
  },
  render: (args) => (
    <div className="w-80">
      <Field {...args}>
        <Input id={args.htmlFor as string} placeholder="you@domain.com" />
      </Field>
    </div>
  ),
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Drive every prop from the controls panel. */
export const Playground: Story = {};

export const Required: Story = {
  args: { required: true, label: "Username", htmlFor: "user", helperText: "3–20 characters." },
};

export const WithError: Story = {
  args: { label: "Username", htmlFor: "user", error: "This username is taken." },
  render: (args) => (
    <div className="w-80">
      <Field {...args}>
        <Input id={args.htmlFor as string} defaultValue="santos" invalid />
      </Field>
    </div>
  ),
};

/** Field works with any inner control. */
export const WithTextarea: Story = {
  args: { label: "Bio", htmlFor: "bio", helperText: "Up to 200 characters." },
  render: (args) => (
    <div className="w-80">
      <Field {...args}>
        <Textarea id={args.htmlFor as string} placeholder="Tell us about yourself…" />
      </Field>
    </div>
  ),
};
