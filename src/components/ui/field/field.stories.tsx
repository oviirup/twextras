import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "../checkbox";
import { Input } from "../input";
import * as Field from "./field";

const meta = {
  title: "UI/Field",
  component: Field.Root,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Field.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Field.Group className="w-80">
      <Field.Root>
        <Field.Label htmlFor="email">Email</Field.Label>
        <Input id="email" type="email" placeholder="you@example.com" />
        <Field.Description>We will never share your email.</Field.Description>
      </Field.Root>
      <Field.Root data-invalid>
        <Field.Label htmlFor="username">Username</Field.Label>
        <Input id="username" aria-invalid placeholder="username" />
        <Field.Error>Username is already taken.</Field.Error>
      </Field.Root>
    </Field.Group>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <Field.Group className="w-96">
      <Field.Root orientation="horizontal">
        <Field.Label htmlFor="api-key">API key</Field.Label>
        <Field.Content>
          <Input id="api-key" placeholder="sk-..." />
          <Field.Description>Your secret API key.</Field.Description>
        </Field.Content>
      </Field.Root>
    </Field.Group>
  ),
};

export const SetAndLegend: Story = {
  render: () => (
    <Field.Set className="w-80">
      <Field.Legend>Notifications</Field.Legend>
      <Field.Group>
        <Field.Root orientation="horizontal">
          <Checkbox id="email" />
          <Field.Label htmlFor="email">Email</Field.Label>
        </Field.Root>
        <Field.Root orientation="horizontal">
          <Checkbox id="push" />
          <Field.Label htmlFor="push">Push</Field.Label>
        </Field.Root>
      </Field.Group>
    </Field.Set>
  ),
};
