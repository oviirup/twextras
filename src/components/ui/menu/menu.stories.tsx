import type { Meta, StoryObj } from "@storybook/react";
import * as Menu from "./menu";

const meta = {
  title: "UI/Menu",
  component: Menu.Root,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Menu.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Menu.Root>
      <Menu.Trigger className="flex h-24 w-48 items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
        Right click here
      </Menu.Trigger>
      <Menu.Content>
        <Menu.Item>Profile</Menu.Item>
        <Menu.Item>Settings</Menu.Item>
        <Menu.Separator />
        <Menu.Item variant="destructive">Delete</Menu.Item>
      </Menu.Content>
    </Menu.Root>
  ),
};

export const Full: Story = {
  render: () => (
    <Menu.Root>
      <Menu.Trigger className="flex h-24 w-48 items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
        Right click here
      </Menu.Trigger>
      <Menu.Content>
        <Menu.Group>
          <Menu.Label>Account</Menu.Label>
          <Menu.Item>
            Profile
            <Menu.Shortcut>⇧⌘P</Menu.Shortcut>
          </Menu.Item>
          <Menu.Item>Settings</Menu.Item>
        </Menu.Group>
        <Menu.Separator />
        <Menu.CheckboxItem defaultChecked>Show toolbar</Menu.CheckboxItem>
        <Menu.CheckboxItem>Show status bar</Menu.CheckboxItem>
        <Menu.Separator />
        <Menu.RadioGroup defaultValue="system">
          <Menu.RadioItem value="light">Light</Menu.RadioItem>
          <Menu.RadioItem value="dark">Dark</Menu.RadioItem>
          <Menu.RadioItem value="system">System</Menu.RadioItem>
        </Menu.RadioGroup>
        <Menu.Separator />
        <Menu.Sub>
          <Menu.SubTrigger>Share</Menu.SubTrigger>
          <Menu.SubContent>
            <Menu.Item>Email</Menu.Item>
            <Menu.Item>Copy link</Menu.Item>
          </Menu.SubContent>
        </Menu.Sub>
      </Menu.Content>
    </Menu.Root>
  ),
};
