import type { Meta, StoryObj } from "@storybook/react";

import { Link } from "../link";
import * as Glance from "./glance";

const meta = {
  title: "UI/Glance",
  component: Glance.Root,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Glance.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Glance.Root>
      <Glance.Trigger render={<Link href="/" className="font-medium underline" />}>
        @shadcn
      </Glance.Trigger>
      <Glance.Content>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">shadcn</span>
          <span className="text-sm/relaxed text-muted-foreground">
            Beautifully designed components built with Radix UI and Tailwind CSS.
          </span>
        </div>
      </Glance.Content>
    </Glance.Root>
  ),
};

export const Sides: Story = {
  render: () => (
    <div className="flex gap-4">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Glance.Root key={side}>
          <Glance.Trigger render={<Link href="/" className="text-sm font-medium underline" />}>
            {side}
          </Glance.Trigger>
          <Glance.Content side={side}>
            <span className="text-sm">Glance on the {side} side.</span>
          </Glance.Content>
        </Glance.Root>
      ))}
    </div>
  ),
};
