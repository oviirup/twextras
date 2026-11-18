import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../button";
import * as Tooltip from "./tooltip";

const meta = {
  title: "UI/Tooltip",
  component: Tooltip.Root,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Tooltip.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger render={<Button variant="outline" />}>Hover me</Tooltip.Trigger>
        <Tooltip.Content>Add to library</Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  ),
};

export const Sides: Story = {
  render: () => (
    <Tooltip.Provider>
      <div className="flex gap-4">
        {(["top", "right", "bottom", "left"] as const).map((side) => (
          <Tooltip.Root key={side}>
            <Tooltip.Trigger render={<Button variant="outline" size="sm" />}>
              {side}
            </Tooltip.Trigger>
            <Tooltip.Content side={side}>{side} tooltip</Tooltip.Content>
          </Tooltip.Root>
        ))}
      </div>
    </Tooltip.Provider>
  ),
};
