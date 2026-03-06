"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getFaqs(category?: string) {
    return prisma.fAQ.findMany({
        where: { isActive: true, ...(category ? { category } : {}) },
        orderBy: { createdAt: "desc" },
    });
}

export async function getAllFaqs() {
    return prisma.fAQ.findMany({ orderBy: { createdAt: "desc" } });
}

export async function createFaq(data: {
    question: string;
    answer: string;
    category: string;
}) {
    const faq = await prisma.fAQ.create({ data });
    revalidatePath("/admin/faqs");
    return faq;
}

export async function updateFaq(id: string, data: {
    question?: string;
    answer?: string;
    category?: string;
    isActive?: boolean;
}) {
    const faq = await prisma.fAQ.update({ where: { id }, data });
    revalidatePath("/admin/faqs");
    return faq;
}

export async function deleteFaq(id: string) {
    await prisma.fAQ.delete({ where: { id } });
    revalidatePath("/admin/faqs");
}
