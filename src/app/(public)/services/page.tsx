export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import Link from "next/link";
import { FileText, MessageCircle, Plane, Home, BookOpen, CreditCard, ArrowRight, CheckCircle2, Shield, Users, GraduationCap, Award, Globe } from "lucide-react";
import PageHero from "@/components/PageHero";
import TrustBanner from "@/components/TrustBanner";
import UniversityMarquee from "@/components/UniversityMarquee";
import UrgencyCTA from "@/components/UrgencyCTA";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/MotionWrappers";
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
    { icon: MessageCircle, title: "Free Counseling", desc: "One-on-one sessions with expert counselors to understand your academic goals, preferences, and budget.", features: ["Career assessment", "University shortlisting", "Course matching", "Budget planning"], gradient: "from-blue-500 to-cyan-400" },
    { icon: BookOpen, title: "University Admissions", desc: "End-to-end application support including SOP writing, recommendation letters, and interview preparation.", features: ["SOP & essay writing", "Document preparation", "Application tracking", "Interview coaching"], gradient: "from-purple-500 to-violet-400" },
    { icon: FileText, title: "Visa Processing", desc: "Expert visa application guidance with a 98% success rate across all destination countries.", features: ["Document checklist", "Application filing", "Mock interviews", "Appeal assistance"], gradient: "from-amber-500 to-yellow-400" },
    { icon: CreditCard, title: "Scholarship Guidance", desc: "We help you identify and apply for scholarships, grants, and financial aid opportunities.", features: ["Scholarship search", "Application support", "Financial planning", "Loan guidance"], gradient: "from-green-500 to-emerald-400" },
    { icon: Plane, title: "Pre-Departure Support", desc: "Comprehensive pre-departure orientation covering travel, cultural adjustment, and forex.", features: ["Travel planning", "Forex assistance", "Cultural orientation", "Packing guide"], gradient: "from-rose-500 to-pink-400" },
    { icon: Home, title: "Accommodation Help", desc: "Safe, affordable accommodation arranged near your university before you arrive.", features: ["Housing search", "Roommate matching", "Lease review", "Area guides"], gradient: "from-indigo-500 to-blue-400" },
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
            <PageHero
                badge="End-to-End Support"
                badgeIcon={Globe}
                title={<>Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">Services</span></>}
                subtitle="Comprehensive guidance for your study abroad journey, from counseling to post-arrival."
                backgroundImage="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1920&q=80"
                backgroundAlt="International students studying"
                cta={{ label: "Get Started Today", href: "/contact" }}
            />

            {/* 2. Trust */}
            <TrustBanner />

            {/* 3. Services Grid */}
            <section className="py-28 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <FadeIn direction="up">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100/60 text-blue-600 text-[11px] font-bold uppercase tracking-[0.2em] mb-6 shadow-sm">
                                <Globe className="w-3.5 h-3.5" /> What We Offer
                            </div>
                            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0A1628] tracking-tight">Comprehensive Study Abroad <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Services</span></h2>
                        </div>
                    </FadeIn>
                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service) => (
                            <StaggerItem key={service.title}>
                            <div className="bg-white border border-gray-100/60 rounded-3xl p-8 shadow-[0_2px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group h-full">
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                                    <service.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-[#0A1628] mb-3">{service.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed mb-5">{service.desc}</p>
                                <ul className="space-y-2.5">
                                    {service.features.map((f) => (
                                        <li key={f} className="flex items-center gap-2.5 text-sm text-gray-600">
                                            <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" /> {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* 5. Stats */}
            <section className="py-20 bg-[#0A1628] relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
                <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                        {[
                            { value: "500+", label: "Students Placed", icon: Users, gradient: "from-blue-500 to-cyan-400" },
                            { value: "98%", label: "Visa Success", icon: Shield, gradient: "from-green-500 to-emerald-400" },
                            { value: "50+", label: "Partner Unis", icon: GraduationCap, gradient: "from-purple-500 to-violet-400" },
                            { value: "200+", label: "Scholarships", icon: Award, gradient: "from-amber-500 to-yellow-400" },
                        ].map((s) => (
                            <div key={s.label} className="p-8 bg-white/[0.06] backdrop-blur-2xl rounded-3xl border border-white/[0.08] group hover:-translate-y-1 transition-all duration-300">
                                <div className={`w-14 h-14 bg-gradient-to-br ${s.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                                    <s.icon className="w-7 h-7 text-white" />
                                </div>
                                <p className="text-3xl font-extrabold text-white">{s.value}</p>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. Why Cambry vs Others */}
            <section className="py-28 bg-gradient-to-b from-[var(--off-white)] to-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100/60 text-emerald-600 text-[11px] font-bold uppercase tracking-[0.2em] mb-6 shadow-sm">
                            <Shield className="w-3.5 h-3.5" /> Why Us
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0A1628] tracking-tight">Why Cambry Stands Out</h2>
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
                            <div key={item} className="flex items-center gap-4 p-5 bg-white border border-gray-100/60 rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300 group">
                                <div className="w-9 h-9 bg-gradient-to-br from-green-500 to-emerald-400 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                                    <CheckCircle2 className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-sm font-semibold text-[#0A1628]">{item}</span>
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
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100/60 text-blue-600 text-[11px] font-bold uppercase tracking-[0.2em] mb-6 shadow-sm">
                        <Plane className="w-3.5 h-3.5" /> Destinations
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0A1628] tracking-tight mb-10">Explore Our Destinations</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        {[
                            { name: "United Kingdom", slug: "united-kingdom", flag: "🇬🇧" },
                            { name: "Australia", slug: "australia", flag: "🇦🇺" },
                            { name: "Canada", slug: "canada", flag: "🇨🇦" },
                            { name: "Malaysia", slug: "malaysia", flag: "🇲🇾" },
                            { name: "New Zealand", slug: "new-zealand", flag: "🇳🇿" },
                        ].map((d) => (
                            <Link key={d.slug} href={`/destinations/${d.slug}`} className="px-6 py-3.5 bg-white border border-gray-100/80 rounded-2xl hover:border-amber-200 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all flex items-center gap-3 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:-translate-y-0.5 duration-300">
                                <img src={getTwemojiUrl(d.flag)} alt={`${d.name} flag`} className="w-5 h-5 object-contain" />
                                <span className="font-semibold text-[#0A1628]">{d.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* 12. Test Prep Services */}
            <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0A1628] tracking-tight">IELTS & PTE Support Services</h2>
                        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">From exam registration to score improvement plans, we provide complete support.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { title: "Exam Registration", desc: "Guided IELTS/PTE exam booking with date and center selection.", icon: FileText },
                            { title: "Course Enrollment", desc: "Join regular, weekend, or crash-course batches online/offline.", icon: BookOpen },
                            { title: "Mock Test Analysis", desc: "Detailed section-wise feedback and improvement roadmap.", icon: Shield },
                        ].map((item) => (
                            <div key={item.title} className="p-7 bg-white border border-gray-100 rounded-3xl shadow-[0_2px_14px_rgba(0,0,0,0.04)]">
                                <item.icon className="w-8 h-8 text-[var(--brand-blue)] mb-4" />
                                <h3 className="font-bold text-[#0A1628] text-lg mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 13. Scholarship Strategy */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-10 items-center">
                        <div>
                            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0A1628] tracking-tight">Scholarship Strategy Service</h2>
                            <p className="text-gray-500 mt-4 leading-relaxed">We build an application plan for scholarship-heavy destinations and help optimize profile, SOP, and references for better outcomes.</p>
                            <ul className="mt-6 space-y-3 text-sm text-gray-600">
                                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Merit + need-based scholarship mapping</li>
                                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Budget-aware university shortlisting</li>
                                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Deadline tracking and submission planning</li>
                            </ul>
                        </div>
                        <div className="p-8 rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100">
                            <Award className="w-10 h-10 text-amber-600 mb-4" />
                            <h3 className="font-bold text-[#0A1628] text-xl mb-2">Result-Oriented Scholarship Workflow</h3>
                            <p className="text-gray-600 text-sm">Includes profile audit, scholarship matrix, writing support, and reviewer feedback loop.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 14. Visa File Optimization */}
            <section className="py-24 bg-[#0A1628] relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:70px_70px] pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">Visa File Optimization</h2>
                        <p className="text-blue-100/60 mt-4 max-w-2xl mx-auto">Strong document packaging and interview prep to improve approval confidence.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {["Financial file review", "Interview simulation", "Compliance checklist"].map((t) => (
                            <div key={t} className="p-6 rounded-2xl border border-white/10 bg-white/5 text-white font-semibold text-center">{t}</div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 15. Pre-Departure & Arrival */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0A1628] tracking-tight">Pre-Departure & Arrival Package</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                        {["Flight + baggage guidance", "Accommodation setup", "Airport pickup coordination", "First 30-day settlement support"].map((item) => (
                            <div key={item} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-semibold text-[#0A1628]">{item}</div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 16. Parent Support Desk */}
            <section className="py-24 bg-gradient-to-r from-blue-50 to-indigo-50 border-y border-blue-100/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0A1628] tracking-tight">Parent Support Desk</h2>
                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Dedicated updates for parents on application progress, visa stage, payment milestones, and departure timeline.</p>
                    <Link href="/contact" className="inline-flex items-center gap-2 mt-8 px-7 py-3 rounded-2xl bg-[var(--brand-blue)] text-white font-bold">
                        Talk to Support Team <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>

            {/* 17. Urgency CTA */}
            <UrgencyCTA />
        </>
    );
}
