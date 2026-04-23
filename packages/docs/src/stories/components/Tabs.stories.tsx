import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@santo-ds/ui";

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
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
