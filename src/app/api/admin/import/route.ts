/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const { model, payload } = await req.json();

        if (!model || !payload || !Array.isArray(payload)) {
            return NextResponse.json({ error: "Invalid request format. Expected 'model' and array 'payload'." }, { status: 400 });
        }

        // Validate API Key or Session here ideally, but assuming admin route protection is handled globally or via simple setup for this prototype.

        let count = 0;

        // Perform bulk inserts depending on the model
        // We use createMany and skipDuplicates to avoid crashing on existing data
        switch (model) {
            case "country":
                // Clean payload (e.g. remove auto-generated IDs and relations if any)
                const validCountries = payload.map((p: any) => ({
                    name: p.name,
                    slug: p.slug,
                    description: p.description,
                    imageUrl: p.imageUrl,
                    currency: p.currency,
                    capitalCity: p.capitalCity,
                    language: p.language,
                    visaRequirements: p.visaRequirements,
                    // Note: infographicData is purposely ignored in simple JSON dumps to avoid complex type parsing, or it can be included if structured correctly.
                }));
                const cRes = await prisma.country.createMany({ data: validCountries, skipDuplicates: true });
                count = cRes.count;
                break;

            case "university":
                // Requires countryId. The JSON import must include valid countryId references, otherwise it will fail DB constraints.
                const validUnis = payload.map((p: any) => ({
                    name: p.name,
                    slug: p.slug,
                    location: p.location,
                    ranking: p.ranking,
                    website: p.website,
                    tuitionEstimate: p.tuitionEstimate,
                    imageUrl: p.imageUrl,
                    description: p.description,
                    countryId: p.countryId, // Must match an existing Country ID
                }));
                const uRes = await prisma.university.createMany({ data: validUnis, skipDuplicates: true });
                count = uRes.count;
                break;

            case "course":
                const validCourses = payload.map((p: any) => ({
                    title: p.title,
                    level: p.level,
                    duration: p.duration,
                    tuitionFee: p.tuitionFee,
                    description: p.description,
                    universityId: p.universityId,
                }));
                const coRes = await prisma.course.createMany({ data: validCourses, skipDuplicates: true });
                count = coRes.count;
                break;

            case "lead":
                const validLeads = payload.map((p: any) => ({
                    name: p.name,
                    email: p.email,
                    phone: p.phone,
                    desiredCountry: p.targetCountry || p.desiredCountry,
                    message: p.message || p.notes || "",
                    status: p.status || "NEW",
                    notes: p.notes,
                }));
                const lRes = await prisma.lead.createMany({ data: validLeads, skipDuplicates: true });
                count = lRes.count;
                break;

            case "testimonial":
                const validTestimonials = payload.map((p: any) => ({
                    studentName: p.studentName,
                    targetCountry: p.targetCountry,
                    universityName: p.universityName,
                    studentCourse: p.studentCourse,
                    quote: p.quote,
                    imageUrl: p.imageUrl,
                    rating: p.rating || 5,
                    featured: p.featured || false,
                }));
                const tRes = await prisma.testimonial.createMany({ data: validTestimonials, skipDuplicates: true });
                count = tRes.count;
                break;

            default:
                return NextResponse.json({ error: "Unsupported model" }, { status: 400 });
        }

        return NextResponse.json({ success: true, count });
    } catch (error: any) {
        console.error("Import API Error:", error);
        return NextResponse.json({ error: error.message || "Bulk import failed. Ensure relations (like countryId) are valid." }, { status: 500 });
    }
}
