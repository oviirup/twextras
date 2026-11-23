import { Icons } from "@/lib/icons";
import type { UserRole } from "@/prisma/generated/enums";

export type SidebarNavIcon = (typeof Icons)[keyof typeof Icons];

export type SidebarNavItem = {
  title: string;
  href: string;
  icon: SidebarNavIcon;
  roles?: UserRole[];
};

export type SidebarNavGroup = {
  label: string;
  items: SidebarNavItem[];
};

export const SIDEBAR_NAV: SidebarNavGroup[] = [
  {
    label: "Platform",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: Icons.Dashboard,
      },
      {
        title: "Events",
        href: "/dashboard/events",
        icon: Icons.Calendar,
      },
      {
        title: "Books",
        href: "/dashboard/books",
        icon: Icons.BookOpen,
      },
    ],
  },
  {
    label: "Administration",
    items: [
      {
        title: "Members",
        href: "/dashboard/members",
        icon: Icons.UserGroup,
        roles: ["super_admin", "admin"],
      },
      {
        title: "Users",
        href: "/dashboard/users",
        icon: Icons.Users,
        roles: ["super_admin", "admin"],
      },
    ],
  },
  {
    label: "Account",
    items: [
      {
        title: "Profile",
        href: "/dashboard/profile",
        icon: Icons.User,
      },
    ],
  },
];
