"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getIELTSInfo() {
    return prisma.iELTSInfo.findMany({
        orderBy: { createdAt: "desc" },
    });
}

export async function getActiveIELTSInfo() {
    return prisma.iELTSInfo.findMany({
        where: { isActive: true },
        orderBy: { nextDate: "asc" },
    });
}

export async function createIELTSInfo(data: {
    testType: string;
    description: string;
    fee: string;
    venue: string;
    requirements: string;
    nextDate?: string;
    imageUrl?: string;
    isActive?: boolean;
}) {
    const info = await prisma.iELTSInfo.create({
        data: {
            ...data,
            nextDate: data.nextDate ? new Date(data.nextDate) : null,
        },
    });
    revalidatePath("/admin/ielts-booking");
    revalidatePath("/ielts-booking");
    return info;
}

export async function updateIELTSInfo(id: string, data: {
    testType?: string;
    description?: string;
    fee?: string;
    venue?: string;
    requirements?: string;
    nextDate?: string;
    imageUrl?: string;
    isActive?: boolean;
}) {
    const info = await prisma.iELTSInfo.update({
        where: { id },
        data: {
            ...data,
            nextDate: data.nextDate ? new Date(data.nextDate) : undefined,
        },
    });
    revalidatePath("/admin/ielts-booking");
    revalidatePath("/ielts-booking");
    return info;
}

export async function deleteIELTSInfo(id: string) {
    await prisma.iELTSInfo.delete({ where: { id } });
    revalidatePath("/admin/ielts-booking");
    revalidatePath("/ielts-booking");
}
