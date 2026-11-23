import { redirect } from "next/navigation";
import { ProfileActions } from "@/components/admin/profile/actions";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Icons } from "@/lib/icons";
import { requireUser } from "@/modules/auth/guards";
import { getUserWithAccounts } from "@/modules/users/service";
import { UserStatus } from "@/prisma/generated/enums";

export default async function ProfilePage() {
  const sessionUser = await requireUser();
  const user = await getUserWithAccounts(sessionUser.id);
  if (!user) redirect("/dashboard/signin");

  const googleLinked = user.accounts.some((account) => account.providerId === "google");

  const initials = user.name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <div className="mx-auto flex w-full max-w-lg flex-col gap-6">
        {user.status === UserStatus.pending ? (
          <div className="flex items-center gap-3 rounded-lg border bg-muted/50 px-4 py-3">
            <Icons.Alert className="size-5 shrink-0" />
            <p className="text-sm">
              Your account is pending review from the admin. You will get full access once approved.
            </p>
          </div>
        ) : null}

        <Card.Root>
          <Card.Content className="flex items-center gap-4">
            <Avatar.Root className="size-16">
              {user.image ? <Avatar.Image src={user.image} alt={user.name} quality={90} /> : null}
              <Avatar.Fallback>{initials || <Icons.User />}</Avatar.Fallback>
            </Avatar.Root>
            <div className="flex flex-col text-sm leading-none text-muted-foreground">
              <div className="flex items-center gap-3 text-foreground">
                <span className="line-clamp-1 text-xl font-semibold">{user.name}</span>
                <span className="w-fit shrink-0 rounded-full border px-2 py-1 text-xs leading-none capitalize">
                  {user.status}
                </span>
              </div>
              <span>{user.email}</span>
              <span>{user.username}</span>
            </div>
          </Card.Content>
        </Card.Root>

        <Card.Root>
          <Card.Header>
            <Card.Title>Account security</Card.Title>
            <Card.Description>Manage sign-in methods and password.</Card.Description>
          </Card.Header>
          <Card.Content>
            <ProfileActions googleLinked={googleLinked} />
          </Card.Content>
        </Card.Root>
      </div>
    </div>
  );
}
