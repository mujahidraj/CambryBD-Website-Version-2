"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { CourseLevel } from "@prisma/client";

export async function getCourses() {
    return prisma.course.findMany({
        include: { university: { include: { country: true } } },
        orderBy: { title: "asc" },
    });
}

export async function getCourseById(id: string) {
    return prisma.course.findUnique({
        where: { id },
        include: { university: { include: { country: true } } },
    });
}

export async function createCourse(data: {
    title: string;
    level: CourseLevel;
    duration: string;
    description: string;
    universityId: string;
}) {
    const course = await prisma.course.create({ data });
    revalidatePath("/admin/courses");
    return course;
}

export async function updateCourse(
    id: string,
    data: {
        title?: string;
        level?: CourseLevel;
        duration?: string;
        description?: string;
        universityId?: string;
    }
) {
    const course = await prisma.course.update({ where: { id }, data });
    revalidatePath("/admin/courses");
    return course;
}

export async function deleteCourse(id: string) {
    await prisma.course.delete({ where: { id } });
    revalidatePath("/admin/courses");
}
