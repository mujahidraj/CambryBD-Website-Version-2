"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { createSession, verifySession } from "@/lib/session";

const SESSION_COOKIE = "admin_session";

export async function loginAdmin(email: string, password: string) {
    const admin = await prisma.adminUser.findUnique({ where: { email } });
    if (!admin) {
        return { error: "Invalid credentials" };
    }

    const valid = await bcrypt.compare(password, admin.passwordHash);
    if (!valid) {
        return { error: "Invalid credentials" };
    }

    // Create signed JWT session token
    const token = await createSession(admin.id);

    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
    });

    return { success: true, name: admin.name };
}

export async function logoutAdmin() {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE);
}

export async function getSession() {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE)?.value;
    if (!token) return null;

    // Verify the JWT signature and extract admin ID
    const adminId = await verifySession(token);
    if (!adminId) return null;

    const admin = await prisma.adminUser.findUnique({
        where: { id: adminId },
        select: { id: true, name: true, email: true },
    });

    return admin;
}
