"use client";

import { mergeProps } from "baseui/merge-props";
import { useRender } from "baseui/use-render";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { createBaseContext } from "@/lib/context";
import { useIsMobile } from "@/lib/hooks/use-is-mobile";
import { Icons } from "@/lib/icons";
import { cn, cva } from "@/lib/utils";

const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

type SidebarContextProps = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const [SidebarContext, useSidebar] = createBaseContext<SidebarContextProps>({
  name: "sidebar",
  error: "useSidebar must be used within a SidebarProvider.",
});

// sidebar provider --->

function Sidebar_Provider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: Sidebar_Provider.Props) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = useState(false);

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }
      // This sets the cookie to keep the sidebar state.
      // biome-ignore lint/suspicious/noDocumentCookie: ignore
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open],
  );

  // Helper to toggle the sidebar.
  const toggleSidebar = useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
  }, [isMobile, setOpen]);

  // Adds a keyboard shortcut to toggle the sidebar.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? "expanded" : "collapsed";

  const contextValue = useMemo<SidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, toggleSidebar],
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <div
        data-slot="sidebar-wrapper"
        style={{
          "--sidebar-width": SIDEBAR_WIDTH,
          ...style,
        }}
        className={cn(
          "group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar",
          className,
        )}
        {...props}>
        {children}
      </div>
    </SidebarContext.Provider>
  );
}
namespace Sidebar_Provider {
  export type Props = React.ComponentProps<"div"> & {
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  };
}

// sidebar root --->

function Sidebar_Root({
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  dir,
  ...props
}: Sidebar_Root.Props) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  if (collapsible === "none") {
    return (
      <div
        data-slot="sidebar"
        className={cn(
          "flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground",
          className,
        )}
        {...props}>
        {children}
      </div>
    );
  }

  if (isMobile) {
    return (
      <Sheet.Root open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <Sheet.Content
          dir={dir}
          side="left"
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className="*:slot-sheet-close:hidden w-(--sidebar-width) border-sidebar-border bg-sidebar p-0 text-sidebar-foreground"
          style={{
            "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
          }}>
          <Sheet.Header className="sr-only">
            <Sheet.Title>Sidebar</Sheet.Title>
            <Sheet.Description>Displays the mobile sidebar.</Sheet.Description>
          </Sheet.Header>
          <div className="flex size-full flex-col">{children}</div>
        </Sheet.Content>
      </Sheet.Root>
    );
  }

  return (
    <div
      className="group peer hidden text-sidebar-foreground md:block"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : undefined}
      data-variant={variant}
      data-side="left"
      data-slot="sidebar">
      {/* This is what handles the sidebar gap on desktop */}
      <div
        data-slot="sidebar-gap"
        className={cn(
          "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
          "group-data-[collapsible=offcanvas]:w-0",
        )}
      />
      <div
        data-slot="sidebar-container"
        data-side="left"
        className={cn(
          "fixed inset-y-0 left-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,width] duration-200 ease-linear group-data-[collapsible=offcanvas]:-left-(--sidebar-width) md:flex",
          variant === "sidebar" && "border-r",
          className,
        )}
        {...props}>
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className="flex size-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:ring-1 group-data-[variant=floating]:ring-sidebar-border">
          {children}
        </div>
      </div>
    </div>
  );
}
namespace Sidebar_Root {
  export type Props = React.ComponentProps<"div"> & {
    variant?: "sidebar" | "floating" | "inset";
    collapsible?: "offcanvas" | "none";
  };
}

// sidebar trigger --->

function Sidebar_Trigger({ className, onClick, ...props }: Sidebar_Trigger.Props) {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      icon
      size="sm"
      className={cn(className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}>
      <Icons.SidebarLeft />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}
namespace Sidebar_Trigger {
  export type Props = React.ComponentProps<typeof Button>;
}

// sidebar inset --->

function Sidebar_Inset({ className, ...props }: Sidebar_Inset.Props) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        "relative flex w-full min-w-0 flex-1 flex-col bg-background transition-[margin] md:peer-data-[variant=inset]:mt-2 md:peer-data-[variant=inset]:rounded-tl-xl md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
        className,
      )}
      {...props}
    />
  );
}
namespace Sidebar_Inset {
  export type Props = React.ComponentProps<"main">;
}

// sidebar input --->

function Sidebar_Input({ className, ...props }: Sidebar_Input.Props) {
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      className={cn("h-8 w-full border-input bg-muted/20 dark:bg-muted/30", className)}
      {...props}
    />
  );
}
namespace Sidebar_Input {
  export type Props = React.ComponentProps<typeof Input>;
}

// sidebar header --->

function Sidebar_Header({ className, ...props }: Sidebar_Header.Props) {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  );
}
namespace Sidebar_Header {
  export type Props = React.ComponentProps<"div">;
}

// sidebar footer --->

function Sidebar_Footer({ className, ...props }: Sidebar_Footer.Props) {
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  );
}
namespace Sidebar_Footer {
  export type Props = React.ComponentProps<"div">;
}

// sidebar separator --->

function Sidebar_Separator({ className, ...props }: Sidebar_Separator.Props) {
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      className={cn("mx-2 w-auto border-sidebar-border", className)}
      {...props}
    />
  );
}
namespace Sidebar_Separator {
  export type Props = React.ComponentProps<typeof Separator>;
}

// sidebar content --->

function Sidebar_Content({ className, ...props }: Sidebar_Content.Props) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn("flex min-h-0 flex-1 scrollbar-thin flex-col gap-0 overflow-auto", className)}
      {...props}
    />
  );
}
namespace Sidebar_Content {
  export type Props = React.ComponentProps<"div">;
}

// sidebar group --->

function Sidebar_Group({ className, ...props }: Sidebar_Group.Props) {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cn("relative flex w-full min-w-0 flex-col px-2 py-1", className)}
      {...props}
    />
  );
}
namespace Sidebar_Group {
  export type Props = React.ComponentProps<"div">;
}

// sidebar group label --->

function Sidebar_GroupLabel({ className, render, ...props }: Sidebar_GroupLabel.Props) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(
          "flex h-8 shrink-0 items-center rounded-md px-2 text-sm text-sidebar-foreground/70 ring-sidebar-ring outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 icon:size-4",
          className,
        ),
      },
      props,
    ),
    render,
    state: {
      slot: "sidebar-group-label",
      sidebar: "group-label",
    },
  });
}
namespace Sidebar_GroupLabel {
  export type Props = useRender.ComponentProps<"div"> & React.ComponentProps<"div">;
}

// sidebar group action --->

function Sidebar_GroupAction({ className, render, ...props }: Sidebar_GroupAction.Props) {
  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        className: cn(
          "absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform after:absolute after:-inset-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:ring hover:ring-sidebar-border/65 hover:ring-inset focus-visible:ring focus-visible:ring-sidebar-border/65 focus-visible:ring-inset md:after:hidden icon:size-4",
          className,
        ),
      },
      props,
    ),
    render,
    state: {
      slot: "sidebar-group-action",
      sidebar: "group-action",
    },
  });
}
namespace Sidebar_GroupAction {
  export type Props = useRender.ComponentProps<"button"> & React.ComponentProps<"button">;
}

// sidebar group content --->

function Sidebar_GroupContent({ className, ...props }: Sidebar_GroupContent.Props) {
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={cn("w-full text-sm", className)}
      {...props}
    />
  );
}
namespace Sidebar_GroupContent {
  export type Props = React.ComponentProps<"div">;
}

// sidebar menu --->

function Sidebar_Menu({ className, ...props }: Sidebar_Menu.Props) {
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className={cn("flex w-full min-w-0 flex-col gap-px", className)}
      {...props}
    />
  );
}
namespace Sidebar_Menu {
  export type Props = React.ComponentProps<"ul">;
}

// sidebar menu item --->

function Sidebar_MenuItem({ className, ...props }: Sidebar_MenuItem.Props) {
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cn("group/menu-item relative", className)}
      {...props}
    />
  );
}
namespace Sidebar_MenuItem {
  export type Props = React.ComponentProps<"li">;
}

// sidebar menu button variants --->

const sidebarMenuButtonVariants = cva({
  base: [
    "peer/menu-button group/menu-button *[span]:last:truncate flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-base ring-sidebar-ring outline-hidden transition-[width,height,padding] group-has-data-[sidebar=menu-action]/menu-item:pr-8 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:ring hover:ring-sidebar-border/65 hover:ring-inset focus-visible:ring focus-visible:ring-sidebar-border/65 focus-visible:ring-inset active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 icon:size-4.5",
    "data-open:hover:bg-sidebar-accent data-open:hover:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:text-sidebar-accent-foreground",
  ],
  variants: {
    variant: {
      default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
    },
    size: {
      default: "h-8 text-sm",
      sm: "h-7 text-sm",
      lg: "h-12 text-sm",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

// sidebar menu button --->

function Sidebar_MenuButton({
  render,
  isActive = false,
  variant = "default",
  size = "default",
  className,
  ...props
}: Sidebar_MenuButton.Props) {
  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        className: cn(sidebarMenuButtonVariants({ variant, size }), className),
      },
      props,
    ),
    render,
    state: {
      slot: "sidebar-menu-button",
      sidebar: "menu-button",
      size,
      active: isActive,
    },
  });
}
namespace Sidebar_MenuButton {
  export type Props = useRender.ComponentProps<"button"> &
    React.ComponentProps<"button"> & {
      isActive?: boolean;
    } & cva.Props<typeof sidebarMenuButtonVariants>;
}

// sidebar menu action --->

function Sidebar_MenuAction({
  className,
  render,
  showOnHover = false,
  ...props
}: Sidebar_MenuAction.Props) {
  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        className: cn(
          "absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-[calc(var(--radius-sm)-2px)] p-0 text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5 peer-data-[size=sm]/menu-button:top-1 after:absolute after:-inset-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:ring hover:ring-sidebar-border/65 hover:ring-inset focus-visible:ring focus-visible:ring-sidebar-border/65 focus-visible:ring-inset md:after:hidden icon:size-4",
          showOnHover &&
            "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 peer-data-active/menu-button:text-sidebar-accent-foreground aria-expanded:opacity-100 md:opacity-0",
          className,
        ),
      },
      props,
    ),
    render,
    state: {
      slot: "sidebar-menu-action",
      sidebar: "menu-action",
    },
  });
}
namespace Sidebar_MenuAction {
  export type Props = useRender.ComponentProps<"button"> &
    React.ComponentProps<"button"> & { showOnHover?: boolean };
}

// sidebar menu badge --->

function Sidebar_MenuBadge({ className, ...props }: Sidebar_MenuBadge.Props) {
  return (
    <div
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      className={cn(
        "pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-[calc(var(--radius-sm)-2px)] px-1 text-sm font-medium text-sidebar-foreground tabular-nums select-none peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5 peer-data-[size=sm]/menu-button:top-1 peer-data-active/menu-button:text-sidebar-accent-foreground",
        className,
      )}
      {...props}
    />
  );
}
namespace Sidebar_MenuBadge {
  export type Props = React.ComponentProps<"div">;
}

// sidebar menu skeleton --->

function Sidebar_MenuSkeleton({
  className,
  showIcon = false,
  ...props
}: Sidebar_MenuSkeleton.Props) {
  // Random width between 50 to 90%.
  const [width] = useState(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  });

  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)}
      {...props}>
      {showIcon && <Skeleton className="size-4 rounded-md" data-sidebar="menu-skeleton-icon" />}
      <Skeleton
        className="h-4 max-w-(--skeleton-width) flex-1"
        data-sidebar="menu-skeleton-text"
        style={{
          "--skeleton-width": width,
        }}
      />
    </div>
  );
}
namespace Sidebar_MenuSkeleton {
  export type Props = React.ComponentProps<"div"> & { showIcon?: boolean };
}

// sidebar menu sub --->

function Sidebar_MenuSub({ className, ...props }: Sidebar_MenuSub.Props) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={cn(
        "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5 group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  );
}
namespace Sidebar_MenuSub {
  export type Props = React.ComponentProps<"ul">;
}

// sidebar menu sub item --->

function Sidebar_MenuSubItem({ className, ...props }: Sidebar_MenuSubItem.Props) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      className={cn("group/menu-sub-item relative", className)}
      {...props}
    />
  );
}
namespace Sidebar_MenuSubItem {
  export type Props = React.ComponentProps<"li">;
}

// sidebar menu sub button --->

function Sidebar_MenuSubButton({
  render,
  size = "md",
  isActive = false,
  className,
  ...props
}: Sidebar_MenuSubButton.Props) {
  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(
      {
        className: cn(
          "*[span]:last:truncate flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground ring-sidebar-ring outline-hidden group-data-[collapsible=icon]:hidden hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:ring hover:ring-sidebar-border/65 hover:ring-inset focus-visible:ring focus-visible:ring-sidebar-border/65 focus-visible:ring-inset active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[size=md]:text-sm data-[size=sm]:text-sm data-active:bg-sidebar-accent data-active:text-sidebar-accent-foreground icon:size-4 icon:text-sidebar-accent-foreground",
          className,
        ),
      },
      props,
    ),
    render,
    state: {
      slot: "sidebar-menu-sub-button",
      sidebar: "menu-sub-button",
      size,
      active: isActive,
    },
  });
}
namespace Sidebar_MenuSubButton {
  export type Props = useRender.ComponentProps<"a"> &
    React.ComponentProps<"a"> & { size?: "sm" | "md"; isActive?: boolean };
}

// exports --->

export {
  Sidebar_Content as Content,
  Sidebar_Footer as Footer,
  Sidebar_Group as Group,
  Sidebar_GroupAction as GroupAction,
  Sidebar_GroupContent as GroupContent,
  Sidebar_GroupLabel as GroupLabel,
  Sidebar_Header as Header,
  Sidebar_Input as Input,
  Sidebar_Inset as Inset,
  Sidebar_Menu as Menu,
  Sidebar_MenuAction as MenuAction,
  Sidebar_MenuBadge as MenuBadge,
  Sidebar_MenuButton as MenuButton,
  Sidebar_MenuItem as MenuItem,
  Sidebar_MenuSkeleton as MenuSkeleton,
  Sidebar_MenuSub as MenuSub,
  Sidebar_MenuSubButton as MenuSubButton,
  Sidebar_MenuSubItem as MenuSubItem,
  Sidebar_Provider as Provider,
  Sidebar_Root as Root,
  Sidebar_Separator as Separator,
  Sidebar_Trigger as Trigger,
};
