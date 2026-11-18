import type { Meta, StoryObj } from "@storybook/react";
import { Icons } from "@/lib/icons";
import { Button } from "../button";
import * as Dropdown from "./dropdown";

const meta = {
  title: "UI/Dropdown",
  component: Dropdown.Root,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Dropdown.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Dropdown.Root>
      <Dropdown.Trigger render={<Button variant="outline" />}>Open menu</Dropdown.Trigger>
      <Dropdown.Content>
        <Dropdown.Item>
          <Icons.Check />
          Profile
        </Dropdown.Item>
        <Dropdown.Item>
          <Icons.Settings />
          Settings
        </Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Item variant="destructive">Delete</Dropdown.Item>
      </Dropdown.Content>
    </Dropdown.Root>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <Dropdown.Root>
      <Dropdown.Trigger render={<Button variant="outline" />}>Actions</Dropdown.Trigger>
      <Dropdown.Content>
        <Dropdown.Group>
          <Dropdown.Label>Account</Dropdown.Label>
          <Dropdown.Item>Profile</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
        </Dropdown.Group>
        <Dropdown.Separator />
        <Dropdown.Group>
          <Dropdown.Label>More</Dropdown.Label>
          <Dropdown.Item>Duplicate</Dropdown.Item>
          <Dropdown.Item>Archive</Dropdown.Item>
        </Dropdown.Group>
      </Dropdown.Content>
    </Dropdown.Root>
  ),
};

export const CheckboxAndRadio: Story = {
  render: () => (
    <Dropdown.Root>
      <Dropdown.Trigger render={<Button variant="outline" />}>View options</Dropdown.Trigger>
      <Dropdown.Content>
        <Dropdown.Group>
          <Dropdown.Label>Visibility</Dropdown.Label>
          <Dropdown.Checkbox defaultChecked>Show toolbar</Dropdown.Checkbox>
          <Dropdown.Checkbox>Show status bar</Dropdown.Checkbox>
        </Dropdown.Group>
        <Dropdown.Separator />
        <Dropdown.Group>
          <Dropdown.Label>Theme</Dropdown.Label>
          <Dropdown.RadioGroup defaultValue="system">
            <Dropdown.Radio value="light">Light</Dropdown.Radio>
            <Dropdown.Radio value="dark">Dark</Dropdown.Radio>
            <Dropdown.Radio value="system">System</Dropdown.Radio>
          </Dropdown.RadioGroup>
        </Dropdown.Group>
      </Dropdown.Content>
    </Dropdown.Root>
  ),
};
