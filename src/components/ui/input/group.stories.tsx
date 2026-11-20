import type { Meta, StoryObj } from "@storybook/react";
import { Icons } from "@/lib/icons";
import * as InputGroup from "./group";

const meta = {
  title: "UI/Input Group",
  component: InputGroup.Root,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof InputGroup.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <InputGroup.Root className="w-72">
      <InputGroup.Addon>
        <Icons.Search />
        <InputGroup.Text>Search</InputGroup.Text>
      </InputGroup.Addon>
      <InputGroup.Input placeholder="Search..." />
      <InputGroup.Addon align="inline-end">
        <InputGroup.Button icon>
          <Icons.Close />
        </InputGroup.Button>
      </InputGroup.Addon>
    </InputGroup.Root>
  ),
};

export const WithButton: Story = {
  render: () => (
    <InputGroup.Root className="w-72">
      <InputGroup.Input type="email" placeholder="Enter your email" />
      <InputGroup.Addon align="inline-end">
        <InputGroup.Button>Subscribe</InputGroup.Button>
      </InputGroup.Addon>
    </InputGroup.Root>
  ),
};

export const Textarea: Story = {
  render: () => (
    <InputGroup.Root className="w-72">
      <InputGroup.Textarea placeholder="Write a message..." />
      <InputGroup.Addon align="block-end" offset className="justify-between">
        <InputGroup.Text className="text-xs text-muted-foreground">0 / 280</InputGroup.Text>
        <InputGroup.Button>Send</InputGroup.Button>
      </InputGroup.Addon>
    </InputGroup.Root>
  ),
};

export const Alignments: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-4">
      <InputGroup.Root>
        <InputGroup.Addon align="block-start" offset>
          <InputGroup.Text>https://</InputGroup.Text>
        </InputGroup.Addon>
        <InputGroup.Input placeholder="example.com" />
      </InputGroup.Root>
      <InputGroup.Root>
        <InputGroup.Addon>
          <Icons.Mail />
        </InputGroup.Addon>
        <InputGroup.Input placeholder="Email" />
        <InputGroup.Addon align="inline-end">
          <InputGroup.Text>@acme</InputGroup.Text>
        </InputGroup.Addon>
      </InputGroup.Root>
    </div>
  ),
};

export const IconButton: Story = {
  render: () => (
    <InputGroup.Root className="w-72">
      <InputGroup.Addon>
        <Icons.Lock />
      </InputGroup.Addon>
      <InputGroup.Input type="password" placeholder="Password" />
      <InputGroup.Addon align="inline-end">
        <InputGroup.Button>
          <Icons.ArrowRight />
        </InputGroup.Button>
      </InputGroup.Addon>
    </InputGroup.Root>
  ),
};
