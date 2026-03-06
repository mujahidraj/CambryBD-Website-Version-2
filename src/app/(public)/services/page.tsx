export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import Link from "next/link";
import { FileText, MessageCircle, Plane, Home, BookOpen, CreditCard, ArrowRight, CheckCircle2, Shield, Users, GraduationCap, Award, Globe } from "lucide-react";
import TrustBanner from "@/components/TrustBanner";
import UniversityMarquee from "@/components/UniversityMarquee";
import UrgencyCTA from "@/components/UrgencyCTA";
import { getTopUniversities } from "@/actions/universities";
import { getFaqs } from "@/actions/faqs";

// Helper for rendering high-quality SVG flags instead of OS-dependent text emojis
const getTwemojiUrl = (emoji: string) => {
    const codePoint = Array.from(emoji).map(char => char.codePointAt(0)?.toString(16)).join('-');
    return `https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/${codePoint}.svg`;
};

export const metadata: Metadata = {
    title: "Our Services | Cambry International Admission Centre",
    description: "Comprehensive study abroad services: university admissions, visa processing, counseling, accommodation, and more.",
};

const services = [
    { icon: MessageCircle, title: "Free Counseling", desc: "One-on-one sessions with expert counselors to understand your academic goals, preferences, and budget.", features: ["Career assessment", "University shortlisting", "Course matching", "Budget planning"], color: "bg-[var(--brand-blue)]" },
    { icon: BookOpen, title: "University Admissions", desc: "End-to-end application support including SOP writing, recommendation letters, and interview preparation.", features: ["SOP & essay writing", "Document preparation", "Application tracking", "Interview coaching"], color: "bg-[#0D2847]" },
    { icon: FileText, title: "Visa Processing", desc: "Expert visa application guidance with a 98% success rate across all destination countries.", features: ["Document checklist", "Application filing", "Mock interviews", "Appeal assistance"], color: "bg-[var(--brand-yellow)]" },
    { icon: CreditCard, title: "Scholarship Guidance", desc: "We help you identify and apply for scholarships, grants, and financial aid opportunities.", features: ["Scholarship search", "Application support", "Financial planning", "Loan guidance"], color: "bg-[var(--brand-blue)]" },
    { icon: Plane, title: "Pre-Departure Support", desc: "Comprehensive pre-departure orientation covering travel, cultural adjustment, and forex.", features: ["Travel planning", "Forex assistance", "Cultural orientation", "Packing guide"], color: "bg-[#0D2847]" },
    { icon: Home, title: "Accommodation Help", desc: "Safe, affordable accommodation arranged near your university before you arrive.", features: ["Housing search", "Roommate matching", "Lease review", "Area guides"], color: "bg-[var(--brand-yellow)]" },
];

export default async function ServicesPage() {
    let universities: any[] = [];
    let faqs: any[] = [];
    try {
        [universities, faqs] = await Promise.all([
            getTopUniversities(10),
            getFaqs("General"),
        ]);
    } catch { }

    return (
        <>
            {/* 1. Hero */}
            <section className="relative min-h-screen flex items-center justify-center pt-20 pb-20 bg-[#0A1628] overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1920&q=80"
                        alt="International students studying"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[#0A1628]/80" />
                </div>
                <div className="absolute inset-0 opacity-15">
                    <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-blue-500 rounded-full blur-[128px]" />
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-up">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white/10 backdrop-blur-lg border border-white/10 text-sm text-blue-300 mb-6 font-medium">
                        <Globe className="w-4 h-4 text-[var(--brand-yellow)]" />
                        End-to-End Support
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
                        Our <span className="text-[var(--brand-yellow)]">Services</span>
                    </h1>
                    <p className="text-gray-300 mt-6 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
                        Comprehensive guidance for your study abroad journey, from counseling to post-arrival.
                    </p>
                    <Link href="/contact" className="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-[var(--brand-yellow)] text-white font-semibold rounded-md hover:bg-[#D4660A] transition-all shadow-xl animate-pulse-cta">
                        Get Started Today <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>

            {/* 2. Trust */}
            <TrustBanner />

            {/* 3. Services Grid */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <span className="text-[var(--brand-blue)] font-semibold text-sm uppercase tracking-wider">What We Offer</span>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">Comprehensive Study Abroad Services</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service) => (
                            <div key={service.title} className="bg-[#F8F9FA] border border-gray-200 rounded-md p-8 hover:shadow-lg transition-all group">
                                <div className={`w-14 h-14 rounded-md ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    <service.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3">{service.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed mb-5">{service.desc}</p>
                                <ul className="space-y-2">
                                    {service.features.map((f) => (
                                        <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                                            <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" /> {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* 5. Stats */}
            <section className="py-16 bg-[#0A1628]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                        {[
                            { value: "500+", label: "Students Placed", icon: Users },
                            { value: "98%", label: "Visa Success", icon: Shield },
                            { value: "50+", label: "Partner Unis", icon: GraduationCap },
                            { value: "200+", label: "Scholarships", icon: Award },
                        ].map((s) => (
                            <div key={s.label} className="p-6">
                                <s.icon className="w-8 h-8 text-[var(--brand-yellow)] mx-auto mb-3" />
                                <p className="text-3xl font-bold text-white">{s.value}</p>
                                <p className="text-sm text-gray-400 mt-1">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. Why Cambry vs Others */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Why Cambry Stands Out</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {[
                            "Dedicated counselor assigned to each student",
                            "Direct partnerships with 50+ universities",
                            "98% visa approval rate across all countries",
                            "Free initial consultation with no obligations",
                            "End-to-end support from application to arrival",
                            "Transparent process with no hidden fees",
                        ].map((item) => (
                            <div key={item} className="flex items-center gap-3 p-4 bg-[#F8F9FA] border border-gray-200 rounded-md">
                                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <span className="text-sm font-medium text-gray-700">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. University Marquee */}
            <UniversityMarquee universities={universities.length > 0 
                ? universities.map((u: any) => ({ name: u.name, imageUrl: u.imageUrl })) 
                : [
                    { name: "University of Oxford", imageUrl: "https://logo.clearbit.com/ox.ac.uk" }, 
                    { name: "Imperial College London", imageUrl: "https://logo.clearbit.com/imperial.ac.uk" }, 
                    { name: "University of Melbourne", imageUrl: "https://logo.clearbit.com/unimelb.edu.au" }
                  ]
            } />

            {/* 11. Destinations Quick Links */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Explore Our Destinations</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        {[
                            { name: "United Kingdom", slug: "united-kingdom", flag: "🇬🇧" },
                            { name: "Australia", slug: "australia", flag: "🇦🇺" },
                            { name: "Canada", slug: "canada", flag: "🇨🇦" },
                            { name: "Malaysia", slug: "malaysia", flag: "🇲🇾" },
                            { name: "New Zealand", slug: "new-zealand", flag: "🇳🇿" },
                        ].map((d) => (
                            <Link key={d.slug} href={`/destinations/${d.slug}`} className="px-6 py-3 bg-[#F8F9FA] border border-gray-200 rounded-md hover:border-[var(--brand-blue)] hover:shadow-md transition-all flex items-center gap-3">
                                <img src={getTwemojiUrl(d.flag)} alt={`${d.name} flag`} className="w-5 h-5 object-contain drop-shadow-sm" />
                                <span className="font-medium text-gray-700">{d.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* 12. Urgency CTA */}
            <UrgencyCTA />
        </>
    );
}
