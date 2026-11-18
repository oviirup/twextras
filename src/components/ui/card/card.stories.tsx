import type { Meta, StoryObj } from "@storybook/react";
import * as Card from "./card";

const meta = {
  title: "UI/Card",
  component: Card.Root,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Card.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card.Root className="w-80">
      <Card.Header>
        <Card.Title>Card title</Card.Title>
        <Card.Description>Card description goes here.</Card.Description>
      </Card.Header>
      <Card.Content>
        <p className="text-muted-foreground">Card content.</p>
      </Card.Content>
      <Card.Footer>
        <span className="text-sm text-muted-foreground">Footer</span>
      </Card.Footer>
    </Card.Root>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Card.Root className="w-80">
      <Card.Header>
        <Card.Title>Notifications</Card.Title>
        <Card.Description>You have 3 unread messages.</Card.Description>
        <Card.Action>
          <span className="rounded-full bg-primary px-2 py-0.5 text-sm text-primary-foreground">
            3
          </span>
        </Card.Action>
      </Card.Header>
      <Card.Content>
        <p className="text-muted-foreground">Latest activity appears here.</p>
      </Card.Content>
    </Card.Root>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-start gap-4">
      <Card.Root size="sm" className="w-64">
        <Card.Header>
          <Card.Title>Small</Card.Title>
        </Card.Header>
        <Card.Content>
          <p className="text-muted-foreground">size=sm</p>
        </Card.Content>
      </Card.Root>
      <Card.Root className="w-64">
        <Card.Header>
          <Card.Title>Default</Card.Title>
        </Card.Header>
        <Card.Content>
          <p className="text-muted-foreground">size=default</p>
        </Card.Content>
      </Card.Root>
    </div>
  ),
};
