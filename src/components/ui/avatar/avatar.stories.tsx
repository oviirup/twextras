import type { Meta, StoryObj } from "@storybook/react";
import * as Avatar from "./avatar";

const meta = {
  title: "UI/Avatar",
  component: Avatar.Root,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Avatar.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Avatar.Root>
      <Avatar.Fallback>AB</Avatar.Fallback>
    </Avatar.Root>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar.Root size="sm">
        <Avatar.Fallback>SM</Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root>
        <Avatar.Fallback>MD</Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root size="lg">
        <Avatar.Fallback>LG</Avatar.Fallback>
      </Avatar.Root>
    </div>
  ),
};

export const WithBadge: Story = {
  render: () => (
    <Avatar.Root>
      <Avatar.Fallback>JD</Avatar.Fallback>
      <Avatar.Badge />
    </Avatar.Root>
  ),
};
