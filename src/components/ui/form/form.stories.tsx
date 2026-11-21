import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "../checkbox";
import { Input } from "../input";
import * as Form from "./form";

const meta = {
  title: "UI/Form",
  component: Form.Field,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Form.Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Form.Group className="w-80">
      <Form.Field>
        <Form.Label htmlFor="email">Email</Form.Label>
        <Input id="email" type="email" placeholder="you@example.com" />
        <Form.Description>We will never share your email.</Form.Description>
      </Form.Field>
      <Form.Field data-invalid>
        <Form.Label htmlFor="username">Username</Form.Label>
        <Input id="username" aria-invalid placeholder="username" />
        <Form.Error>Username is already taken.</Form.Error>
      </Form.Field>
    </Form.Group>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <Form.Group className="w-96">
      <Form.Field orientation="horizontal">
        <Form.Label htmlFor="api-key">API key</Form.Label>
        <Form.Content>
          <Input id="api-key" placeholder="sk-..." />
          <Form.Description>Your secret API key.</Form.Description>
        </Form.Content>
      </Form.Field>
    </Form.Group>
  ),
};

export const SetAndLegend: Story = {
  render: () => (
    <Form.Set className="w-80">
      <Form.Legend>Notifications</Form.Legend>
      <Form.Group>
        <Form.Field orientation="horizontal">
          <Checkbox id="email" />
          <Form.Label htmlFor="email">Email</Form.Label>
        </Form.Field>
        <Form.Field orientation="horizontal">
          <Checkbox id="push" />
          <Form.Label htmlFor="push">Push</Form.Label>
        </Form.Field>
      </Form.Group>
    </Form.Set>
  ),
};
