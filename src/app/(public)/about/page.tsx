export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Target, Eye, Heart, Users, Award, Globe, GraduationCap, Clock, Shield, CheckCircle2, Star, Sparkles } from "lucide-react";
import PageHero from "@/components/PageHero";
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
            <PageHero
                badge="Who We Are"
                badgeIcon={Users}
                title={<>About <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">Cambry</span></>}
                subtitle="Your trusted International Admission Centre, dedicated to transforming study abroad dreams into reality since 2018."
                backgroundImage="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&q=80"
                backgroundAlt="Students collaborating"
            />

            {/* 2. Trust */}
            <TrustBanner />

            {/* 3. Our Story */}
            <section className="py-28 bg-white relative overflow-hidden">
                <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-blue-50/40 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <FadeIn direction="right">
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-100/60 text-amber-600 text-[11px] font-bold uppercase tracking-[0.2em] mb-6 shadow-sm">
                                <Sparkles className="w-3.5 h-3.5" /> Our Story
                            </div>
                            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0A1628] tracking-tight">From Vision to Reality</h2>
                            <p className="text-gray-600 mt-8 leading-relaxed text-lg">
                                Cambry was founded in 2018 with a simple yet powerful vision: to make world-class education accessible to every aspiring student. What started as a small team of passionate educators has grown into a leading International Admission Centre serving hundreds of students each year.
                            </p>
                            <p className="text-gray-600 mt-4 leading-relaxed text-lg">
                                Our name &ldquo;Cambry&rdquo; represents the bridge between ambition and achievement. We don&apos;t just process applications — we build futures. Every student who walks through our doors receives personalized attention, expert guidance, and unwavering support throughout their journey.
                            </p>
                        </FadeIn>
                        <StaggerContainer className="grid grid-cols-2 gap-6">
                            {[
                                { value: "500+", label: "Students Placed", icon: Users, gradient: "from-blue-500 to-cyan-400" },
                                { value: "50+", label: "Partner Universities", icon: GraduationCap, gradient: "from-amber-500 to-yellow-400" },
                                { value: "98%", label: "Visa Success Rate", icon: Shield, gradient: "from-green-500 to-emerald-400" },
                                { value: "6+", label: "Years Experience", icon: Clock, gradient: "from-purple-500 to-violet-400" },
                            ].map((s) => (
                                <StaggerItem key={s.label} className="bg-white border border-gray-100/60 rounded-3xl p-8 text-center shadow-[0_2px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group">
                                    <div className={`w-14 h-14 bg-gradient-to-br ${s.gradient} rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                                        <s.icon className="w-7 h-7 text-white" />
                                    </div>
                                    <p className="text-4xl font-extrabold text-[#0A1628] mb-2">{s.value}</p>
                                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">{s.label}</p>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    </div>
                </div>
            </section>

            {/* 4. Mission / Vision / Values */}
            <section className="py-28 bg-gradient-to-b from-[var(--off-white)] to-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100/60 text-blue-600 text-[11px] font-bold uppercase tracking-[0.2em] mb-6 shadow-sm">
                            <Heart className="w-3.5 h-3.5" /> What Drives Us
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0A1628] tracking-tight">Our Foundation</h2>
                    </div>
                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: Target, title: "Our Mission", desc: "To empower students worldwide with expert guidance, seamless processes, and genuine care, making international education accessible and achievable for all.", gradient: "from-blue-500 to-cyan-400" },
                            { icon: Eye, title: "Our Vision", desc: "To be the most trusted and impactful study abroad consultancy in South Asia, known for transparency, results, and student-first values.", gradient: "from-amber-500 to-yellow-400" },
                            { icon: Heart, title: "Our Values", desc: "Integrity, transparency, student-first approach, excellence in service, and continuous improvement drive everything we do at Cambry.", gradient: "from-purple-500 to-violet-400" },
                        ].map((item) => (
                            <StaggerItem key={item.title}>
                                <div className="bg-white border border-gray-100/60 rounded-3xl p-10 text-center shadow-[0_2px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group h-full">
                                    <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:scale-110 transition-transform`}>
                                        <item.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#0A1628] mb-4">{item.title}</h3>
                                    <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* 5. Meet Our Team */}
            <section className="py-28 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <FadeIn direction="up">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-100/60 text-purple-600 text-[11px] font-bold uppercase tracking-[0.2em] mb-6 shadow-sm">
                                <Users className="w-3.5 h-3.5" /> Our Team
                            </div>
                            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0A1628] tracking-tight">Certified Counselors</h2>
                            <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">Each counselor specializes in specific destinations and brings years of international education expertise.</p>
                        </div>
                    </FadeIn>
                    <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {(counselors.length > 0 ? counselors : [
                            { name: "British Council Certified Counselor", bio: "Recognized by the British Council for quality guidance and ethical counseling standards." },
                            { name: "ABC Certified Counselor", bio: "Certified under ABC standards for professional student advisory and admissions support." },
                            { name: "NZQA Certified Counselor", bio: "Trained to advise students based on New Zealand Qualifications Authority pathways and requirements." },
                            { name: "ICEF Certified Counselor", bio: "ICEF-certified for international education best practices, compliance, and student-first counseling." },
                        ]).map((c: any) => (
                            <StaggerItem key={c.name}>
                                <div className="bg-white border border-gray-100/60 rounded-3xl p-7 group shadow-[0_2px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 h-full flex flex-col text-center">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-400 flex items-center justify-center shadow-lg mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                                        <Award className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="font-bold text-lg text-[#0A1628] group-hover:text-amber-600 transition-colors mb-3">{c.name}</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed mt-auto">{c.bio}</p>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* 6. Timeline */}
            <section className="py-28 bg-[#0A1628] relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
                <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-blue-500/8 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <FadeIn direction="up">
                        <div className="text-center mb-20">
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-amber-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-6">
                                <Clock className="w-3.5 h-3.5" /> History
                            </div>
                            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">Our Journey</h2>
                        </div>
                    </FadeIn>
                    <div className="space-y-0">
                        {[
                            { year: "2018", title: "Founded in Dhaka", desc: "Started with a 3-person team focused on UK admissions." },
                            { year: "2019", title: "Expanded to Australia & Canada", desc: "Partnered with 20+ universities across 3 countries." },
                            { year: "2021", title: "500+ Students Placed", desc: "Reached a milestone of 500 successful student placements." },
                            { year: "2023", title: "Added Malaysia & New Zealand", desc: "Expanded our portfolio to 5 countries with 50+ partner universities." },
                            { year: "2024", title: "Digital Transformation", desc: "Launched our online platform for seamless student experience." },
                        ].map((item, i, arr) => (
                            <FadeIn key={item.year} direction="up" delay={i * 0.1}>
                                <div className="flex gap-6 md:gap-10 items-start group py-6">
                                    <div className="w-20 md:w-24 flex-shrink-0 text-right pt-0.5">
                                        <span className="text-xl md:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">{item.year}</span>
                                    </div>
                                    <div className="relative flex flex-col items-center">
                                        <div className="w-3.5 h-3.5 bg-gradient-to-br from-amber-400 to-yellow-300 rounded-full mt-2 flex-shrink-0 shadow-[0_0_20px_rgba(245,158,11,0.4)] group-hover:scale-150 transition-transform duration-300" />
                                        {i !== arr.length - 1 && <div className="w-px flex-1 min-h-[40px] bg-gradient-to-b from-amber-400/30 to-transparent mt-2" />}
                                    </div>
                                    <div className="pb-2 pt-0.5">
                                        <h3 className="font-bold text-lg md:text-xl text-white mb-1.5 group-hover:text-amber-200 transition-colors">{item.title}</h3>
                                        <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. Certifications */}
            <section className="py-28 bg-white relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-amber-50/30 rounded-full blur-[120px] translate-y-1/3 translate-x-1/3 pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <FadeIn direction="up">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100/60 text-emerald-600 text-[11px] font-bold uppercase tracking-[0.2em] mb-6 shadow-sm">
                                <Award className="w-3.5 h-3.5" /> Accredited
                            </div>
                            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0A1628] tracking-tight">Certifications & Partnerships</h2>
                        </div>
                    </FadeIn>
                    <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { name: "British Council", icon: Shield, gradient: "from-blue-500 to-cyan-400" },
                            { name: "IELTS Partner", icon: Award, gradient: "from-amber-500 to-yellow-400" },
                            { name: "IDP Education", icon: Globe, gradient: "from-green-500 to-emerald-400" },
                            { name: "ICEF Certified", icon: Star, gradient: "from-purple-500 to-violet-400" },
                        ].map((item) => (
                            <StaggerItem key={item.name}>
                                <div className="flex flex-col items-center gap-5 p-8 bg-white border border-gray-100/60 rounded-3xl shadow-[0_2px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group">
                                    <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                                        <item.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <span className="text-sm font-bold text-gray-700 text-center uppercase tracking-[0.2em] leading-snug">{item.name}</span>
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
            <section className="py-28 bg-white relative overflow-hidden">
                <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-50/40 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <FadeIn direction="up">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-100/60 text-amber-600 text-[11px] font-bold uppercase tracking-[0.2em] mb-6 shadow-sm">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Why Us
                            </div>
                            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0A1628] tracking-tight">Why Choose Cambry?</h2>
                        </div>
                    </FadeIn>
                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {[
                            "Personalized 1-on-1 counseling for every student",
                            "Direct partnerships with 50+ universities",
                            "98% visa approval rate recommendations",
                            "Transparent pricing with no hidden charges",
                            "Comprehensive post-arrival support & guidance",
                            "Dedicated IELTS and PTE preparation assistance",
                        ].map((item) => (
                            <StaggerItem key={item}>
                                <div className="flex items-center gap-5 p-5 bg-white border border-gray-100/60 rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300 group">
                                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-md flex-shrink-0">
                                        <CheckCircle2 className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="text-[15px] font-semibold text-gray-700 leading-snug">{item}</span>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* 10. FAQ */}
            <section className="py-28 bg-gradient-to-b from-[var(--off-white)] to-white relative">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <FadeIn direction="up">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100/60 text-blue-600 text-[11px] font-bold uppercase tracking-[0.2em] mb-6 shadow-sm">
                                <Star className="w-3.5 h-3.5" /> Support
                            </div>
                            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0A1628] tracking-tight">Questions About Us</h2>
                        </div>
                    </FadeIn>
                    <div className="space-y-4">
                        {(faqs.length > 0 ? faqs.slice(0, 4) : [
                            { question: "How long has Cambry been operating?", answer: "Cambry was founded in 2018 and has been successfully guiding students for over 6 years." },
                            { question: "Are your counselors certified?", answer: "Yes, our counselors are certified by the British Council and IDP Education." },
                        ]).map((faq: any, i: number) => (
                            <FadeIn key={i} direction="up" delay={i * 0.1}>
                                <details className="group bg-white border border-gray-100/60 rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300 overflow-hidden">
                                    <summary className="flex items-center justify-between p-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                                        <h3 className="text-lg font-bold text-[#0A1628] pr-8">{faq.question}</h3>
                                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 group-open:bg-gradient-to-br group-open:from-amber-500 group-open:to-amber-400 group-open:text-white transition-all duration-300">
                                            <span className="text-xl leading-none font-medium transform group-open:rotate-45 transition-transform duration-300">+</span>
                                        </div>
                                    </summary>
                                    <div className="px-6 pb-6 text-gray-500 leading-relaxed text-base border-t border-gray-50">
                                        <p className="pt-4">{faq.answer}</p>
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
