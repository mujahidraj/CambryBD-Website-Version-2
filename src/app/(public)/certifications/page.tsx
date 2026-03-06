export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Award, CheckCircle2, ArrowRight } from "lucide-react";
import { getActiveCertifications } from "@/actions/certifications";
import TrustBanner from "@/components/TrustBanner";
import UrgencyCTA from "@/components/UrgencyCTA";

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
            <section className="relative min-h-screen flex items-center justify-center pt-20 pb-20 bg-[#0A1628] overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=1920&q=80"
                        alt="Certificates and awards"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[#0A1628]/80" />
                </div>
                <div className="absolute inset-0 opacity-15">
                    <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-[128px]" />
                    <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-blue-500 rounded-full blur-[100px]" />
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-up">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-600/30">
                        <ShieldCheck className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
                        Our Certifications & <span className="text-[var(--brand-yellow)]">Accreditations</span>
                    </h1>
                    <p className="text-gray-300 mt-6 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
                        Cambry is recognized and certified by leading international education bodies, ensuring you receive
                        the highest quality guidance for your study abroad journey.
                    </p>
                </div>
            </section>

            {/* 2. Trust */}
            <TrustBanner />

            {/* 3. Why Certifications Matter */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <span className="text-[var(--brand-blue)] font-semibold text-sm uppercase tracking-wider">Trust & Credibility</span>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">Why Our Certifications Matter</h2>
                        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
                            Working with a certified agency means your applications are handled by trained professionals
                            who meet international standards of quality and ethics.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Verified Expertise", desc: "Our counselors are trained and certified by leading education bodies worldwide." },
                            { title: "Ethical Standards", desc: "We adhere to strict ethical guidelines set by our certifying organizations." },
                            { title: "University Trust", desc: "Partner universities prioritize applications from certified agents like Cambry." },
                        ].map((item) => (
                            <div key={item.title} className="bg-[#F8F9FA] border border-gray-200 rounded-md p-8 text-center">
                                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-4" />
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Certifications Grid */}
            <section className="py-20 bg-[#F8F9FA]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <span className="text-[var(--brand-blue)] font-semibold text-sm uppercase tracking-wider">Our Credentials</span>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">Certifications & Accreditations</h2>
                    </div>
                    {certifications.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {certifications.map((cert: any) => (
                                <div key={cert.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all group">
                                    <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                                        <img
                                            src={cert.imageUrl}
                                            alt={cert.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Award className="w-5 h-5 text-[var(--brand-yellow)]" />
                                            <span className="text-xs font-semibold text-[var(--brand-yellow)] uppercase tracking-wider">{cert.issuingBody}</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">{cert.title}</h3>
                                        <p className="text-gray-500 text-sm leading-relaxed mb-3">{cert.description}</p>
                                        {cert.dateIssued && (
                                            <p className="text-xs text-gray-400">Issued: {new Date(cert.dateIssued).toLocaleDateString("en-US", { year: "numeric", month: "long" })}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { title: "British Council Certified Agent", body: "Recognized partner meeting the highest standards for student recruitment and support.", org: "British Council" },
                                { title: "ICEF Trained Agent", body: "Completed rigorous training program for international student placement professionals.", org: "ICEF" },
                                { title: "Education New Zealand Recognized", body: "Authorized representative for New Zealand educational institutions.", org: "Education NZ" },
                            ].map((item) => (
                                <div key={item.title} className="bg-white border border-gray-200 rounded-xl p-8">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Award className="w-5 h-5 text-[var(--brand-yellow)]" />
                                        <span className="text-xs font-semibold text-[var(--brand-yellow)] uppercase tracking-wider">{item.org}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{item.body}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* 5. CTA */}
            <section className="py-20 bg-white">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Work With a Certified Agency</h2>
                    <p className="text-gray-500 mb-8">
                        Choose confidence. Choose expertise. Book a free consultation with our certified counselors today.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--brand-yellow)] text-white font-semibold rounded-md hover:bg-[#D4660A] transition-all shadow-lg"
                    >
                        Book Free Consultation <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>

            {/* 6. Urgency CTA */}
            <UrgencyCTA />
        </>
    );
}
