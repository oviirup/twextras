import type { Meta, StoryObj } from "@storybook/react";
import * as Pagination from "./pagination";

const meta = {
  title: "UI/Pagination",
  component: Pagination.Root,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Pagination.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Pagination.Root>
      <Pagination.Content>
        <Pagination.Item>
          <Pagination.Previous href="#" />
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Link href="#" isActive>
            1
          </Pagination.Link>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Link href="#">2</Pagination.Link>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Link href="#">3</Pagination.Link>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Ellipsis />
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Link href="#">10</Pagination.Link>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Next href="#" />
        </Pagination.Item>
      </Pagination.Content>
    </Pagination.Root>
  ),
};
