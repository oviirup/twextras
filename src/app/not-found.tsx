import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/ui/empty";
import { Link } from "@/components/ui/link";
import { Icons } from "@/lib/icons";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center px-4">
      <Empty.Root className="max-w-md">
        <Empty.Header>
          <Empty.Media variant="icon">
            <Icons.AlertCircle />
          </Empty.Media>
          <Empty.Title>Page not found</Empty.Title>
          <Empty.Description>
            The page you are looking for does not exist, or has been moved.
          </Empty.Description>
        </Empty.Header>
        <Empty.Content>
          <Button render={<Link href="/" />} nonNative>
            <Icons.ArrowLeft />
            Return to homepage
          </Button>
        </Empty.Content>
      </Empty.Root>
    </main>
  );
}
