import { Empty } from "@/components/ui/empty";
import { Icons } from "@/lib/icons";
import { requireActiveUser } from "@/modules/auth/guards";

export default async function DashboardPage() {
  await requireActiveUser();
  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <Empty.Root className="max-w-sm">
        <Empty.Header>
          <Empty.Media variant="icon">
            <Icons.Dashboard />
          </Empty.Media>
          <Empty.Title>Dashboard</Empty.Title>
          <Empty.Description>
            Overview of mission activity, upcoming events, and recent updates.
          </Empty.Description>
        </Empty.Header>
      </Empty.Root>
    </div>
  );
}
