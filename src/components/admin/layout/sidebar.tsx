"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Dropdown } from "@/components/ui/dropdown";
import { Link } from "@/components/ui/link";
import { Sidebar } from "@/components/ui/sidebar";
import { signOut } from "@/lib/auth/client";
import { Icons } from "@/lib/icons";
import { SIDEBAR_NAV } from "./data";

// app-sidebar --->

function AppSidebar({ user }: AppSidebar.Props) {
  const pathname = usePathname();

  return (
    <Sidebar.Root variant="inset" collapsible="offcanvas">
      <Sidebar.Header className="mt-2">
        <Sidebar.GroupLabel className="text-base">Omkarnath Mission</Sidebar.GroupLabel>
      </Sidebar.Header>
      <Sidebar.Content className="gap-1">
        <NavMenu pathname={pathname} />
      </Sidebar.Content>
      <Sidebar.Footer>
        <Sidebar.Menu>
          <Sidebar.MenuItem>
            <Sidebar.MenuButton
              isActive={pathname === "/dashboard/settings"}
              render={<Link href="/dashboard/settings" />}>
              <Icons.Settings />
              <span>Settings</span>
            </Sidebar.MenuButton>
          </Sidebar.MenuItem>
          <Sidebar.Separator className="my-1" />
          <UserMenu user={user} />
        </Sidebar.Menu>
      </Sidebar.Footer>
    </Sidebar.Root>
  );
}
namespace AppSidebar {
  export type Props = {
    user: {
      name?: string | null;
      username?: string | null;
      email: string;
      image?: string | null;
    };
  };
}

// nav-menu --->

function NavMenu({ pathname }: NavMenu.Props) {
  return SIDEBAR_NAV.map((group) => (
    <Sidebar.Group key={group.label}>
      <Sidebar.GroupLabel className="text-xs uppercase">
        <span>{group.label}</span>
        <Sidebar.Separator className="flex-1" />
      </Sidebar.GroupLabel>
      <Sidebar.GroupContent>
        <Sidebar.Menu>
          {group.items.map((item) => (
            <Sidebar.MenuItem key={item.href}>
              <Sidebar.MenuButton
                isActive={pathname === item.href}
                render={<Link href={item.href} />}>
                <item.icon />
                <span>{item.title}</span>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          ))}
        </Sidebar.Menu>
      </Sidebar.GroupContent>
    </Sidebar.Group>
  ));
}
namespace NavMenu {
  export type Props = {
    pathname: string;
  };
}

// user-menu --->

function UserMenu({ user }: UserMenu.Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const displayName = user.name || user.username || user.email;
  const initials = displayName
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  function handleLogout() {
    startTransition(async () => {
      try {
        await signOut({ callbackURL: "/dashboard/signin" });
      } finally {
        router.push("/dashboard/signin");
        router.refresh();
      }
    });
  }

  return (
    <Sidebar.MenuItem>
      <Dropdown.Root>
        <Dropdown.Trigger render={<Sidebar.MenuButton className="h-auto" />}>
          <Avatar.Root size="sm" className="ring-2 ring-sidebar-accent after:hidden">
            {user.image ? <Avatar.Image src={user.image} alt={displayName} /> : null}
            <Avatar.Fallback />
          </Avatar.Root>
          <span className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{displayName}</span>
          </span>
          <Icons.ChevronUp className="ml-auto size-4" />
        </Dropdown.Trigger>
        <Dropdown.Content side="top" align="start" inline>
          <div className="flex flex-col items-center px-2 py-1.5 leading-none">
            <Avatar.Root className="mb-2">
              {user.image ? <Avatar.Image src={user.image} alt={displayName} /> : null}
              <Avatar.Fallback>{initials || <Icons.User />}</Avatar.Fallback>
            </Avatar.Root>
            <span className="truncate font-medium">{user.name || displayName}</span>
            {user.username ? (
              <span className="truncate text-xs text-muted-foreground">@{user.username}</span>
            ) : null}
            <span className="truncate text-xs text-muted-foreground">{user.email}</span>
          </div>
          <Dropdown.Separator />
          <Dropdown.Group>
            <Dropdown.Item>
              <Icons.User />
              Profile
            </Dropdown.Item>
          </Dropdown.Group>
          <Dropdown.Group>
            <Dropdown.Item variant="destructive" disabled={isPending} onClick={handleLogout}>
              {isPending ? (
                <Icons.Loading className="size-4 motion-safe:animate-spin" />
              ) : (
                <Icons.Logout className="size-4" />
              )}
              Log out
            </Dropdown.Item>
          </Dropdown.Group>
        </Dropdown.Content>
      </Dropdown.Root>
    </Sidebar.MenuItem>
  );
}
namespace UserMenu {
  export type Props = AppSidebar.Props;
}

// exports --->

export { AppSidebar };
