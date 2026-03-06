"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getAnnouncements() {
    return prisma.announcement.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getActiveAnnouncements() {
    return prisma.announcement.findMany({ where: { isActive: true }, orderBy: { createdAt: "desc" } });
}

export async function createAnnouncement(data: { title: string; content: string; type: string }) {
    const ann = await prisma.announcement.create({ data });
    revalidatePath("/admin/announcements");
    return ann;
}

export async function updateAnnouncement(id: string, data: { title?: string; content?: string; type?: string; isActive?: boolean }) {
    const ann = await prisma.announcement.update({ where: { id }, data });
    revalidatePath("/admin/announcements");
    return ann;
}

export async function deleteAnnouncement(id: string) {
    await prisma.announcement.delete({ where: { id } });
    revalidatePath("/admin/announcements");
}
