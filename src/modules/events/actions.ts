"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireRole } from "@/modules/auth/guards";
import { EventStatus, UserRole } from "@/prisma/generated/enums";
import { createEvent, deleteEvent, getEventById, updateEvent } from "./service";

const MANAGE_ROLES = [UserRole.super_admin, UserRole.admin, UserRole.manager, UserRole.employee];

const PUBLISH_ROLES: UserRole[] = [UserRole.super_admin, UserRole.admin];

const eventSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  venue: z.string().trim().min(1, "Venue is required"),
  eventDate: z.iso.date("Enter a valid date"),
  eventTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Enter a valid time"),
  organizerName: z.string().trim().max(120).optional(),
  organizerContact: z.string().trim().max(120).optional(),
  status: z.enum(EventStatus).optional(),
});

function toEventData(parsed: z.infer<typeof eventSchema>) {
  return {
    name: parsed.name,
    venue: parsed.venue,
    eventDate: new Date(parsed.eventDate),
    eventTime: parsed.eventTime,
    organizerName: parsed.organizerName || null,
    organizerContact: parsed.organizerContact || null,
  };
}

export async function createEventAction(data: unknown) {
  const actor = await requireRole(MANAGE_ROLES);

  const parsed = eventSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const canPublish = PUBLISH_ROLES.includes(actor.role);
  const status = canPublish ? (parsed.data.status ?? EventStatus.published) : EventStatus.draft;

  await createEvent({ ...toEventData(parsed.data), status });

  revalidatePath("/dashboard/events");
  return { success: true };
}

export async function updateEventAction(eventId: string, data: unknown) {
  const actor = await requireRole(MANAGE_ROLES);

  const target = await getEventById(eventId);
  if (!target) return { error: "Event not found" };

  const parsed = eventSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const canPublish = PUBLISH_ROLES.includes(actor.role);
  const status = canPublish ? parsed.data.status : undefined;

  await updateEvent(eventId, { ...toEventData(parsed.data), status });

  revalidatePath("/dashboard/events");
  return { success: true };
}

export async function deleteEventAction(eventId: string) {
  await requireRole(MANAGE_ROLES);

  const target = await getEventById(eventId);
  if (!target) return { error: "Event not found" };

  await deleteEvent(eventId);

  revalidatePath("/dashboard/events");
  return { success: true };
}
