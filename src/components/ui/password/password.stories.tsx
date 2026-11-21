import type { Meta, StoryObj } from "@storybook/react";

import { Icons } from "@/lib/icons";
import { InputGroup } from "../input";
import * as Password from "./password";

const RULES = [
  { label: "At least 8 characters", rule: (v: string) => v.length >= 8 },
  { label: "Contains a number", rule: (v: string) => /\d/.test(v) },
  { label: "Contains a symbol", rule: (v: string) => /[^a-zA-Z0-9]/.test(v) },
];

const meta = {
  title: "UI/Password",
  component: Password.Root,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Password.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Password.Root className="w-72">
      <InputGroup.Addon>
        <Icons.Lock />
      </InputGroup.Addon>
      <Password.Input placeholder="Password" autoComplete="new-password" />
      <Password.Reveal />
    </Password.Root>
  ),
};

export const WithHover: Story = {
  render: () => (
    <Password.Root className="w-72" ruleset={RULES}>
      <InputGroup.Addon>
        <Icons.Lock />
      </InputGroup.Addon>
      <Password.Input placeholder="Password" autoComplete="new-password" />
      <Password.Hover />
      <Password.Reveal />
    </Password.Root>
  ),
};
