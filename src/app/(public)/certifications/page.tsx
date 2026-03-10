export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Award, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { getActiveCertifications } from "@/actions/certifications";
import PageHero from "@/components/PageHero";
import TrustBanner from "@/components/TrustBanner";
import UrgencyCTA from "@/components/UrgencyCTA";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/MotionWrappers";

export const metadata: Metadata = {
    title: "Our Certifications & Accreditations | Cambry International Admission Centre",
    description: "Cambry is a certified and accredited international admission centre. See our credentials from the British Council, ICEF, and other leading education bodies.",
};

export default async function CertificationsPage() {
    let certifications: any[] = [];
    try { certifications = await getActiveCertifications(); } catch { }

    return (
        <>
            {/* 1. Hero */}
            <PageHero
                badge="Verified & Certified"
                badgeIcon={ShieldCheck}
                title={<>Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">Certifications</span></>}
                subtitle="Recognized and certified by leading international education bodies, ensuring you receive the highest quality guidance."
                backgroundImage="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=1920&q=80"
                backgroundAlt="Certificates and awards"
            />

            {/* 2. Trust */}
            <TrustBanner />

            {/* 3. Why Certifications Matter */}
            <section className="py-28 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-50/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <FadeIn direction="up">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100/60 text-emerald-600 text-[11px] font-bold uppercase tracking-[0.2em] mb-6 shadow-sm">
                                <Sparkles className="w-3.5 h-3.5" /> Trust & Credibility
                            </div>
                            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0A1628] tracking-tight">Why Our Certifications Matter</h2>
                            <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">Working with a certified agency means your applications are handled by trained professionals who meet international standards.</p>
                        </div>
                    </FadeIn>
                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Verified Expertise", desc: "Our counselors are trained and certified by leading education bodies worldwide.", gradient: "from-emerald-500 to-teal-400" },
                            { title: "Ethical Standards", desc: "We adhere to strict ethical guidelines set by our certifying organizations.", gradient: "from-blue-500 to-cyan-400" },
                            { title: "University Trust", desc: "Partner universities prioritize applications from certified agents like Cambry.", gradient: "from-violet-500 to-purple-400" },
                        ].map((item) => (
                            <StaggerItem key={item.title}>
                                <div className="bg-white border border-gray-100/60 rounded-3xl p-10 text-center shadow-[0_2px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group h-full">
                                    <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:scale-110 transition-transform`}>
                                        <CheckCircle2 className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-[#0A1628] mb-3">{item.title}</h3>
                                    <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* 4. Certifications Grid */}
            <section className="py-28 bg-gradient-to-b from-slate-50 to-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <FadeIn direction="up">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100/60 text-amber-600 text-[11px] font-bold uppercase tracking-[0.2em] mb-6 shadow-sm">
                                <Award className="w-3.5 h-3.5" /> Our Credentials
                            </div>
                            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0A1628] tracking-tight">Certifications & Accreditations</h2>
                        </div>
                    </FadeIn>
                    {certifications.length > 0 ? (
                        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {certifications.map((cert: any) => (
                                <StaggerItem key={cert.id}>
                                    <div className="bg-white border border-gray-100/60 rounded-3xl overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] transition-all duration-300 group hover:-translate-y-1 h-full flex flex-col">
                                        <div className="aspect-[4/3] bg-slate-50 overflow-hidden">
                                            <img
                                                src={cert.imageUrl}
                                                alt={cert.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                        </div>
                                        <div className="p-7 flex-1 flex flex-col">
                                            <div className="flex items-center gap-2 mb-3">
                                                <Award className="w-5 h-5 text-amber-500" />
                                                <span className="text-[11px] font-bold text-amber-500 uppercase tracking-[0.15em]">{cert.issuingBody}</span>
                                            </div>
                                            <h3 className="text-lg font-bold text-[#0A1628] mb-2">{cert.title}</h3>
                                            <p className="text-gray-500 text-sm leading-relaxed mb-3 flex-1">{cert.description}</p>
                                            {cert.dateIssued && (
                                                <p className="text-xs text-gray-400 font-medium">Issued: {new Date(cert.dateIssued).toLocaleDateString("en-US", { year: "numeric", month: "long" })}</p>
                                            )}
                                        </div>
                                    </div>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    ) : (
                        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { title: "British Council Certified Agent", body: "Recognized partner meeting the highest standards for student recruitment and support.", org: "British Council", gradient: "from-blue-500 to-cyan-400" },
                                { title: "ICEF Trained Agent", body: "Completed rigorous training program for international student placement professionals.", org: "ICEF", gradient: "from-amber-500 to-yellow-400" },
                                { title: "Education New Zealand Recognized", body: "Authorized representative for New Zealand educational institutions.", org: "Education NZ", gradient: "from-emerald-500 to-teal-400" },
                            ].map((item) => (
                                <StaggerItem key={item.title}>
                                    <div className="bg-white border border-gray-100/60 rounded-3xl p-8 shadow-[0_2px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group h-full">
                                        <div className={`w-14 h-14 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                                            <Award className="w-7 h-7 text-white" />
                                        </div>
                                        <span className="text-[11px] font-bold text-amber-500 uppercase tracking-[0.15em]">{item.org}</span>
                                        <h3 className="text-lg font-bold text-[#0A1628] mb-2 mt-2">{item.title}</h3>
                                        <p className="text-gray-500 text-sm leading-relaxed">{item.body}</p>
                                    </div>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    )}
                </div>
            </section>

            {/* 5. CTA */}
            <section className="py-28 bg-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-emerald-50/30" />
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <FadeIn direction="up">
                        <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0A1628] tracking-tight mb-4">Work With a Certified Agency</h2>
                        <p className="text-gray-500 mb-10 text-lg max-w-xl mx-auto">
                            Choose confidence. Choose expertise. Book a free consultation with our certified counselors today.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-2xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-[0_20px_60px_rgba(245,158,11,0.3)] hover:shadow-[0_25px_70px_rgba(245,158,11,0.4)] hover:-translate-y-0.5 text-lg group"
                        >
                            Book Free Consultation <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </FadeIn>
                </div>
            </section>

            {/* 6. Urgency CTA */}
            <UrgencyCTA />
        </>
    );
}
