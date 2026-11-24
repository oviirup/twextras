"use client";

import { Table } from "@/components/ui/table";
import type { UserRole, UserStatus } from "@/prisma/generated/enums";
import { UserRowContext } from "./context";
import { UserTableRow } from "./row";

export type UserRow = {
  id: string;
  name: string;
  username: string;
  email: string;
  image: string | null;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
};

// users-table --->

function UsersTable({ actorId, actorRole, users }: UsersTable.Props) {
  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.Head />
          <Table.Head className="min-w-40">Name</Table.Head>
          <Table.Head className="min-w-32">Username</Table.Head>
          <Table.Head className="min-w-48">Email</Table.Head>
          <Table.Head className="min-w-32">Role</Table.Head>
          <Table.Head className="min-w-32">Status</Table.Head>
          <Table.Head className="min-w-32">Joined</Table.Head>
          <Table.Head />
        </Table.Row>
      </Table.Header>
      <Table.Body className="**:[td]:wrap-anywhere">
        {users.map((user) => (
          <UserRowContext.Provider key={user.id} value={user}>
            <UserTableRow isOwnProfile={user.id === actorId} actorRole={actorRole} />
          </UserRowContext.Provider>
        ))}
      </Table.Body>
    </Table.Root>
  );
}
namespace UsersTable {
  export type Props = { actorId: string; actorRole: UserRole; users: UserRow[] };
}

// exports --->

export { UsersTable };
