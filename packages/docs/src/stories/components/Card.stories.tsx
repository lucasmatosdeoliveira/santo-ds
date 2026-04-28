import type { Meta, StoryObj } from "@storybook/react";
import { ArrowRight } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@santo-ds/ui";

const meta = {
  title: "Components/Display/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The **Card** is a **container** that groups related information into a
visually-distinct surface — typical home for stats, summaries,
items in a feed, settings panels.

### Anatomy

\`\`\`
<Card>
  <CardHeader>
    <CardTitle />
    <CardDescription />
  </CardHeader>
  <CardContent />
  <CardFooter />
</Card>
\`\`\`

Each subcomponent applies its own padding (\`p-6\`) so a Card with just
\`<CardContent>\` still looks consistent. Composition is intentionally
loose — drop in any element you need.

### Token alignment

- \`rounded-16\` — surface radius.
- \`border-border-soft\` — quiet 1px frame.
- \`bg-background\` — adapts to the active theme.
- \`shadow-sm\` — subtle elevation.
        `,
      },
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Santos FC</CardTitle>
        <CardDescription>Official subscription renewal.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-foreground-soft">
          Your annual plan renews in 12 days. Manage billing or update your card any time.
        </p>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="plain">Cancel</Button>
        <Button>Renew</Button>
      </CardFooter>
    </Card>
  ),
};

/** Profile card — Avatar in the header, Badge for status. */
export const ProfileCard: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Card className="w-80">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="size-12">
          <AvatarImage src="https://i.pravatar.cc/80?img=12" alt="@pele" />
          <AvatarFallback>PE</AvatarFallback>
        </Avatar>
        <div className="flex flex-1 flex-col gap-1">
          <CardTitle className="text-base">Pelé</CardTitle>
          <CardDescription>O Rei do Futebol</CardDescription>
        </div>
        <Badge variant="success">Active</Badge>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="text-lg font-semibold">1281</div>
            <div className="text-xs text-foreground-soft">Goals</div>
          </div>
          <div>
            <div className="text-lg font-semibold">3</div>
            <div className="text-xs text-foreground-soft">World Cups</div>
          </div>
          <div>
            <div className="text-lg font-semibold">21</div>
            <div className="text-xs text-foreground-soft">Years</div>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
};

/** Header-only variant for tile-style stats. */
export const Stat: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Card className="w-64">
      <CardHeader>
        <CardDescription>Monthly active users</CardDescription>
        <CardTitle className="text-3xl">12 480</CardTitle>
        <span className="text-xs text-success-dark">↑ 8.2% vs last month</span>
      </CardHeader>
    </Card>
  ),
};

/** Linked card — wrap CardContent in an anchor or use `as` on a Link. */
export const Interactive: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Card className="w-80 cursor-pointer transition-shadow hover:shadow-md">
      <CardHeader>
        <CardTitle>Read the launch notes</CardTitle>
        <CardDescription>What's new in SantoDS this month.</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button variant="plain" trailingIcon={<ArrowRight />}>
          Read article
        </Button>
      </CardFooter>
    </Card>
  ),
};
