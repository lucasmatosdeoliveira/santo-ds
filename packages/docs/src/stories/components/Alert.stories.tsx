import type { Meta, StoryObj } from "@storybook/react";
import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@santo-ds/ui";

const meta = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Gallery: Story = {
  render: () => (
    <div className="flex w-96 flex-col gap-3">
      <Alert variant="info">
        <Info />
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>You can customize your team's colors from Settings.</AlertDescription>
      </Alert>
      <Alert variant="success">
        <CheckCircle2 />
        <AlertTitle>All set</AlertTitle>
        <AlertDescription>Your profile has been published.</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <AlertTriangle />
        <AlertTitle>Careful</AlertTitle>
        <AlertDescription>Your subscription expires in 3 days.</AlertDescription>
      </Alert>
      <Alert variant="danger">
        <XCircle />
        <AlertTitle>Something went wrong</AlertTitle>
        <AlertDescription>We couldn't save your changes. Try again.</AlertDescription>
      </Alert>
    </div>
  ),
};
