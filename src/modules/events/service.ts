import { prisma } from "@/lib/db/prisma";
import { EventStatus } from "@/prisma/generated/enums";

const EVENT_SELECT = {
  id: true,
  name: true,
  venue: true,
  eventDate: true,
  eventTime: true,
  organizerName: true,
  organizerContact: true,
  status: true,
} as const;

export type EventData = {
  name: string;
  venue: string;
  eventDate: Date;
  eventTime: string;
  organizerName: string | null;
  organizerContact: string | null;
  status?: EventStatus;
};

export async function listEvents() {
  return prisma.event.findMany({
    orderBy: [{ eventDate: "asc" }, { eventTime: "asc" }],
    select: EVENT_SELECT,
  });
}

export async function getEventById(id: string) {
  return prisma.event.findUnique({ where: { id }, select: EVENT_SELECT });
}

export async function createEvent(data: EventData) {
  return prisma.event.create({ data: { id: crypto.randomUUID(), ...data }, select: EVENT_SELECT });
}

export async function updateEvent(id: string, data: EventData) {
  return prisma.event.update({ where: { id }, data, select: EVENT_SELECT });
}

export async function deleteEvent(id: string) {
  return prisma.event.delete({ where: { id } });
}
