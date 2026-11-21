import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Calendar } from "./calendar";

const meta = {
  title: "UI/Calendar",
  component: Calendar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render() {
    const [selected, setSelected] = useState<Date | null>(null);
    return <Calendar selected={selected} onSelect={setSelected} />;
  },
};

export const WithDisabledDays: Story = {
  render: function Render() {
    const [selected, setSelected] = useState<Date | null>(null);
    const today = new Date();
    const min = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return <Calendar selected={selected} onSelect={setSelected} disabled={(day) => day < min} />;
  },
};
