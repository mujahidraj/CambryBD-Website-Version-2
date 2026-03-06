import { SignJWT, jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(
    process.env.ADMIN_SECRET || "cambry-admin-secret-change-in-production"
);

const ALG = "HS256";

export async function createSession(adminId: string): Promise<string> {
    return new SignJWT({ sub: adminId })
        .setProtectedHeader({ alg: ALG })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(SECRET_KEY);
}

export async function verifySession(token: string): Promise<string | null> {
    try {
        const { payload } = await jwtVerify(token, SECRET_KEY);
        return (payload.sub as string) || null;
    } catch {
        return null;
    }
}
