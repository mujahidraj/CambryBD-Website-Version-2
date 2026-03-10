import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import Chatbot from "@/components/Chatbot";
import { Toaster } from "react-hot-toast";
import { prisma } from "@/lib/prisma";

export default async function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Fetch countries for the Navbar dropdown
    let countries: { name: string; slug: string; flagUrl: string | null }[] = [];
    try {
        countries = await prisma.country.findMany({
            select: { name: true, slug: true, flagUrl: true },
            orderBy: { name: 'asc' }
        });
    } catch {
        // DB not available yet
    }

    return (
        <>
            <Toaster position="top-right" />
            <Navbar countries={countries} />
            <main>{children}</main>
            <Footer />
            <WhatsAppWidget />
            <Chatbot />
        </>
    );
}
