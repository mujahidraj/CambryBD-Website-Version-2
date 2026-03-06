"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getCountries() {
    return prisma.country.findMany({
        include: {
            universities: true,
        },
        orderBy: { name: "asc" },
    });
}

export async function getCountryBySlug(slug: string) {
    return prisma.country.findUnique({
        where: { slug },
        include: {
            universities: {
                include: {
                    englishReqs: true,
                    scholarships: true,
                    courses: true,
                },
            },
        },
    });
}

export async function getAllCountries() {
    return prisma.country.findMany({ orderBy: { name: "asc" } });
}

export async function createCountry(data: {
    name: string;
    slug: string;
    description: string;
    imageUrl: string;
    flagUrl?: string;
    currency?: string;
    language?: string;
    capitalCity?: string;
    visaRequirements: string;
}) {
    const country = await prisma.country.create({ data });
    revalidatePath("/admin/countries");
    return country;
}

export async function updateCountry(id: string, data: {
    name?: string;
    slug?: string;
    description?: string;
    imageUrl?: string;
    flagUrl?: string;
    currency?: string;
    language?: string;
    capitalCity?: string;
    visaRequirements?: string;
}) {
    const country = await prisma.country.update({ where: { id }, data });
    revalidatePath("/admin/countries");
    return country;
}

export async function deleteCountry(id: string) {
    await prisma.country.delete({ where: { id } });
    revalidatePath("/admin/countries");
}
