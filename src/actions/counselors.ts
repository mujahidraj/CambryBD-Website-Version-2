"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getCounselors() {
    return prisma.counselor.findMany({
        where: { isActive: true },
        orderBy: { createdAt: "desc" },
    });
}

export async function getAllCounselors() {
    return prisma.counselor.findMany({ orderBy: { createdAt: "desc" } });
}

export async function createCounselor(data: {
    name: string;
    role: string;
    bio: string;
    imageUrl: string;
    email?: string;
    phone?: string;
}) {
    const counselor = await prisma.counselor.create({ data });
    revalidatePath("/admin/counselors");
    return counselor;
}

export async function updateCounselor(id: string, data: {
    name?: string;
    role?: string;
    bio?: string;
    imageUrl?: string;
    email?: string;
    phone?: string;
    isActive?: boolean;
}) {
    const counselor = await prisma.counselor.update({ where: { id }, data });
    revalidatePath("/admin/counselors");
    return counselor;
}

export async function deleteCounselor(id: string) {
    await prisma.counselor.delete({ where: { id } });
    revalidatePath("/admin/counselors");
}
