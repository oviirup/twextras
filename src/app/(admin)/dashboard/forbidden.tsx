import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/ui/empty";
import { Link } from "@/components/ui/link";
import { Icons } from "@/lib/icons";

export const metadata: Metadata = {
  title: "Access denied",
};

export default function Forbidden() {
  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <Empty.Root className="max-w-sm">
        <Empty.Header>
          <Empty.Media variant="icon">
            <Icons.Alert />
          </Empty.Media>
          <Empty.Title>Access denied</Empty.Title>
          <Empty.Description>
            Your account does not have access to this page. Contact an administrator if you believe
            this is a mistake.
          </Empty.Description>
        </Empty.Header>
        <Empty.Content>
          <Button render={<Link href="/dashboard/profile" />} nonNative>
            <Icons.User />
            Go to profile
          </Button>
        </Empty.Content>
      </Empty.Root>
    </div>
  );
}
