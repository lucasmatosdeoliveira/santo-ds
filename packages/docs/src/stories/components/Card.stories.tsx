import type { Meta, StoryObj } from "@storybook/react";
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@santo-ds/ui";

const meta = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
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
