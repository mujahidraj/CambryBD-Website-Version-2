"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { LeadStatus } from "@prisma/client";

export async function getLeads() {
    return prisma.lead.findMany({
        orderBy: { createdAt: "desc" },
    });
}

export async function getLeadById(id: string) {
    return prisma.lead.findUnique({ where: { id } });
}

export async function createLead(data: {
    name: string;
    email: string;
    phone: string;
    desiredCountry: string;
    programInterest?: string;
    message?: string;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
}) {
    const lead = await prisma.lead.create({ data });
    revalidatePath("/admin/leads");
    return lead;
}

export async function updateLeadStatus(id: string, status: LeadStatus) {
    const lead = await prisma.lead.update({
        where: { id },
        data: { status },
    });
    revalidatePath("/admin/leads");
    return lead;
}

export async function updateLeadNotes(id: string, crmNotes: string) {
    const lead = await prisma.lead.update({
        where: { id },
        data: { crmNotes },
    });
    revalidatePath("/admin/leads");
    return lead;
}

export async function deleteLead(id: string) {
    await prisma.lead.delete({ where: { id } });
    revalidatePath("/admin/leads");
}

export async function getLeadStats() {
    const [total, newLeads, contacted, processing, converted, closed] = await Promise.all([
        prisma.lead.count(),
        prisma.lead.count({ where: { status: "NEW" } }),
        prisma.lead.count({ where: { status: "CONTACTED" } }),
        prisma.lead.count({ where: { status: "PROCESSING" } }),
        prisma.lead.count({ where: { status: "CONVERTED" } }),
        prisma.lead.count({ where: { status: "CLOSED" } }),
    ]);
    return { total, newLeads, contacted, processing, converted, closed };
}
