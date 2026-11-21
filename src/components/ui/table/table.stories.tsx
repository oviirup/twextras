import type { Meta, StoryObj } from "@storybook/react";
import * as Table from "./table";

const meta = {
  title: "UI/Table",
  component: Table.Root,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Table.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

const invoices = [
  { id: "INV001", status: "Paid", method: "Credit Card", amount: "$250.00" },
  { id: "INV002", status: "Pending", method: "PayPal", amount: "$150.00" },
  { id: "INV003", status: "Unpaid", method: "Bank Transfer", amount: "$350.00" },
  { id: "INV004", status: "Paid", method: "Credit Card", amount: "$450.00" },
];

export const Default: Story = {
  render: () => (
    <Table.Root className="w-96">
      <Table.Header>
        <Table.Row>
          <Table.Head>Invoice</Table.Head>
          <Table.Head>Status</Table.Head>
          <Table.Head>Method</Table.Head>
          <Table.Head className="text-right">Amount</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {invoices.map((invoice) => (
          <Table.Row key={invoice.id}>
            <Table.Cell className="font-medium">{invoice.id}</Table.Cell>
            <Table.Cell>{invoice.status}</Table.Cell>
            <Table.Cell>{invoice.method}</Table.Cell>
            <Table.Cell className="text-right">{invoice.amount}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  ),
};

export const WithFooterAndCaption: Story = {
  render: () => (
    <Table.Root className="w-96">
      <Table.Caption>A list of your recent invoices.</Table.Caption>
      <Table.Header>
        <Table.Row>
          <Table.Head>Invoice</Table.Head>
          <Table.Head>Status</Table.Head>
          <Table.Head className="text-right">Amount</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {invoices.slice(0, 2).map((invoice) => (
          <Table.Row key={invoice.id}>
            <Table.Cell className="font-medium">{invoice.id}</Table.Cell>
            <Table.Cell>{invoice.status}</Table.Cell>
            <Table.Cell className="text-right">{invoice.amount}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.Cell colSpan={2}>Total</Table.Cell>
          <Table.Cell className="text-right">$400.00</Table.Cell>
        </Table.Row>
      </Table.Footer>
    </Table.Root>
  ),
};

export const Selected: Story = {
  render: () => (
    <Table.Root className="w-96">
      <Table.Header>
        <Table.Row>
          <Table.Head>Name</Table.Head>
          <Table.Head>Role</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row data-state="selected">
          <Table.Cell className="font-medium">Alice</Table.Cell>
          <Table.Cell>Admin</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell className="font-medium">Bob</Table.Cell>
          <Table.Cell>Editor</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  ),
};
