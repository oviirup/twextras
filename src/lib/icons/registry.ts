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

// Forms --->

export const Mail = createIconNode({
  name: "mail",
  nodes: HugeIcons.Mail01Icon,
  props: baseProps,
});

export const Lock = createIconNode({
  name: "lock",
  nodes: HugeIcons.LockOpenIcon,
  props: baseProps,
});

export const Eye = createIconNode({
  name: "eye",
  nodes: HugeIcons.EyeIcon,
  props: baseProps,
});

export const EyeClose = createIconNode({
  name: "eye-close",
  nodes: HugeIcons.EyeOffIcon,
  props: baseProps,
});

export const Edit = createIconNode({
  name: "edit",
  nodes: HugeIcons.Edit03Icon,
  props: baseProps,
});

export const Password = createIconNode({
  name: "password",
  nodes: HugeIcons.SquareLockPasswordIcon,
  props: baseProps,
});

export const Search = createIconNode({
  name: "search",
  nodes: HugeIcons.Search01Icon,
  props: baseProps,
});

export const Alert = createIconNode({
  name: "alert",
  nodes: HugeIcons.AlertDiamondIcon,
  props: baseProps,
});

export const Loading = createIconNode({
  name: "loading",
  nodes: HugeIcons.LoaderCircleIcon,
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

export const Users = createIconNode({
  name: "users",
  nodes: HugeIcons.UsersIcon,
  props: baseProps,
});

export const Calendar = createIconNode({
  name: "calendar",
  nodes: HugeIcons.Calendar01Icon,
  props: baseProps,
});

export const Notification = createIconNode({
  name: "notification",
  nodes: HugeIcons.Notification01Icon,
  props: baseProps,
});

export const UserGroup = createIconNode({
  name: "user-group",
  nodes: HugeIcons.UserGroup03Icon,
  props: baseProps,
});

export const BookOpen = createIconNode({
  name: "book-open",
  nodes: HugeIcons.BookOpen01Icon,
  props: baseProps,
});

// Devices --->

export const Computer = createIconNode({
  name: "computer",
  nodes: HugeIcons.ComputerIcon,
  props: baseProps,
});

// Uploads --->

export const Upload = createIconNode({
  name: "upload",
  nodes: HugeIcons.CloudUploadIcon,
  props: baseProps,
});
