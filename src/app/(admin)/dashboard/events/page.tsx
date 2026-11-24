import { CreateEvent } from "@/components/admin/events/manage.modal";
import { EventsTable } from "@/components/admin/events/table";
import { Empty } from "@/components/ui/empty";
import { Icons } from "@/lib/icons";
import { requireActiveUser } from "@/modules/auth/guards";
import { hasAnyRole } from "@/modules/auth/utils";
import { listEvents } from "@/modules/events/service";

export default async function EventsPage() {
  const user = await requireActiveUser();
  const events = await listEvents();

  const isEmptyEvents = events.length === 0;
  const canPublish = hasAnyRole(user, ["super_admin", "admin", "manager"]);

  return (
    <div className="flex flex-1 flex-col gap-4 p-6">
      <div className="flex flex-col items-start justify-between gap-3 md:flex-row">
        <div>
          <h1 className="text-lg font-semibold">Events</h1>
          <p className="text-sm text-muted-foreground">
            Create and manage upcoming events, workshops, and community gatherings.
          </p>
        </div>
        <CreateEvent
          canPublish={canPublish}
          className="aria-hidden:hidden"
          aria-hidden={isEmptyEvents}
        />
      </div>
      {events.length === 0 ? (
        <Empty.Root>
          <Empty.Header>
            <Empty.Media variant="icon">
              <Icons.Calendar />
            </Empty.Media>
            <Empty.Title>No events yet</Empty.Title>
            <Empty.Description>
              Create and manage upcoming events, workshops, and community gatherings.
            </Empty.Description>
          </Empty.Header>
          <Empty.Content>
            <CreateEvent canPublish={canPublish} title="Create new Event" size="base" />
          </Empty.Content>
        </Empty.Root>
      ) : (
        <EventsTable
          canPublish={canPublish}
          events={events.map((event) => ({
            ...event,
            eventDate: event.eventDate.toISOString(),
          }))}
        />
      )}
    </div>
  );
}
