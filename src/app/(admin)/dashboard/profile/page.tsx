import { format } from "date-fns";
import { redirect } from "next/navigation";
import { ProfileDetails } from "@/components/admin/profile/details";
import { ProfileSecurity } from "@/components/admin/profile/security";
import { ProfileSessions } from "@/components/admin/profile/sessions";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Icons } from "@/lib/icons";
import { getSession, getUserSessions } from "@/modules/auth/session";
import { getUserWithAccounts } from "@/modules/users/service";
import { UserStatus } from "@/prisma/generated/enums";

export default async function ProfilePage() {
  const session = await getSession();
  if (!session?.user) redirect("/dashboard/signin");
  const user = await getUserWithAccounts(session.user.id);
  if (!user) redirect("/dashboard/signin");
  const sessions = await getUserSessions();

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
              <span>Member since {format(new Date(user.createdAt), "dd/MM/yyyy")}</span>
            </div>
          </Card.Content>
        </Card.Root>

        <Card.Root>
          <Card.Header>
            <Card.Title>Profile details</Card.Title>
            <Card.Description>Update your name and username.</Card.Description>
          </Card.Header>
          <Card.Content>
            <ProfileDetails user={{ name: user.name, username: user.username }} />
          </Card.Content>
        </Card.Root>

        <Card.Root>
          <Card.Header>
            <Card.Title>Profile security</Card.Title>
            <Card.Description>Manage sign-in methods and password.</Card.Description>
          </Card.Header>
          <Card.Content>
            <ProfileSecurity googleLinked={googleLinked} />
          </Card.Content>
        </Card.Root>

        <Card.Root>
          <Card.Header>
            <Card.Title>Active sessions</Card.Title>
            <Card.Description>Devices currently signed in to your account.</Card.Description>
          </Card.Header>
          <Card.Content>
            <ProfileSessions sessions={sessions} currentToken={session.session.token} />
          </Card.Content>
        </Card.Root>
      </div>
    </div>
  );
}
