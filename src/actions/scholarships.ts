"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getScholarships() {
    return prisma.scholarship.findMany({ include: { university: { include: { country: true } } }, orderBy: { createdAt: "desc" } });
}

export async function createScholarship(data: {
    name: string;
    amount: string;
    description: string;
    criteria?: string;
    deadline?: Date;
    universityId: string;
}) {
    const s = await prisma.scholarship.create({ data });
    revalidatePath("/admin/scholarships");
    return s;
}

export async function updateScholarship(id: string, data: {
    name?: string;
    amount?: string;
    description?: string;
    criteria?: string;
    deadline?: Date | null;
    universityId?: string;
}) {
    const s = await prisma.scholarship.update({ where: { id }, data });
    revalidatePath("/admin/scholarships");
    return s;
}

export async function deleteScholarship(id: string) {
    await prisma.scholarship.delete({ where: { id } });
    revalidatePath("/admin/scholarships");
}
