import { Empty } from "@/components/ui/empty";
import { Icons } from "@/lib/icons";
import { requireActiveUser } from "@/modules/auth/guards";

export default async function EventsPage() {
  await requireActiveUser();
  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <Empty.Root className="max-w-sm">
        <Empty.Header>
          <Empty.Media variant="icon">
            <Icons.Calendar />
          </Empty.Media>
          <Empty.Title>Events</Empty.Title>
          <Empty.Description>
            Create and manage upcoming events, workshops, and community gatherings.
          </Empty.Description>
        </Empty.Header>
      </Empty.Root>
    </div>
  );
}
