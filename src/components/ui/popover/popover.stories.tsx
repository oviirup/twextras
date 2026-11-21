import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../button";
import * as Popover from "./popover";

const meta = {
  title: "UI/Popover",
  component: Popover.Root,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Popover.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Popover.Root>
      <Popover.Trigger render={<Button variant="outline" />}>Open popover</Popover.Trigger>
      <Popover.Content>
        <Popover.Title>Dimensions</Popover.Title>
        <Popover.Description>Set the dimensions for the layer.</Popover.Description>
      </Popover.Content>
    </Popover.Root>
  ),
};

export const Sides: Story = {
  render: () => (
    <div className="flex gap-4">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Popover.Root key={side}>
          <Popover.Trigger render={<Button variant="outline" size="sm" />}>{side}</Popover.Trigger>
          <Popover.Content side={side}>
            <Popover.Title>{side}</Popover.Title>
            <Popover.Description>Popover on the {side} side.</Popover.Description>
          </Popover.Content>
        </Popover.Root>
      ))}
    </div>
  ),
};
