"use client";

import { toSentenceCase } from "@oviirup/utils/string";
import { useState, useTransition } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { UserRow } from "./table";

// delete-user-modal --->

function RemoveUser_Modal({ user, open, onOpenChange, onSubmit }: RemoveUser_Modal.Props) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const onRemove = () => {
    setError(null);
    startTransition(async () => {
      const result = await onSubmit();
      if (result) {
        setError(result);
        return;
      }
      onOpenChange(false);
    });
  };

  return (
    <Alert.Root open={open} onOpenChange={onOpenChange}>
      <Alert.Content>
        <Alert.Header>
          <Alert.Title>Delete user</Alert.Title>
          <Alert.Description>
            Are you sure you want to delete the user?
            <br />
            This action cannot be undone
          </Alert.Description>
        </Alert.Header>
        <div className="rounded-lg text-sm">
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
            <dt className="text-muted-foreground">Name</dt>
            <dd className="truncate">{user.name}</dd>
            <dt className="text-muted-foreground">Username</dt>
            <dd className="truncate">{user.username}</dd>
            <dt className="text-muted-foreground">Email</dt>
            <dd className="truncate">{user.email}</dd>
            <dt className="text-muted-foreground">Role</dt>
            <dd>{toSentenceCase(user.role)}</dd>
          </dl>
        </div>
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
        <Alert.Footer>
          <Alert.Close render={<Button variant="outline" disabled={isPending} />}>
            Cancel
          </Alert.Close>
          <Button
            variant="outline"
            className="text-destructive"
            disabled={isPending}
            onClick={onRemove}>
            Delete permanently
          </Button>
        </Alert.Footer>
      </Alert.Content>
    </Alert.Root>
  );
}
namespace RemoveUser_Modal {
  export type Props = {
    user: UserRow;
    open: boolean;
    onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
    onSubmit: () => Promise<string | null>;
  };
}

function useRemoveUser({ user, onSubmit }: useRemoveUser.Options) {
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);

  // biome-ignore lint/correctness/noComponentHookFactories: confirmation modal factory pattern
  const Modal = () => (
    <RemoveUser_Modal user={user} open={open} onOpenChange={setOpen} onSubmit={onSubmit} />
  );

  return { Modal, open: openModal };
}
namespace useRemoveUser {
  export type Options = {
    user: UserRow;
    onSubmit: RemoveUser_Modal.Props["onSubmit"];
  };
}

// exports --->

export { useRemoveUser };
