import type { Meta, StoryObj } from "@storybook/react";
import { Icons } from "@/lib/icons";
import * as Sidebar from "./sidebar";

const meta = {
  title: "UI/Sidebar",
  component: Sidebar.Provider,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Sidebar.Provider>;

export default meta;
type Story = StoryObj<typeof meta>;

function SidebarDemo({
  collapsible = "offcanvas" as const,
}: {
  collapsible?: "offcanvas" | "none";
}) {
  return (
    <Sidebar.Provider>
      <Sidebar.Root variant="inset" collapsible={collapsible} className="min-h-svh">
        <Sidebar.Header>
          <Sidebar.MenuButton size="lg" render={<a href="#" />}>
            <Icons.Dashboard />
            <span>Acme Inc.</span>
          </Sidebar.MenuButton>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Platform</Sidebar.GroupLabel>
            <Sidebar.GroupContent>
              <Sidebar.Menu>
                <Sidebar.MenuItem>
                  <Sidebar.MenuButton isActive render={<a href="#" />}>
                    <Icons.Home />
                    <span>Dashboard</span>
                  </Sidebar.MenuButton>
                </Sidebar.MenuItem>
                <Sidebar.MenuItem>
                  <Sidebar.MenuButton render={<a href="#" />}>
                    <Icons.Settings />
                    <span>Settings</span>
                  </Sidebar.MenuButton>
                </Sidebar.MenuItem>
                <Sidebar.MenuItem>
                  <Sidebar.MenuButton render={<a href="#" />}>
                    <Icons.Shield />
                    <span>Help</span>
                  </Sidebar.MenuButton>
                </Sidebar.MenuItem>
              </Sidebar.Menu>
            </Sidebar.GroupContent>
          </Sidebar.Group>
        </Sidebar.Content>
        <Sidebar.Footer>
          <Sidebar.Menu>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton render={<a href="#" />}>
                <Icons.Logout />
                <span>Log out</span>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Footer>
      </Sidebar.Root>
      <Sidebar.Inset className="p-6">
        <Sidebar.Trigger />
        <p className="mt-4 text-sm text-muted-foreground">
          Main content area. Toggle the sidebar with the button or Ctrl/⌘ + B.
        </p>
      </Sidebar.Inset>
    </Sidebar.Provider>
  );
}

export const Default: Story = {
  render: () => <SidebarDemo />,
};

export const NoCollapse: Story = {
  render: () => <SidebarDemo collapsible="none" />,
};
