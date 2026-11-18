import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "./separator";

const meta = {
  title: "UI/Separator",
  component: Separator,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: { control: "select", options: ["horizontal", "vertical"] },
    dashed: { control: "boolean" },
  },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div className="w-64">
      <p className="text-sm">Above</p>
      <Separator className="my-3" />
      <p className="text-sm">Below</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-8 items-center gap-3">
      <span className="text-sm">Left</span>
      <Separator orientation="vertical" />
      <span className="text-sm">Right</span>
    </div>
  ),
};

export const Dashed: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-6">
      <div>
        <p className="text-sm">Horizontal dashed</p>
        <Separator dashed className="my-3" />
        <p className="text-sm">Below</p>
      </div>
      <div className="flex h-8 items-center gap-3">
        <span className="text-sm">Left</span>
        <Separator orientation="vertical" dashed />
        <span className="text-sm">Right</span>
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-6">
      <Separator />
      <Separator dashed />
      <div className="flex h-8 items-center gap-3">
        <span className="text-sm">Left</span>
        <Separator orientation="vertical" />
        <Separator orientation="vertical" dashed />
        <span className="text-sm">Right</span>
      </div>
    </div>
  ),
};
