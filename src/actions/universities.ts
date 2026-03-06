"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getTopUniversities(limit: number = 6) {
    return prisma.university.findMany({
        take: limit,
        include: {
            country: true,
        },
        orderBy: { createdAt: "desc" },
    });
}

export async function getUniversityBySlug(slug: string) {
    return prisma.university.findUnique({
        where: { slug },
        include: {
            country: true,
            courses: true,
            englishReqs: true,
            scholarships: true,
        },
    });
}

export async function getAllUniversities() {
    return prisma.university.findMany({
        include: { country: true, courses: true },
        orderBy: { name: "asc" },
    });
}

export async function createUniversity(data: {
    name: string;
    slug: string;
    location: string;
    tuitionEstimate: string;
    description: string;
    imageUrl: string;
    website?: string;
    ranking?: string;
    countryId: string;
}) {
    const uni = await prisma.university.create({ data });
    revalidatePath("/admin/universities");
    return uni;
}

export async function updateUniversity(id: string, data: {
    name?: string;
    slug?: string;
    location?: string;
    tuitionEstimate?: string;
    description?: string;
    imageUrl?: string;
    website?: string;
    ranking?: string;
    countryId?: string;
}) {
    const uni = await prisma.university.update({ where: { id }, data });
    revalidatePath("/admin/universities");
    return uni;
}

export async function deleteUniversity(id: string) {
    await prisma.university.delete({ where: { id } });
    revalidatePath("/admin/universities");
}
