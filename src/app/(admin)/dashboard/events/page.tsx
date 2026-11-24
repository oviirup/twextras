import { AddEvent } from "@/components/admin/events/modify";
import { EventsTable } from "@/components/admin/events/table";
import { Empty } from "@/components/ui/empty";
import { Icons } from "@/lib/icons";
import { requireActiveUser } from "@/modules/auth/guards";
import { listEvents } from "@/modules/events/service";
import { UserRole } from "@/prisma/generated/enums";

export default async function EventsPage() {
  const user = await requireActiveUser();
  const events = await listEvents();
  const canPublish = user.role === UserRole.super_admin || user.role === UserRole.admin;

  return (
    <div className="flex flex-1 flex-col gap-4 p-6">
      <div className="flex flex-col items-start justify-between gap-3 md:flex-row">
        <div>
          <h1 className="text-lg font-semibold">Events</h1>
          <p className="text-sm text-muted-foreground">
            Create and manage upcoming events, workshops, and community gatherings.
          </p>
        </div>
        <AddEvent canPublish={canPublish} />
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
            <AddEvent
              canPublish={canPublish}
              trigger={
                <>
                  <Icons.Plus />
                  Create New Event
                </>
              }
            />
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
