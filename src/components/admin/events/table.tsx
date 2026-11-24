"use client";

import { Table } from "@/components/ui/table";
import type { EventStatus } from "@/prisma/generated/enums";
import { EventRowContext } from "./context";
import { EventTableRow } from "./row";

export type EventRow = {
  id: string;
  name: string;
  venue: string;
  eventDate: string;
  eventTime: string;
  organizerName: string | null;
  organizerContact: string | null;
  status: EventStatus;
};

// events-table --->

function EventsTable({ events, canPublish }: EventsTable.Props) {
  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.Head className="min-w-40">Name</Table.Head>
          <Table.Head className="min-w-40">Venue</Table.Head>
          <Table.Head className="min-w-32">Date</Table.Head>
          <Table.Head className="min-w-28">Time</Table.Head>
          <Table.Head className="min-w-36">Organizer</Table.Head>
          <Table.Head className="min-w-40">Contact</Table.Head>
          <Table.Head className="min-w-28">Status</Table.Head>
          <Table.Head />
        </Table.Row>
      </Table.Header>
      <Table.Body className="**:[td]:wrap-anywhere">
        {events.map((event) => (
          <EventRowContext.Provider key={event.id} value={event}>
            <EventTableRow canPublish={canPublish} />
          </EventRowContext.Provider>
        ))}
      </Table.Body>
    </Table.Root>
  );
}
namespace EventsTable {
  export type Props = { events: EventRow[]; canPublish: boolean };
}

// exports --->

export { EventsTable };
