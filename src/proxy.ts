import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySession } from "@/lib/session";

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Protect admin routes (except login)
    if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
        const token = request.cookies.get("admin_session")?.value;
        if (!token) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }

        // Verify the JWT signature
        const adminId = await verifySession(token);
        if (!adminId) {
            // Invalid or expired token — clear cookie and redirect
            const response = NextResponse.redirect(new URL("/admin/login", request.url));
            response.cookies.delete("admin_session");
            return response;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
