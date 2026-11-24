"use client";

import { toSentenceCase } from "@oviirup/utils/string";
import { format, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import { Table } from "@/components/ui/table";
import { Icons } from "@/lib/icons";
import { cn, cva } from "@/lib/utils";
import type { EventStatus } from "@/prisma/generated/enums";
import { useEventRow } from "./context";
import { EventFormSheet } from "./manage.modal";

// event-table-row --->

function formatDate(isoDate: string) {
  return format(parseISO(isoDate.slice(0, 10)), "dd/MM/yyyy");
}

function EventTableRow({ canPublish }: EventTableRow.Props) {
  const event = useEventRow();

  return (
    <Table.Row className="*:[td]:shrink-0">
      <Table.Cell>
        <span className="line-clamp-1 w-full font-medium">{event.name}</span>
      </Table.Cell>
      <Table.Cell>
        <span className="line-clamp-1 w-full">{event.venue}</span>
      </Table.Cell>
      <Table.Cell className="tabular-nums">{formatDate(event.eventDate)}</Table.Cell>
      <Table.Cell className="tabular-nums">{event.eventTime}</Table.Cell>
      <Table.Cell>
        <span className="line-clamp-1 w-full">{event.organizerName ?? "—"}</span>
      </Table.Cell>
      <Table.Cell>
        <span className="line-clamp-1 w-full">{event.organizerContact ?? "—"}</span>
      </Table.Cell>
      <Table.Cell>
        <EventStatusChip />
      </Table.Cell>
      <Table.Cell className="sticky right-0 text-right">
        <div className="absolute inset-0 -left-4 bg-linear-to-l from-card from-80% to-transparent" />
        <EventFormSheet
          event={event}
          canPublish={canPublish}
          title="Modify Event"
          trigger={
            <Button variant="ghost" size="sm">
              <Icons.Edit />
              Modify
            </Button>
          }
        />
      </Table.Cell>
    </Table.Row>
  );
}
namespace EventTableRow {
  export type Props = { canPublish: boolean };
}

// event-status-chip --->

const statusChipVariants = cva({
  base: "inline-flex items-center rounded-md px-2 py-0.5 text-sm font-medium",
  variants: {
    status: {
      draft: "bg-amber-100 text-amber-900",
      published: "bg-green-200 text-green-800",
    } satisfies Record<EventStatus, string>,
  },
});

function EventStatusChip({ className, ...props }: EventStatusChip.Props) {
  const { status } = useEventRow();
  return (
    <span className={cn(statusChipVariants({ status }), className)} {...props}>
      {toSentenceCase(status)}
    </span>
  );
}
namespace EventStatusChip {
  export type Props = React.ComponentProps<"span">;
}

// exports --->

export { EventTableRow };
