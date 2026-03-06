import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Target, Eye, Heart, Users, Award, Globe, GraduationCap, Clock, Shield, CheckCircle2, Star } from "lucide-react";
import TrustBanner from "@/components/TrustBanner";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import UrgencyCTA from "@/components/UrgencyCTA";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/MotionWrappers";
import { getFeaturedTestimonials } from "@/actions/testimonials";
import { getCounselors } from "@/actions/counselors";
import { getFaqs } from "@/actions/faqs";

export const metadata: Metadata = {
    title: "About Us | Cambry International Admission Centre",
    description: "Learn about Cambry's mission, vision, and the team behind your study abroad journey.",
};

export default async function AboutPage() {
    let testimonials: any[] = [];
    let counselors: any[] = [];
    let faqs: any[] = [];
    try {
        [testimonials, counselors, faqs] = await Promise.all([
            getFeaturedTestimonials(),
            getCounselors(),
            getFaqs("General"),
        ]);
    } catch { }

    return (
        <>
            {/* 1. Hero */}
            <section className="relative min-h-[80vh] flex items-center justify-center pt-24 pb-24 bg-[#0A1628] overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&q=80"
                        alt="Students collaborating"
                        className="w-full h-full object-cover mix-blend-overlay opacity-40 animate-pulse-slow"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/80 to-[#0A1628]/60" />
                </div>
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[var(--brand-yellow)] rounded-full blur-[128px]" />
                    <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[128px]" />
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 w-full mt-10">
                    <FadeIn direction="up">
                        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-sm text-[var(--brand-yellow)] mb-8 font-bold uppercase tracking-widest shadow-2xl">
                            <Users className="w-4 h-4" />
                            Who We Are
                        </div>
                        <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold text-white leading-[1.1] tracking-tight drop-shadow-2xl">
                            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-yellow)] to-[var(--brand-yellow)]">Cambry</span>
                        </h1>
                        <p className="text-blue-100/80 mt-8 max-w-3xl mx-auto text-xl md:text-2xl leading-relaxed font-light drop-shadow-md">
                            Your trusted International Admission Centre, dedicated to transforming study abroad dreams into reality since 2018.
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* 2. Trust */}
            <TrustBanner />

            {/* 3. Our Story */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <FadeIn direction="right">
                            <span className="text-[var(--brand-yellow)] font-bold text-sm uppercase tracking-widest">Our Story</span>
                            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0A1628] mt-3 tracking-tight">From Vision to Reality</h2>
                            <p className="text-gray-600 mt-6 leading-relaxed text-lg">
                                Cambry was founded in 2018 with a simple yet powerful vision: to make world-class education accessible to every aspiring student. What started as a small team of passionate educators has grown into a leading International Admission Centre serving hundreds of students each year.
                            </p>
                            <p className="text-gray-600 mt-4 leading-relaxed text-lg">
                                Our name &ldquo;Cambry&rdquo; represents the bridge between ambition and achievement. We don&apos;t just process applications — we build futures. Every student who walks through our doors receives personalized attention, expert guidance, and unwavering support throughout their journey.
                            </p>
                        </FadeIn>
                        <StaggerContainer className="grid grid-cols-2 gap-6">
                            {[
                                { value: "500+", label: "Students Placed", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
                                { value: "50+", label: "Partner Universities", icon: GraduationCap, color: "text-var(--brand-yellow)-600", bg: "bg-var(--brand-yellow)-50" },
                                { value: "98%", label: "Visa Success Rate", icon: Shield, color: "text-green-600", bg: "bg-green-50" },
                                { value: "6+", label: "Years Experience", icon: Clock, color: "text-purple-600", bg: "bg-purple-50" },
                            ].map((s) => (
                                <StaggerItem key={s.label} className="bg-white border border-gray-100 rounded-3xl p-8 text-center shadow-lg shadow-blue-900/5 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group">
                                    <div className={`w-16 h-16 ${s.bg} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                                        <s.icon className={`w-8 h-8 ${s.color}`} />
                                    </div>
                                    <p className="text-4xl font-extrabold text-[#0A1628] mb-2">{s.value}</p>
                                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{s.label}</p>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    </div>
                </div>
            </section>

            {/* 4. Mission / Vision / Values */}
            <section className="py-24 bg-[#F8F9FA] relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: Target, title: "Our Mission", desc: "To empower students worldwide with expert guidance, seamless processes, and genuine care, making international education accessible and achievable for all." },
                            { icon: Eye, title: "Our Vision", desc: "To be the most trusted and impactful study abroad consultancy in South Asia, known for transparency, results, and student-first values." },
                            { icon: Heart, title: "Our Values", desc: "Integrity, transparency, student-first approach, excellence in service, and continuous improvement drive everything we do at Cambry." },
                        ].map((item) => (
                            <StaggerItem key={item.title}>
                                <div className="bg-white border border-gray-100 rounded-3xl p-10 text-center shadow-lg shadow-blue-900/5 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group h-full">
                                    <div className="w-16 h-16 bg-gradient-to-br from-[var(--brand-blue)] to-[#0A1628] rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:scale-110 transition-transform">
                                        <item.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#0A1628] mb-4">{item.title}</h3>
                                    <p className="text-gray-500 leading-relaxed text-[15px]">{item.desc}</p>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* 5. Meet Our Team */}
            <section className="py-24 bg-white relative">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <FadeIn direction="up">
                        <div className="text-center mb-16">
                            <span className="text-[var(--brand-yellow)] font-bold text-sm uppercase tracking-widest">Our Team</span>
                            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0A1628] mt-3 tracking-tight">Meet Our Expert Counselors</h2>
                            <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">Each counselor specializes in specific destinations and brings years of international education expertise.</p>
                        </div>
                    </FadeIn>
                    <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {(counselors.length > 0 ? counselors : [
                            { name: "Sarah Ahmed", role: "Senior UK Counselor", bio: "8+ years guiding students to Russell Group universities.", imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400" },
                            { name: "James Wilson", role: "Canada Specialist", bio: "Expert in PGWP pathways and Canadian college admissions.", imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400" },
                            { name: "Priya Nair", role: "Australia & NZ Lead", bio: "Former university admissions officer with deep Oceania expertise.", imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400" },
                            { name: "Tanvir Hassan", role: "Malaysia Counselor", bio: "Specialized in affordable Asian education pathways.", imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400" },
                        ]).map((c: any) => (
                            <StaggerItem key={c.name}>
                                <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden group shadow-lg shadow-blue-900/5 hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-2 transition-all duration-300 h-full flex flex-col">
                                    <div className="h-64 overflow-hidden relative">
                                        <div className="absolute inset-0 bg-[#0A1628]/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                                        <img src={c.imageUrl} alt={c.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    </div>
                                    <div className="p-8 flex-1 flex flex-col">
                                        <h3 className="font-bold text-xl text-[#0A1628] group-hover:text-[var(--brand-yellow)] transition-colors mb-1">{c.name}</h3>
                                        <p className="text-sm font-bold text-[var(--brand-yellow)] uppercase tracking-wider mb-4">{c.role}</p>
                                        <p className="text-sm text-gray-500 leading-relaxed mt-auto">{c.bio}</p>
                                    </div>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* 6. Timeline */}
            <section className="py-24 bg-[#0A1628] relative overflow-hidden">
                <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <FadeIn direction="up">
                        <div className="text-center mb-20">
                            <span className="text-[var(--brand-yellow)] font-bold text-sm uppercase tracking-widest">History</span>
                            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mt-3 tracking-tight">Our Journey</h2>
                        </div>
                    </FadeIn>
                    <div className="space-y-12 bg-white/5 border border-white/10 rounded-3xl p-10 md:p-14 backdrop-blur-sm shadow-2xl">
                        {[
                            { year: "2018", title: "Founded in Dhaka", desc: "Started with a 3-person team focused on UK admissions." },
                            { year: "2019", title: "Expanded to Australia & Canada", desc: "Partnered with 20+ universities across 3 countries." },
                            { year: "2021", title: "500+ Students Placed", desc: "Reached a milestone of 500 successful student placements." },
                            { year: "2023", title: "Added Malaysia & New Zealand", desc: "Expanded our portfolio to 5 countries with 50+ partner universities." },
                            { year: "2024", title: "Digital Transformation", desc: "Launched our online platform for seamless student experience." },
                        ].map((item, i) => (
                            <FadeIn key={item.year} direction="up" delay={i * 0.1}>
                                <div className="flex gap-8 items-start group">
                                    <div className="w-24 flex-shrink-0 text-right">
                                        <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-yellow)] to-[var(--brand-yellow)] group-hover:scale-110 inline-block transition-transform">{item.year}</span>
                                    </div>
                                    <div className="relative">
                                        <div className="w-4 h-4 bg-gradient-to-br from-[var(--brand-yellow)] to-[var(--brand-yellow)] rounded-full mt-1.5 flex-shrink-0 shadow-[0_0_15px_rgba(232,114,12,0.5)] group-hover:scale-125 transition-transform" />
                                        {i !== 4 && <div className="absolute top-6 left-1/2 -ml-px w-0.5 h-full bg-white/10" />}
                                    </div>
                                    <div className="pb-8">
                                        <h3 className="font-bold text-xl text-white mb-2 group-hover:text-blue-100 transition-colors">{item.title}</h3>
                                        <p className="text-[15px] text-gray-400 leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. Certifications */}
            <section className="py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeIn direction="up">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A1628] text-center mb-16 tracking-tight">Certifications & Partnerships</h2>
                    </FadeIn>
                    <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { name: "British Council", icon: Shield },
                            { name: "IELTS Partner", icon: Award },
                            { name: "IDP Education", icon: Globe },
                            { name: "ICEF Certified", icon: Star },
                        ].map((item) => (
                            <StaggerItem key={item.name}>
                                <div className="flex flex-col items-center gap-4 p-8 bg-white border border-gray-100 rounded-3xl shadow-lg shadow-blue-900/5 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group">
                                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:bg-[var(--brand-yellow)] group-hover:scale-110 transition-all duration-300">
                                        <item.icon className="w-8 h-8 text-[var(--brand-blue)] group-hover:text-white transition-colors" />
                                    </div>
                                    <span className="text-sm font-bold text-gray-700 text-center uppercase tracking-widest leading-snug">{item.name}</span>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* 8. Testimonials */}
            <TestimonialsCarousel testimonials={testimonials.length > 0 ? testimonials : [
                { studentName: "Rahul S.", studentCourse: "MSc Finance", universityName: "University of Leeds", targetCountry: "UK", quote: "The Cambry team guided me perfectly. My counselor knew exactly what universities would accept my profile." },
            ]} />

            {/* 9. Why Choose Cambry */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <FadeIn direction="up">
                        <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0A1628] text-center mb-16 tracking-tight">Why Choose Cambry?</h2>
                    </FadeIn>
                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            "Personalized 1-on-1 counseling for every student",
                            "Direct partnerships with 50+ universities",
                            "98% visa approval rate recommendations",
                            "Transparent pricing with no hidden charges",
                            "Comprehensive post-arrival support & guidance",
                            "Dedicated IELTS and PTE preparation assistance",
                        ].map((item) => (
                            <StaggerItem key={item}>
                                <div className="flex items-center gap-5 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 group">
                                    <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center group-hover:bg-green-100 group-hover:scale-110 transition-all">
                                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                                    </div>
                                    <span className="text-[15px] font-semibold text-gray-700 leading-snug">{item}</span>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* 10. FAQ */}
            <section className="py-24 bg-[#F8F9FA] relative">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <FadeIn direction="up">
                        <div className="text-center mb-16">
                            <span className="text-[var(--brand-yellow)] font-bold text-sm uppercase tracking-widest">Support</span>
                            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0A1628] mt-3 tracking-tight">Questions About Us</h2>
                        </div>
                    </FadeIn>
                    <div className="space-y-4">
                        {(faqs.length > 0 ? faqs.slice(0, 4) : [
                            { question: "How long has Cambry been operating?", answer: "Cambry was founded in 2018 and has been successfully guiding students for over 6 years." },
                            { question: "Are your counselors certified?", answer: "Yes, our counselors are certified by the British Council and IDP Education." },
                        ]).map((faq: any, i: number) => (
                            <FadeIn key={i} direction="up" delay={i * 0.1}>
                                <details className="group bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                                    <summary className="flex items-center justify-between p-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                                        <h3 className="text-lg font-bold text-[#0A1628] pr-8">{faq.question}</h3>
                                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 group-open:bg-[var(--brand-yellow)] group-open:text-white transition-colors duration-300">
                                            <span className="text-xl leading-none font-medium transform group-open:rotate-45 transition-transform duration-300">+</span>
                                        </div>
                                    </summary>
                                    <div className="px-6 pb-6 pt-0 text-gray-500 leading-relaxed text-base border-t border-gray-50 mt-4 pt-4">
                                        <p>{faq.answer}</p>
                                    </div>
                                </details>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* 11. Urgency CTA */}
            <UrgencyCTA />
        </>
    );
}
