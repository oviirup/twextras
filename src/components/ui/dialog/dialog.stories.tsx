import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../button";
import { Input } from "../input";
import * as Dialog from "./dialog";

const meta = {
  title: "UI/Dialog",
  component: Dialog.Root,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Dialog.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Dialog.Root>
      <Dialog.Trigger render={<Button variant="outline" />}>Open dialog</Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Edit profile</Dialog.Title>
          <Dialog.Description>
            Make changes to your profile here. Click save when you are done.
          </Dialog.Description>
        </Dialog.Header>
        <div className="grid gap-2">
          <label className="text-sm font-medium" htmlFor="name">
            Name
          </label>
          <Input id="name" placeholder="Your name" />
        </div>
        <Dialog.Footer showCloseButton>
          <Button>Save changes</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  ),
};
