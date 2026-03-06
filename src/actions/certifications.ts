"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getCertifications() {
    return prisma.certification.findMany({
        orderBy: { createdAt: "desc" },
    });
}

export async function getActiveCertifications() {
    return prisma.certification.findMany({
        where: { isActive: true },
        orderBy: { dateIssued: "desc" },
    });
}

export async function createCertification(data: {
    title: string;
    issuingBody: string;
    description: string;
    imageUrl: string;
    dateIssued?: string;
    isActive?: boolean;
}) {
    const cert = await prisma.certification.create({
        data: {
            ...data,
            dateIssued: data.dateIssued ? new Date(data.dateIssued) : null,
        },
    });
    revalidatePath("/admin/certifications");
    revalidatePath("/certifications");
    return cert;
}

export async function updateCertification(id: string, data: {
    title?: string;
    issuingBody?: string;
    description?: string;
    imageUrl?: string;
    dateIssued?: string;
    isActive?: boolean;
}) {
    const cert = await prisma.certification.update({
        where: { id },
        data: {
            ...data,
            dateIssued: data.dateIssued ? new Date(data.dateIssued) : undefined,
        },
    });
    revalidatePath("/admin/certifications");
    revalidatePath("/certifications");
    return cert;
}

export async function deleteCertification(id: string) {
    await prisma.certification.delete({ where: { id } });
    revalidatePath("/admin/certifications");
    revalidatePath("/certifications");
}
