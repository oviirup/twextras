import { Empty } from "@/components/ui/empty";
import { Icons } from "@/lib/icons";

export default function UsersPage() {
  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <Empty.Root className="max-w-sm">
        <Empty.Header>
          <Empty.Media variant="icon">
            <Icons.Users />
          </Empty.Media>
          <Empty.Title>Users</Empty.Title>
          <Empty.Description>Manage member roles and approval status.</Empty.Description>
        </Empty.Header>
      </Empty.Root>
    </div>
  );
}
