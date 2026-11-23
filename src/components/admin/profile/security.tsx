"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { linkSocial } from "@/lib/auth/client";
import { Icons } from "@/lib/icons";

// profile-security --->

function ProfileSecurity({ googleLinked }: ProfileSecurity.Props) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleConnectGoogle() {
    setPending(true);
    setError(null);
    const { error } = await linkSocial({
      provider: "google",
      callbackURL: "/dashboard/profile",
    });
    if (error) {
      setError(error.message ?? "Could not connect Google account");
      setPending(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Icons.Google className="size-5" />
          <div className="flex flex-col">
            <span className="text-sm font-medium">Google</span>
            <span className="text-xs text-muted-foreground">
              {googleLinked ? "Connected" : "Not connected"}
            </span>
          </div>
        </div>
        {googleLinked ? (
          <Icons.Check className="size-4 text-green-600" />
        ) : (
          <Button variant="outline" size="sm" disabled={pending} onClick={handleConnectGoogle}>
            {pending ? <Icons.Loading className="size-4 motion-safe:animate-spin" /> : null}
            Connect
          </Button>
        )}
      </div>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Icons.Lock className="size-5" />
          <div className="flex flex-col">
            <span className="text-sm font-medium">Password</span>
            <span className="text-xs text-muted-foreground">Update your password</span>
          </div>
        </div>
        <Button variant="outline" size="sm" disabled>
          Change password
        </Button>
      </div>
    </div>
  );
}
namespace ProfileSecurity {
  export type Props = { googleLinked: boolean };
}

// exports --->

export { ProfileSecurity };
