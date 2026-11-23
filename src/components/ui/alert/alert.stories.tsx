import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../button";
import * as Alert from "./alert";

const meta = {
  title: "UI/Alert",
  component: Alert.Root,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Alert.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Alert.Root>
      <Alert.Trigger render={<Button variant="outline" />}>Open alert</Alert.Trigger>
      <Alert.Content>
        <Alert.Header>
          <Alert.Title>Are you sure?</Alert.Title>
          <Alert.Description>This action cannot be undone.</Alert.Description>
        </Alert.Header>
      </Alert.Content>
    </Alert.Root>
  ),
};

export const WithActions: Story = {
  render: () => (
    <Alert.Root>
      <Alert.Trigger render={<Button variant="secondary" />}>Delete item</Alert.Trigger>
      <Alert.Content>
        <Alert.Header>
          <Alert.Title>Delete item</Alert.Title>
          <Alert.Description>
            This will permanently delete the item and remove it from the list.
          </Alert.Description>
        </Alert.Header>
        <Alert.Footer>
          <Alert.Close render={<Button variant="outline" />}>Cancel</Alert.Close>
          <Alert.Close render={<Button />}>Delete</Alert.Close>
        </Alert.Footer>
      </Alert.Content>
    </Alert.Root>
  ),
};

export const WithoutCloseButton: Story = {
  render: () => (
    <Alert.Root>
      <Alert.Trigger render={<Button variant="outline" />}>Open alert</Alert.Trigger>
      <Alert.Content>
        <Alert.Header>
          <Alert.Title>Heads up</Alert.Title>
          <Alert.Description>The close button is hidden on this alert.</Alert.Description>
        </Alert.Header>
        <Alert.Footer showCloseButton>
          <span className="text-sm text-muted-foreground">Dismiss from the footer.</span>
        </Alert.Footer>
      </Alert.Content>
    </Alert.Root>
  ),
};
