import { Icons } from "@/lib/icons";

export const SIDEBAR_NAV = [
  {
    label: "Platform",
    items: [
      { title: "Dashboard", href: "/dashboard", icon: Icons.Dashboard },
      { title: "Events", href: "/dashboard/events", icon: Icons.Calendar },
      { title: "Notifications", href: "/dashboard/notifications", icon: Icons.Notification },
      { title: "Books", href: "/dashboard/books", icon: Icons.BookOpen },
    ],
  },
  {
    label: "Administration",
    items: [
      { title: "Members", href: "/dashboard/members", icon: Icons.UserGroup },
      { title: "Users", href: "/dashboard/users", icon: Icons.Users },
    ],
  },
] as const;
