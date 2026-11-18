import * as HugeIcons from "hugeicons";
import { createIconNode, IconProps } from "./icon";

const baseProps: IconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

// Arrows --->

export const ArrowUp = createIconNode({
  name: "arrow-up",
  nodes: HugeIcons.ArrowUp02Icon,
  props: baseProps,
});

export const ArrowDown = createIconNode({
  name: "arrow-down",
  nodes: HugeIcons.ArrowDown02Icon,
  props: baseProps,
});

export const ArrowLeft = createIconNode({
  name: "arrow-left",
  nodes: HugeIcons.ArrowLeft02Icon,
  props: baseProps,
});

export const ArrowRight = createIconNode({
  name: "arrow-right",
  nodes: HugeIcons.ArrowRight02Icon,
  props: baseProps,
});

// Chevrons --->

export const ChevronUp = createIconNode({
  name: "chevron-up",
  nodes: HugeIcons.ArrowUp01Icon,
  props: baseProps,
});

export const ChevronDown = createIconNode({
  name: "chevron-down",
  nodes: HugeIcons.ArrowDown01Icon,
  props: baseProps,
});

export const ChevronLeft = createIconNode({
  name: "chevron-left",
  nodes: HugeIcons.ArrowLeft01Icon,
  props: baseProps,
});

export const ChevronRight = createIconNode({
  name: "chevron-right",
  nodes: HugeIcons.ArrowRight01Icon,
  props: baseProps,
});

// Misc --->

export const Check = createIconNode({
  name: "check",
  nodes: HugeIcons.CheckIcon,
  props: baseProps,
});

export const Close = createIconNode({
  name: "close",
  nodes: HugeIcons.Cancel01Icon,
  props: baseProps,
});

export const Ellipsis = createIconNode({
  name: "ellipsis",
  nodes: HugeIcons.EllipsisIcon,
  props: baseProps,
});

export const Logout = createIconNode({
  name: "logout",
  nodes: HugeIcons.Logout01Icon,
  props: baseProps,
});

export const User = createIconNode({
  name: "user",
  nodes: HugeIcons.UserIcon,
  props: baseProps,
});

export const Google = createIconNode({
  name: "google",
  nodes: HugeIcons.GoogleIcon,
  props: baseProps,
});

// Navigation --->

export const Home = createIconNode({
  name: "home",
  nodes: HugeIcons.Home01Icon,
  props: baseProps,
});

export const Dashboard = createIconNode({
  name: "dashboard",
  nodes: HugeIcons.DashboardSquare01Icon,
  props: baseProps,
});

export const Settings = createIconNode({
  name: "settings",
  nodes: HugeIcons.SettingsIcon,
  props: baseProps,
});

export const Shield = createIconNode({
  name: "shield",
  nodes: HugeIcons.ShieldIcon,
  props: baseProps,
});

export const SidebarLeft = createIconNode({
  name: "sidebar-left",
  nodes: HugeIcons.SidebarLeftIcon,
  props: baseProps,
});
