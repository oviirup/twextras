import type { Meta, StoryObj } from "@storybook/react";

import { fn } from "storybook/test";

import { Textarea } from "./textarea";

const meta = {
  title: "UI/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    onChange: fn(),
    placeholder: "Write something…",
    className: "w-72",
  },
  argTypes: {
    disabled: { control: "boolean" },
    rows: { control: "number" },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
  args: {
    defaultValue: "The quick brown fox jumps over the lazy dog.",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: "Cannot edit",
  },
};
