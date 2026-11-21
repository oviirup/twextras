import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";
import { Upload } from "./upload";

const meta = {
  title: "UI/Upload",
  component: Upload,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Upload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onChange: fn(),
  },
};

export const MultipleImages: Story = {
  args: {
    accept: "image/*",
    multiple: true,
    onChange: fn(),
  },
};
