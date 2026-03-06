"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getTestimonials() {
    return prisma.testimonial.findMany({
        orderBy: { createdAt: "desc" },
    });
}

export async function getFeaturedTestimonials() {
    return prisma.testimonial.findMany({
        where: { featured: true },
        orderBy: { createdAt: "desc" },
    });
}

export async function createTestimonial(data: {
    studentName: string;
    studentCourse: string;
    universityName: string;
    targetCountry: string;
    quote: string;
    imageUrl?: string;
    featured?: boolean;
}) {
    const testimonial = await prisma.testimonial.create({ data });
    revalidatePath("/admin/testimonials");
    return testimonial;
}

export async function updateTestimonial(id: string, data: {
    studentName?: string;
    studentCourse?: string;
    universityName?: string;
    targetCountry?: string;
    quote?: string;
    imageUrl?: string;
    featured?: boolean;
}) {
    const testimonial = await prisma.testimonial.update({ where: { id }, data });
    revalidatePath("/admin/testimonials");
    return testimonial;
}

export async function deleteTestimonial(id: string) {
    await prisma.testimonial.delete({ where: { id } });
    revalidatePath("/admin/testimonials");
}
