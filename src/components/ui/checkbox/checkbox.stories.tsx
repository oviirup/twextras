import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";
import { Checkbox } from "./checkbox";

const meta = {
  title: "UI/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    onCheckedChange: fn(),
  },
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <label className="flex items-center gap-2 text-sm">
      <Checkbox {...args} />
      Checkbox
    </label>
  ),
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
  render: (args) => (
    <label className="flex items-center gap-2 text-sm">
      <Checkbox {...args} />
      Checkbox
    </label>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <div className="flex flex-col items-start gap-4 text-sm">
      <label className="flex items-center gap-2 text-sm">
        <Checkbox {...args} />
        Disabled - unchecked
      </label>
      <label className="flex items-center gap-2 text-sm">
        <Checkbox {...args} checked />
        Disabled - checked
      </label>
    </div>
  ),
};
