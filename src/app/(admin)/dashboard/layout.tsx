import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/admin/layout/sidebar";
import { Sidebar } from "@/components/ui/sidebar";
import { SITE } from "@/config/app";
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";

export default async function DashboardLayout({ children }: LayoutProps<"/dashboard">) {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    redirect("/dashboard/signin");
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { status: true },
  });

  if (dbUser?.status !== "active") {
    redirect("/dashboard/signin");
  }

  return (
    <Sidebar.Provider>
      <AppSidebar user={user} />
      <Sidebar.Inset>
        <header className="flex h-12 shrink-0 items-center gap-3 border-b px-4">
          <Sidebar.Trigger />
          <span className="text-sm font-medium">{SITE.NAME}</span>
        </header>
        {children}
      </Sidebar.Inset>
    </Sidebar.Provider>
  );
}
