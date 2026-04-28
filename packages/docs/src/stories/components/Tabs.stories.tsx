import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@santo-ds/ui";

const meta = {
  title: "Components/Navigation/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The **Tabs** component lets the user switch between **mutually-exclusive
views** of related content — without a full page reload.

### When to use

- Comparable views of the **same entity** (Overview · Stats · History
  for a single team).
- Switching between settings sections inside a single page.

### When **not** to use

- The content is **independent** and the user might want both side-by-side.
- More than ~5 tabs → consider a sidebar or hierarchical navigation.

Built on \`@radix-ui/react-tabs\` — keyboard navigable
(←→ between triggers, Enter / Space activates), \`role="tablist"\` /
\`role="tab"\` / \`role="tabpanel"\` set automatically.
        `,
      },
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Tabs defaultValue="overview" className="w-96">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="stats">Stats</TabsTrigger>
        <TabsTrigger value="history">History</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="p-4 text-sm text-foreground-soft">
        Team summary, upcoming fixtures and news.
      </TabsContent>
      <TabsContent value="stats" className="p-4 text-sm text-foreground-soft">
        Possession, shots, passes and xG breakdown.
      </TabsContent>
      <TabsContent value="history" className="p-4 text-sm text-foreground-soft">
        Trophies, rivalries and milestones.
      </TabsContent>
    </Tabs>
  ),
};

/** Many tabs — consider when the count grows. */
export const Many: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Tabs defaultValue="general" className="w-[32rem]">
      <TabsList>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
        <TabsTrigger value="team">Team</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>
      <TabsContent value="general" className="p-4 text-sm text-foreground-soft">
        Workspace-wide preferences (locale, theme, default view).
      </TabsContent>
      <TabsContent value="account" className="p-4 text-sm text-foreground-soft">
        Personal account profile and connected identities.
      </TabsContent>
      <TabsContent value="billing" className="p-4 text-sm text-foreground-soft">
        Plans, invoices and payment methods.
      </TabsContent>
      <TabsContent value="team" className="p-4 text-sm text-foreground-soft">
        Members, roles and invitations.
      </TabsContent>
      <TabsContent value="security" className="p-4 text-sm text-foreground-soft">
        Two-factor, sessions and audit log.
      </TabsContent>
    </Tabs>
  ),
};
