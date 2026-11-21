import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Date as DatePicker } from "./date";

const meta = {
  title: "UI/Date",
  component: DatePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render() {
    const [value, setValue] = useState<Date | null>(null);
    return <DatePicker value={value} onChange={setValue} />;
  },
};

export const WithValue: Story = {
  render: function Render() {
    const [value, setValue] = useState<Date | null>(new Date());
    return <DatePicker value={value} onChange={setValue} />;
  },
};
