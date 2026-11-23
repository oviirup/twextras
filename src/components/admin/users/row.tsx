"use client";

import { toSentenceCase } from "@oviirup/utils/string";
import { format } from "date-fns";
import { Table } from "@/components/ui/table";
import { cn, cva } from "@/lib/utils";
import type { UserStatus } from "@/prisma/generated/enums";
import { useUserRow } from "./context";
import { ModifyUser } from "./modify";

// user-table-row --->

function formatDate(date: string) {
  return format(new Date(date), "dd/MM/yyyy");
}

function UserTableRow() {
  const user = useUserRow();

  return (
    <Table.Row className="*:[td]:shrink-0">
      <Table.Cell className="font-medium">
        <span className="line-clamp-1 w-full">{user.name}</span>
      </Table.Cell>
      <Table.Cell>
        <span className="line-clamp-1 w-full">{user.username}</span>
      </Table.Cell>
      <Table.Cell>
        <span className="line-clamp-1 w-full">{user.email}</span>
      </Table.Cell>
      <Table.Cell>{toSentenceCase(user.role)}</Table.Cell>
      <Table.Cell>
        <UserStatusChip />
      </Table.Cell>
      <Table.Cell className="tabular-nums">{formatDate(user.createdAt)}</Table.Cell>
      <Table.Cell className="sticky right-0 text-right">
        <div className="absolute inset-0 -left-4 bg-linear-to-l from-card from-85% to-transparent" />
        <ModifyUser />
      </Table.Cell>
    </Table.Row>
  );
}

// user-status-chip --->

const statusChipVariants = cva({
  base: "inline-flex items-center rounded-md px-2 py-0.5 text-sm font-medium",
  variants: {
    status: {
      active: "bg-green-200 text-green-800",
      terminated: "bg-red-200 text-red-800",
      pending: "bg-blue-100 text-blue-900",
    } satisfies Record<UserStatus, string>,
  },
});

function UserStatusChip({ className, ...props }: UserStatusChip.Props) {
  const { status } = useUserRow();
  return (
    <span className={cn(statusChipVariants({ status }), className)} {...props}>
      {toSentenceCase(status)}
    </span>
  );
}
namespace UserStatusChip {
  export type Props = React.ComponentProps<"span">;
}

// exports --->

export { UserTableRow };
