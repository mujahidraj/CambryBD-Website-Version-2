"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getEnglishTests() {
    return prisma.englishTestRequirement.findMany({ include: { university: true }, orderBy: { testName: "asc" } });
}

export async function createEnglishTest(data: { testName: string; minimumScore: string; acceptsMOI?: boolean; notes?: string; universityId: string }) {
    const e = await prisma.englishTestRequirement.create({ data });
    revalidatePath("/admin/english-tests");
    return e;
}

export async function updateEnglishTest(id: string, data: { testName?: string; minimumScore?: string; acceptsMOI?: boolean; notes?: string; universityId?: string }) {
    const e = await prisma.englishTestRequirement.update({ where: { id }, data });
    revalidatePath("/admin/english-tests");
    return e;
}

export async function deleteEnglishTest(id: string) {
    await prisma.englishTestRequirement.delete({ where: { id } });
    revalidatePath("/admin/english-tests");
}
