import { Empty } from "@/components/ui/empty";
import { Icons } from "@/lib/icons";

export default function BooksPage() {
  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <Empty.Root className="max-w-sm">
        <Empty.Header>
          <Empty.Media variant="icon">
            <Icons.BookOpen />
          </Empty.Media>
          <Empty.Title>Books</Empty.Title>
          <Empty.Description>
            Publish and organize books, articles, and spiritual literature.
          </Empty.Description>
        </Empty.Header>
      </Empty.Root>
    </div>
  );
}
