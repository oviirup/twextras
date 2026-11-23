"use client";

import { toSentenceCase } from "@oviirup/utils/string";
import { useState, useTransition } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Icons } from "@/lib/icons";
import { UserRow } from "./table";

// delete-user-modal --->

function DeleteUserModal({ user, open, onOpenChange, onSubmit }: DeleteUserModal.Props) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleDelete = () => {
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
            onClick={handleDelete}>
            {isPending ? <Icons.Loading className="size-4 motion-safe:animate-spin" /> : null}
            Delete permanently
          </Button>
        </Alert.Footer>
      </Alert.Content>
    </Alert.Root>
  );
}
namespace DeleteUserModal {
  export type Props = {
    user: UserRow;
    open: boolean;
    onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
    onSubmit: () => Promise<string | null>;
  };
}

type UseConfirmDeleteUserProps = {
  user: UserRow;
  onSubmit: DeleteUserModal.Props["onSubmit"];
};

export function useConfirmDeleteUser({ user, onSubmit }: UseConfirmDeleteUserProps) {
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);

  // biome-ignore lint/correctness/noComponentHookFactories: confirmation modal factory pattern
  const Modal = () => (
    <DeleteUserModal user={user} open={open} onOpenChange={setOpen} onSubmit={onSubmit} />
  );

  return { Modal, open: openModal };
}
