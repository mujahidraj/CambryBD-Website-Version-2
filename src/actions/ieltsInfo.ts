"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const supportedIELTSInfoFields = new Set(
    prisma._runtimeDataModel.models.IELTSInfo?.fields.map((f) => f.name) ?? []
);

function pickSupportedIELTSFields(data: Record<string, unknown>) {
    return Object.fromEntries(
        Object.entries(data).filter(([key, value]) => supportedIELTSInfoFields.has(key) && value !== undefined)
    );
}

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
    testProvider: string;
    offeringType: string;
    testType: string;
    moduleType?: string;
    description: string;
    fee: string;
    venue: string;
    duration?: string;
    classMode?: string;
    targetScore?: string;
    seats?: number;
    requirements: string;
    nextDate?: string;
    registrationOpenUntil?: string;
    ctaLabel?: string;
    ctaUrl?: string;
    notes?: string;
    imageUrl?: string;
    isActive?: boolean;
}) {
    const normalized = {
        ...data,
        seats: data.seats ?? null,
        nextDate: data.nextDate ? new Date(data.nextDate) : null,
        registrationOpenUntil: data.registrationOpenUntil ? new Date(data.registrationOpenUntil) : null,
    };

    const info = await prisma.iELTSInfo.create({
        data: pickSupportedIELTSFields(normalized),
    });
    revalidatePath("/admin/ielts-booking");
    revalidatePath("/ielts-booking");
    return info;
}

export async function updateIELTSInfo(id: string, data: {
    testProvider?: string;
    offeringType?: string;
    testType?: string;
    moduleType?: string;
    description?: string;
    fee?: string;
    venue?: string;
    duration?: string;
    classMode?: string;
    targetScore?: string;
    seats?: number;
    requirements?: string;
    nextDate?: string;
    registrationOpenUntil?: string;
    ctaLabel?: string;
    ctaUrl?: string;
    notes?: string;
    imageUrl?: string;
    isActive?: boolean;
}) {
    const normalized = {
        ...data,
        seats: typeof data.seats === "number" ? data.seats : undefined,
        nextDate: data.nextDate ? new Date(data.nextDate) : undefined,
        registrationOpenUntil: data.registrationOpenUntil ? new Date(data.registrationOpenUntil) : undefined,
    };

    const info = await prisma.iELTSInfo.update({
        where: { id },
        data: pickSupportedIELTSFields(normalized),
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
