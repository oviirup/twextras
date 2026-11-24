"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { toSentenceCase } from "@oviirup/utils/string";
import { format, parseISO } from "date-fns";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Date as DatePicker } from "@/components/ui/date";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Radio } from "@/components/ui/radio";
import { Sheet } from "@/components/ui/sheet";
import { Icons } from "@/lib/icons";
import { createEventAction, deleteEventAction, updateEventAction } from "@/modules/events/actions";
import { EventStatus } from "@/prisma/generated/enums";
import { useConfirmDeleteEvent } from "./confirm-delete-modal";
import type { EventRow } from "./table";

const STATUS_OPTIONS = Object.values(EventStatus).map((value) => ({
  value: value,
  label: toSentenceCase(value),
}));

const eventFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  venue: z.string().trim().min(1, "Venue is required"),
  eventDate: z.iso.date("Enter a valid date"),
  eventTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Enter a valid time"),
  organizerName: z.string().trim().max(120),
  organizerContact: z.string().trim().max(120),
  status: z.enum(EventStatus),
});
type EventFormValues = z.infer<typeof eventFormSchema>;

const EMPTY_VALUES: EventFormValues = {
  name: "",
  venue: "",
  eventDate: "",
  eventTime: "",
  organizerName: "",
  organizerContact: "",
  status: EventStatus.draft,
};

// event-form-sheet --->

function EventFormSheet({
  event,
  canPublish,
  title,
  trigger,
  triggerVariant,
  triggerSize,
}: EventFormSheet.Props) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: event
      ? {
          name: event.name,
          venue: event.venue,
          eventDate: event.eventDate.slice(0, 10),
          eventTime: event.eventTime,
          organizerName: event.organizerName ?? "",
          organizerContact: event.organizerContact ?? "",
          status: event.status,
        }
      : { ...EMPTY_VALUES, status: canPublish ? EventStatus.published : EventStatus.draft },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setError(null);
    startTransition(async () => {
      const result = event
        ? await updateEventAction(event.id, { ...values })
        : await createEventAction({ ...values });
      if ("error" in result && result.error) {
        setError(result.error);
        return;
      }
      setOpen(false);
      router.refresh();
    });
  });

  const { Modal: DeleteEventModal, open: openDeleteModal } = useConfirmDeleteEvent({
    event,
    onSubmit: async () => {
      if (!event) return "Event not found";
      const result = await deleteEventAction(event.id);
      if ("error" in result && result.error) return result.error;
      setOpen(false);
      router.refresh();
      return null;
    },
  });

  return (
    <Sheet.Root open={open} onOpenChange={setOpen}>
      <Sheet.Trigger render={<Button variant={triggerVariant} size={triggerSize ?? "sm"} />}>
        {trigger}
      </Sheet.Trigger>
      <Sheet.Content>
        <Sheet.Header>
          <Sheet.Title>{title}</Sheet.Title>
        </Sheet.Header>
        <div className="scrollbar-thinflex-col flex gap-6 overflow-y-auto px-6">
          <Form.Root
            formContext={form}
            id="event-form"
            onSubmit={onSubmit}
            className="flex flex-col gap-4">
            <Form.Group className="**:slot-field-label:mx-1 **:slot-field-description:mx-1">
              <Form.Control
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Form.Field>
                    <Form.Label>Event name</Form.Label>
                    <Input {...field} aria-invalid={fieldState.invalid} />
                    <Form.Error />
                  </Form.Field>
                )}
              />
              <Form.Control
                name="venue"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Form.Field>
                    <Form.Label>Venue</Form.Label>
                    <Input {...field} aria-invalid={fieldState.invalid} />
                    <Form.Error />
                  </Form.Field>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <Form.Control
                  name="eventDate"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Form.Field>
                      <Form.Label>Date</Form.Label>
                      <DatePicker
                        value={field.value ? parseISO(field.value) : null}
                        onChange={(day) => field.onChange(format(day, "yyyy-MM-dd"))}
                        aria-invalid={fieldState.invalid}
                      />
                      <Form.Error />
                    </Form.Field>
                  )}
                />
                <Form.Control
                  name="eventTime"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Form.Field>
                      <Form.Label>Time</Form.Label>
                      <Input {...field} type="time" aria-invalid={fieldState.invalid} />
                      <Form.Error />
                    </Form.Field>
                  )}
                />
              </div>
              <Form.Control
                name="organizerName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Form.Field>
                    <Form.Label>Organizer name</Form.Label>
                    <Input {...field} aria-invalid={fieldState.invalid} />
                    <Form.Description>Optional</Form.Description>
                    <Form.Error />
                  </Form.Field>
                )}
              />
              <Form.Control
                name="organizerContact"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Form.Field>
                    <Form.Label>Organizer contact</Form.Label>
                    <Input {...field} aria-invalid={fieldState.invalid} />
                    <Form.Description>Optional, for further notices</Form.Description>
                    <Form.Error />
                  </Form.Field>
                )}
              />
              {canPublish ? (
                <Form.Control
                  name="status"
                  control={form.control}
                  render={({ field }) => (
                    <Form.Field>
                      <Form.Label>Status</Form.Label>
                      <Radio.Root
                        value={field.value}
                        onValueChange={(value) => field.onChange(value)}>
                        {STATUS_OPTIONS.map((option) => (
                          <div key={`status-${option.value}`} className="flex items-center gap-2">
                            <Radio.Item value={option.value} id={`status-${option.value}`} />
                            <Label htmlFor={`status-${option.value}`}>{option.label}</Label>
                          </div>
                        ))}
                      </Radio.Root>
                    </Form.Field>
                  )}
                />
              ) : null}
            </Form.Group>
            {error ? <Form.Error>{error}</Form.Error> : null}
          </Form.Root>

          <div>
            {event ? (
              <Button
                type="button"
                variant="ghost"
                size="lg"
                className="border border-destructive/25 text-destructive"
                onClick={openDeleteModal}>
                Delete event
              </Button>
            ) : null}
          </div>
        </div>

        <Sheet.Footer className="mt-auto flex-row items-center justify-between gap-2">
          <div className="flex flex-1 justify-end gap-2">
            <Sheet.Close render={<Button variant="outline" size="lg" icon />}>
              <span className="sr-only">Cancel</span>
              <Icons.Close />
            </Sheet.Close>
            <Button
              type="submit"
              form="event-form"
              size="lg"
              disabled={isPending}
              className="flex-1 justify-between">
              {isPending ? <Icons.Loading className="size-4 motion-safe:animate-spin" /> : null}
              {event ? "Save changes" : "Create event"}
              <Icons.Check />
            </Button>
          </div>
        </Sheet.Footer>
        <DeleteEventModal />
      </Sheet.Content>
    </Sheet.Root>
  );
}
namespace EventFormSheet {
  export type Props = {
    event?: EventRow;
    canPublish: boolean;
    title: string;
    trigger: React.ReactNode;
    triggerVariant?: Button.Props["variant"];
    triggerSize?: Button.Props["size"];
  };
}

// add-event --->

function AddEvent({ canPublish, trigger }: AddEvent.Props) {
  return (
    <EventFormSheet
      canPublish={canPublish}
      title="Add Event"
      trigger={
        trigger ?? (
          <>
            <Icons.Plus />
            Add event
          </>
        )
      }
    />
  );
}
namespace AddEvent {
  export type Props = { canPublish: boolean; trigger?: React.ReactNode };
}

// exports --->

export { AddEvent, EventFormSheet };
