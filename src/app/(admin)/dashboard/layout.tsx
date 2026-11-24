import { AppSidebar } from "@/components/admin/layout/sidebar";
import { Sidebar } from "@/components/ui/sidebar";
import { SITE } from "@/config/app";
import { requireUserProfile } from "@/modules/auth/guards";
import { isUserActive } from "@/modules/auth/utils";

export default async function DashboardLayout({ children }: LayoutProps<"/dashboard">) {
  const user = await requireUserProfile();
  const isActive = isUserActive(user);

  return (
    <Sidebar.Provider className="h-dvh overflow-hidden">
      <AppSidebar user={user} locked={!isActive} />
      <Sidebar.Inset className="min-h-0 overflow-y-auto">
        <header className="sticky top-0 z-10 flex h-12 shrink-0 items-center gap-3 border-b bg-background px-4">
          <Sidebar.Trigger />
          <span className="text-sm font-medium">{SITE.NAME}</span>
        </header>
        {children}
      </Sidebar.Inset>
    </Sidebar.Provider>
  );
}
