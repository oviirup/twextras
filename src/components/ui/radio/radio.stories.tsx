import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "../label";
import * as Radio from "./radio";

const meta = {
  title: "UI/Radio",
  component: Radio.Root,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Radio.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Radio.Root defaultValue="option-one" className="w-64">
      <div className="flex items-center gap-2">
        <Radio.Item value="option-one" id="r1" />
        <Label htmlFor="r1">Option One</Label>
      </div>
      <div className="flex items-center gap-2">
        <Radio.Item value="option-two" id="r2" />
        <Label htmlFor="r2">Option Two</Label>
      </div>
      <div className="flex items-center gap-2">
        <Radio.Item value="option-three" id="r3" />
        <Label htmlFor="r3">Option Three</Label>
      </div>
    </Radio.Root>
  ),
};
