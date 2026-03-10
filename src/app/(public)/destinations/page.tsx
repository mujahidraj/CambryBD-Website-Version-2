export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import Link from "next/link";
import { getCountries } from "@/actions/countries";
import { getFaqs } from "@/actions/faqs";
import { ArrowRight, GraduationCap, Globe, Star, CheckCircle2, Briefcase, Sparkles, MapPin } from "lucide-react";
import PageHero from "@/components/PageHero";
import TrustBanner from "@/components/TrustBanner";
import ScholarshipSpotlight from "@/components/ScholarshipSpotlight";
import UrgencyCTA from "@/components/UrgencyCTA";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/MotionWrappers";

export const metadata: Metadata = {
    title: "Study Destinations | Cambry International Admission Centre",
    description: "Explore top study destinations — UK, Australia, Canada, Malaysia, New Zealand. Expert guidance for international students.",
};

export default async function DestinationsPage() {
    let countries: Awaited<ReturnType<typeof getCountries>> = [];
    let faqs: any[] = [];
    try {
        [countries, faqs] = await Promise.all([
            getCountries(),
            getFaqs("General"),
        ]);
    } catch { }

    const quickStats = [
        { label: "Partner Universities", value: "50+", icon: GraduationCap, gradient: "from-blue-500 to-cyan-400" },
        { label: "Countries", value: "5", icon: Globe, gradient: "from-amber-500 to-yellow-400" },
        { label: "Visa Success Rate", value: "98%", icon: Star, gradient: "from-green-500 to-emerald-400" },
        { label: "Scholarships Secured", value: "200+", icon: Briefcase, gradient: "from-purple-500 to-violet-400" },
    ];

    return (
        <>
            {/* 1. Hero */}
            <PageHero
                badge="Explore the World"
                badgeIcon={Globe}
                title={<>Study <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">Destinations</span></>}
                subtitle="Discover world-class education opportunities across top destination countries. Your dream university is waiting."
                backgroundImage="https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?w=1920&q=80"
                backgroundAlt="World Map Destinations"
                cta={{ label: "Book Free Consultation", href: "/contact" }}
            />

            {/* 2. Trust Banner */}
            <TrustBanner />

            {/* 3. Quick Stats */}
            <section className="py-16 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {quickStats.map((s) => (
                            <StaggerItem key={s.label} className="text-center p-8 bg-white border border-gray-100/60 rounded-3xl shadow-[0_2px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group">
                                <div className={`w-14 h-14 bg-gradient-to-br ${s.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                                    <s.icon className="w-7 h-7 text-white" />
                                </div>
                                <p className="text-3xl font-extrabold text-[#0A1628]">{s.value}</p>
                                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">{s.label}</p>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* 4. Countries Grid */}
            <section className="py-28 bg-gradient-to-b from-[var(--off-white)] to-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100/60 text-blue-600 text-[11px] font-bold uppercase tracking-[0.2em] mb-6 shadow-sm">
                            <MapPin className="w-3.5 h-3.5" /> Explore
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0A1628] tracking-tight">Choose Your Destination</h2>
                    </div>
                    {countries.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {countries.map((country) => (
                                <Link
                                    key={country.id}
                                    href={`/destinations/${country.slug}`}
                                    className="group bg-white border border-gray-100/60 rounded-3xl overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className="relative h-56 overflow-hidden bg-gray-100 flex justify-center items-center">
                                        {(() => {
                                            const flag = country.flagUrl;
                                            let src = country.imageUrl;
                                            if (flag) {
                                                if (flag.startsWith('http')) src = flag;
                                                else {
                                                    const codePoints = Array.from(flag).map(c => c.codePointAt(0)?.toString(16));
                                                    if (codePoints.length && codePoints.every(c => c)) {
                                                        src = `https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/${codePoints.join('-')}.svg`;
                                                    }
                                                }
                                            }
                                            return <img src={src} alt={country.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />;
                                        })()}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 via-[#0A1628]/20 to-transparent group-hover:from-[#0A1628]/60 transition-all duration-500" />
                                        <div className="absolute bottom-5 left-6 right-6">
                                            <h3 className="text-2xl font-extrabold text-white tracking-tight">{country.name}</h3>
                                            <div className="flex items-center gap-2 mt-2">
                                                <GraduationCap className="w-4 h-4 text-amber-400" />
                                                <span className="text-sm text-gray-200 font-medium">{country.universities.length} Universities</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed">{country.description}</p>
                                        <div className="flex items-center gap-2 mt-5 text-amber-600 font-bold text-sm group-hover:gap-3 transition-all">
                                            Explore Universities <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-white rounded-3xl border border-gray-100/60 shadow-[0_2px_16px_rgba(0,0,0,0.03)]">
                            <Globe className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-400">Destinations will appear once the database is seeded.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* 5. Why Study Abroad */}
            <section className="py-28 bg-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-50/30 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100/60 text-emerald-600 text-[11px] font-bold uppercase tracking-[0.2em] mb-6 shadow-sm">
                            <Sparkles className="w-3.5 h-3.5" /> Benefits
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0A1628] tracking-tight">Why Study Abroad?</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Global Career Opportunities", desc: "An international degree opens doors to multinational companies and global career paths.", gradient: "from-blue-500 to-cyan-400" },
                            { title: "Cultural Immersion", desc: "Experience new cultures, languages, and perspectives that shape you as a global citizen.", gradient: "from-amber-500 to-yellow-400" },
                            { title: "World-Class Education", desc: "Study at universities ranked among the best in the world with cutting-edge curriculum.", gradient: "from-purple-500 to-violet-400" },
                        ].map((item) => (
                            <div key={item.title} className="p-8 bg-white border border-gray-100/60 rounded-3xl shadow-[0_2px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group">
                                <div className={`w-14 h-14 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                                    <CheckCircle2 className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="font-bold text-lg text-[#0A1628] mb-3">{item.title}</h3>
                                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. Scholarship Spotlight */}
            <ScholarshipSpotlight />

            {/* 9. Comparison Table */}
            <section className="py-28 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-100/60 text-purple-600 text-[11px] font-bold uppercase tracking-[0.2em] mb-6 shadow-sm">
                            <Star className="w-3.5 h-3.5" /> Compare
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0A1628] tracking-tight">Country Comparison</h2>
                    </div>
                    <div className="overflow-x-auto rounded-3xl border border-gray-100/60 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-[#0A1628] text-white">
                                    <th className="p-5 text-left font-bold text-sm">Feature</th>
                                    <th className="p-5 text-center font-bold text-sm">UK</th>
                                    <th className="p-5 text-center font-bold text-sm">Australia</th>
                                    <th className="p-5 text-center font-bold text-sm">Canada</th>
                                    <th className="p-5 text-center font-bold text-sm">Malaysia</th>
                                    <th className="p-5 text-center font-bold text-sm">NZ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { feat: "Post-Study Work", uk: "2 years", au: "2-4 years", ca: "3 years", my: "1 year", nz: "3 years" },
                                    { feat: "Avg. Tuition/yr", uk: "£12-25K", au: "A$20-45K", ca: "C$15-35K", my: "MYR 15-40K", nz: "NZ$22-35K" },
                                    { feat: "IELTS Required", uk: "6.0-7.0", au: "6.0-7.0", ca: "6.0-6.5", my: "5.5-6.0", nz: "6.0-6.5" },
                                    { feat: "Study Gap", uk: "Flexible", au: "Moderate", ca: "Flexible", my: "Flexible", nz: "Moderate" },
                                    { feat: "MOI Accepted", uk: "Select Unis", au: "Select Unis", ca: "Select Unis", my: "Yes", nz: "Select Unis" },
                                ].map((row, i) => (
                                    <tr key={row.feat} className={`border-t border-gray-50 hover:bg-amber-50/30 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                                        <td className="p-5 font-bold text-[#0A1628]">{row.feat}</td>
                                        <td className="p-5 text-center text-gray-600">{row.uk}</td>
                                        <td className="p-5 text-center text-gray-600">{row.au}</td>
                                        <td className="p-5 text-center text-gray-600">{row.ca}</td>
                                        <td className="p-5 text-center text-gray-600">{row.my}</td>
                                        <td className="p-5 text-center text-gray-600">{row.nz}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* 10. FAQ */}
            <section className="py-28 bg-gradient-to-b from-[var(--off-white)] to-white relative">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100/60 text-blue-600 text-[11px] font-bold uppercase tracking-[0.2em] mb-6 shadow-sm">
                            <Star className="w-3.5 h-3.5" /> Help
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0A1628] tracking-tight">Common Questions</h2>
                    </div>
                    <div className="space-y-4">
                        {(faqs.length > 0 ? faqs : [
                            { question: "Which country is best for me?", answer: "It depends on your budget, career goals, and academic profile. Book a free consultation and we'll help you decide." },
                            { question: "Can I work while studying?", answer: "Yes! Most countries allow 20 hours/week part-time work during term and full-time during breaks." },
                        ]).map((faq: any, i: number) => (
                            <details key={i} className="group bg-white border border-gray-100/60 rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300 overflow-hidden">
                                <summary className="flex items-center justify-between p-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                                    <h3 className="text-lg font-bold text-[#0A1628] pr-8">{faq.question}</h3>
                                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 group-open:bg-gradient-to-br group-open:from-amber-500 group-open:to-amber-400 group-open:text-white transition-all duration-300">
                                        <span className="text-xl leading-none font-medium transform group-open:rotate-45 transition-transform duration-300">+</span>
                                    </div>
                                </summary>
                                <div className="px-6 pb-6 text-gray-500 leading-relaxed border-t border-gray-50">
                                    <p className="pt-4">{faq.answer}</p>
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>
            {/* 10. Urgency CTA */}
            <UrgencyCTA />
        </>
    );
}
