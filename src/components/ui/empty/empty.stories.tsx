import type { Meta, StoryObj } from "@storybook/react";
import { Icons } from "@/lib/icons";
import * as Empty from "./empty";

const meta = {
  title: "UI/Empty",
  component: Empty.Root,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Empty.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Empty.Root className="w-80">
      <Empty.Header>
        <Empty.Title>No results found</Empty.Title>
        <Empty.Description>Try adjusting your search or filters.</Empty.Description>
      </Empty.Header>
    </Empty.Root>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Empty.Root className="w-80">
      <Empty.Header>
        <Empty.Media variant="icon">
          <Icons.Search />
        </Empty.Media>
        <Empty.Title>No results found</Empty.Title>
        <Empty.Description>Try a different keyword.</Empty.Description>
      </Empty.Header>
      <Empty.Content>
        <span>Clear filters to see everything.</span>
      </Empty.Content>
    </Empty.Root>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex items-start gap-4">
      <Empty.Root className="w-64">
        <Empty.Header>
          <Empty.Title>Default media</Empty.Title>
          <Empty.Description>No icon variant.</Empty.Description>
        </Empty.Header>
      </Empty.Root>
      <Empty.Root className="w-64">
        <Empty.Header>
          <Empty.Media variant="icon">
            <Icons.Alert />
          </Empty.Media>
          <Empty.Title>Icon media</Empty.Title>
          <Empty.Description>variant=&quot;icon&quot;</Empty.Description>
        </Empty.Header>
      </Empty.Root>
    </div>
  ),
};
