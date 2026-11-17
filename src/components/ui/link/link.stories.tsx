import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Link } from "./link";

const meta = {
  title: "UI/Link",
  component: Link,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: "/",
    children: "Next Link",
  },
  render: (args) => <Link className="link" {...args} />,
};
