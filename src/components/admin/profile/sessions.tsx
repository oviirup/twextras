"use client";

import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { UAParser } from "ua-parser-js";
import { Button } from "@/components/ui/button";
import { revokeOtherSessions, revokeSession } from "@/lib/auth/client";
import { Icons } from "@/lib/icons";

type SessionInfo = {
  id: string;
  token: string;
  userAgent?: string | null;
  createdAt: Date;
};

// session-item --->

function SessionItem({ session, isCurrent }: SessionItem.Props) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const { browser, os, device } = UAParser(session.userAgent ?? "");
  const deviceLabel = [browser.name, os.name, device.type].filter(Boolean).join(" · ");

  const handleRevoke = () => {
    setError(null);
    startTransition(async () => {
      const { error } = await revokeSession({ token: session.token });
      if (error) {
        setError(error.message ?? "Could not revoke session");
        return;
      }
      router.refresh();
    });
  };

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <Icons.Computer className="size-5" />
        <div className="flex flex-col">
          <span className="text-sm font-medium">{deviceLabel || "Unknown device"}</span>
          <span className="text-xs text-muted-foreground">
            {format(new Date(session.createdAt), "dd/MM/yyyy HH:mm")}
          </span>
          {error ? <span className="text-xs text-destructive">{error}</span> : null}
        </div>
      </div>
      {isCurrent ? (
        <span className="w-fit shrink-0 rounded-full border px-2 py-1 text-xs leading-none">
          Current device
        </span>
      ) : (
        <Button variant="outline" size="sm" disabled={isPending} onClick={handleRevoke}>
          {isPending ? <Icons.Loading className="size-4 motion-safe:animate-spin" /> : null}
          Revoke
        </Button>
      )}
    </div>
  );
}
namespace SessionItem {
  export type Props = { session: SessionInfo; isCurrent: boolean };
}

// profile-sessions --->

function ProfileSessions({ sessions, currentToken }: ProfileSessions.Props) {
  const router = useRouter();

  const [isPendingOthers, startTransitionOthers] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleRevokeOthers = () => {
    setError(null);
    startTransitionOthers(async () => {
      const { error } = await revokeOtherSessions();
      if (error) {
        setError(error.message ?? "Could not revoke other sessions");
        return;
      }
      router.refresh();
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {sessions.length > 1 ? (
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            disabled={isPendingOthers}
            onClick={handleRevokeOthers}>
            {isPendingOthers ? (
              <Icons.Loading className="size-4 motion-safe:animate-spin" />
            ) : (
              <Icons.Logout />
            )}
            Sign out other sessions
          </Button>
        </div>
      ) : null}
      <div className="flex flex-col gap-3">
        {sessions.map((session) => (
          <SessionItem
            key={session.id}
            session={session}
            isCurrent={session.token === currentToken}
          />
        ))}
      </div>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  );
}
namespace ProfileSessions {
  export type Props = { sessions: SessionInfo[]; currentToken: string };
}

// exports --->

export { ProfileSessions };
