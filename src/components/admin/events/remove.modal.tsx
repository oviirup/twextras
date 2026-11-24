"use client";

import { useState, useTransition } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import type { EventRow } from "./table";

// delete-event-modal --->

function RemoveEvent_Modal({ event, open, onOpenChange, onSubmit }: RemoveEvent_Modal.Props) {
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
          <Alert.Title>Delete event</Alert.Title>
          <Alert.Description>
            Are you sure you want to delete &quot;{event.name}&quot;?
            <br />
            This action cannot be undone
          </Alert.Description>
        </Alert.Header>
        <div className="rounded-lg text-sm">
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
            <dt className="text-muted-foreground">Name</dt>
            <dd className="truncate">{event.name}</dd>
            <dt className="text-muted-foreground">Venue</dt>
            <dd className="truncate">{event.venue}</dd>
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
            Delete permanently
          </Button>
        </Alert.Footer>
      </Alert.Content>
    </Alert.Root>
  );
}
namespace RemoveEvent_Modal {
  export type Props = {
    event: EventRow;
    open: boolean;
    onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
    onSubmit: () => Promise<string | null>;
  };
}

function useRemoveEvent({ event, onSubmit }: useRemoveEvent.Options) {
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);

  // biome-ignore lint/correctness/noComponentHookFactories: confirmation modal factory pattern
  const Modal = () =>
    event ? (
      <RemoveEvent_Modal event={event} open={open} onOpenChange={setOpen} onSubmit={onSubmit} />
    ) : null;

  return { Modal, open: openModal };
}
namespace useRemoveEvent {
  export type Options = {
    event?: EventRow;
    onSubmit: RemoveEvent_Modal.Props["onSubmit"];
  };
}

// exports --->

export { useRemoveEvent };
