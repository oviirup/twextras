import { UsersTable } from "@/components/admin/users/table";
import { Empty } from "@/components/ui/empty";
import { Icons } from "@/lib/icons";
import { requireRole } from "@/modules/auth/guards";
import { listUsers } from "@/modules/users/service";

export default async function UsersPage() {
  await requireRole(["super_admin", "admin"]);
  const users = await listUsers();

  return (
    <div className="flex flex-1 flex-col gap-4 p-6">
      <div>
        <h1 className="text-lg font-semibold">Users</h1>
        <p className="text-sm text-muted-foreground">Review sign-ups and manage account status.</p>
      </div>
      {users.length === 0 ? (
        <Empty.Root>
          <Empty.Header>
            <Empty.Media variant="icon">
              <Icons.Users />
            </Empty.Media>
            <Empty.Title>No users yet</Empty.Title>
            <Empty.Description>New sign-ups will appear here for review.</Empty.Description>
          </Empty.Header>
        </Empty.Root>
      ) : (
        <UsersTable
          users={users.map((user) => ({ ...user, createdAt: user.createdAt.toISOString() }))}
        />
      )}
    </div>
  );
}
