import { Empty } from "@/components/ui/empty";
import { Icons } from "@/lib/icons";
import { requireActiveUser } from "@/modules/auth/guards";

export default async function SettingsPage() {
  await requireActiveUser();
  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <Empty.Root className="max-w-sm">
        <Empty.Header>
          <Empty.Media variant="icon">
            <Icons.Settings />
          </Empty.Media>
          <Empty.Title>Settings</Empty.Title>
          <Empty.Description>
            Configure dashboard preferences, integrations, and account options.
          </Empty.Description>
        </Empty.Header>
      </Empty.Root>
    </div>
  );
}
