import type { Meta, StoryObj } from "@storybook/react";
import { SocialButton } from "@santo-ds/ui";

const Google = () => (
  <svg viewBox="0 0 24 24" aria-hidden fill="currentColor">
    <path d="M21.35 11.1H12v3.8h5.35c-.5 2.36-2.55 3.6-5.35 3.6-3.23 0-5.85-2.62-5.85-5.85s2.62-5.85 5.85-5.85c1.47 0 2.79.52 3.83 1.54l2.72-2.72C16.98 3.78 14.65 2.8 12 2.8c-5.1 0-9.2 4.1-9.2 9.2s4.1 9.2 9.2 9.2c5.32 0 8.82-3.74 8.82-8.99 0-.56-.06-1.06-.12-1.51Z" />
  </svg>
);

const GitHub = () => (
  <svg viewBox="0 0 24 24" aria-hidden fill="currentColor">
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.08.64-1.33-2.22-.25-4.55-1.11-4.55-4.95 0-1.1.39-2 1.03-2.7-.1-.25-.45-1.28.1-2.67 0 0 .84-.27 2.75 1.03A9.5 9.5 0 0 1 12 6.8c.85 0 1.7.11 2.5.33 1.9-1.3 2.75-1.03 2.75-1.03.55 1.39.2 2.42.1 2.67.64.7 1.03 1.6 1.03 2.7 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.86v2.76c0 .27.18.59.69.48A10 10 0 0 0 12 2Z" />
  </svg>
);

const Apple = () => (
  <svg viewBox="0 0 24 24" aria-hidden fill="currentColor">
    <path d="M16.36 1.43c0 1.14-.42 2.21-1.1 2.97-.74.83-1.94 1.46-3 1.37-.13-1.14.46-2.31 1.1-3.02.73-.81 1.99-1.42 3-1.32Zm3.51 16.32c-.6 1.35-.89 1.95-1.65 3.14-1.07 1.65-2.58 3.71-4.45 3.73-1.66.02-2.09-1.05-4.34-1.04-2.25.01-2.72 1.06-4.39 1.04C3.18 24.6 1.74 22.7.67 21.05c-2.96-4.5-3.27-9.81-1.45-12.62 1.3-2.01 3.36-3.18 5.29-3.18 1.97 0 3.21 1.06 4.84 1.06 1.59 0 2.55-1.06 4.83-1.06 1.73 0 3.55.92 4.85 2.51-4.27 2.31-3.57 8.34.84 9.99Z" />
  </svg>
);

const meta = {
  title: "Components/Actions/SocialButton",
  component: SocialButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The **SocialButton** is a pre-styled OAuth provider button — a neutral
outlined surface with a leading provider icon and a *Continue with X*
label.

### When to use

- Sign-in / sign-up screens with third-party auth.
- Connect-account flows in settings.

Pass any \`<svg>\` (or icon component) as \`icon\`. Set \`provider\` to get a
*Continue with {provider}* label automatically, or override with
\`children\`.
        `,
      },
    },
  },
  args: { provider: "Google" },
  argTypes: {
    provider: {
      control: "text",
      description: "Provider name. Renders as `Continue with {provider}`.",
    },
    children: {
      control: "text",
      description: "Override the auto-generated label.",
    },
    disabled: { control: "boolean" },
    icon: { control: false, table: { disable: true } },
  },
  render: (args) => (
    <div className="w-80">
      <SocialButton {...args} icon={<Google />} />
    </div>
  ),
} satisfies Meta<typeof SocialButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Drive every prop from the controls panel. */
export const Playground: Story = {};

/** Stack multiple providers in a sign-in flow. */
export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex w-80 flex-col gap-3">
      <SocialButton icon={<Google />} provider="Google" />
      <SocialButton icon={<GitHub />} provider="GitHub" />
      <SocialButton icon={<Apple />} provider="Apple" />
    </div>
  ),
};
