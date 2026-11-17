import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "../button";
import * as Sheet from "./sheet";

const meta = {
  title: "UI/Sheet",
  component: Sheet.Root,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Sheet.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

function SheetDemo({ side = "right" as const }: { side?: "left" | "right" }) {
  return (
    <Sheet.Root>
      <Sheet.Trigger render={<Button variant="outline" />}>Open sheet</Sheet.Trigger>
      <Sheet.Content side={side}>
        <Sheet.Header>
          <Sheet.Title>Edit profile</Sheet.Title>
          <Sheet.Description>
            Make changes to your profile here. Click save when you are done.
          </Sheet.Description>
        </Sheet.Header>
        <div className="flex-1 p-6 text-sm text-muted-foreground">Sheet content goes here.</div>
        <Sheet.Footer>
          <Button>Save changes</Button>
        </Sheet.Footer>
      </Sheet.Content>
    </Sheet.Root>
  );
}

export const Right: Story = {
  render: () => <SheetDemo />,
};

export const Sides: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <SheetDemo side="left" />
      <SheetDemo side="right" />
    </div>
  ),
};
