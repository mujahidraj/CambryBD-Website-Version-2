export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import Link from "next/link";
import { getCountries } from "@/actions/countries";
import { getFaqs } from "@/actions/faqs";
import { ArrowRight, GraduationCap, Globe, Star, CheckCircle2, Briefcase } from "lucide-react";
import TrustBanner from "@/components/TrustBanner";
import ScholarshipSpotlight from "@/components/ScholarshipSpotlight";
import UrgencyCTA from "@/components/UrgencyCTA";

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
        { label: "Partner Universities", value: "50+", icon: GraduationCap },
        { label: "Countries", value: "5", icon: Globe },
        { label: "Visa Success Rate", value: "98%", icon: Star },
        { label: "Scholarships Secured", value: "200+", icon: Briefcase },
    ];

    return (
        <>
            {/* 1. Hero */}
            <section className="relative min-h-screen flex items-center justify-center pt-20 pb-20 bg-[#0A1628] overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?w=1920&q=80"
                        alt="World Map Destinations"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[#0A1628]/80" />
                </div>
                <div className="absolute inset-0 opacity-15">
                    <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[128px]" />
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-up">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white/10 backdrop-blur-lg border border-white/10 text-sm text-blue-300 mb-6 font-medium">
                        <Globe className="w-4 h-4 text-[var(--brand-yellow)]" />
                        Explore the World
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
                        Study <span className="text-[var(--brand-yellow)]">Destinations</span>
                    </h1>
                    <p className="text-gray-300 mt-6 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
                        Discover world-class education opportunities across top destination countries. Your dream university is waiting.
                    </p>
                    <Link href="/contact" className="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-[var(--brand-yellow)] text-white font-semibold rounded-md hover:bg-[#D4660A] transition-all shadow-xl animate-pulse-cta">
                        Book Free Consultation <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>

            {/* 2. Trust Banner */}
            <TrustBanner />

            {/* 3. Quick Stats */}
            <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {quickStats.map((s) => (
                            <div key={s.label} className="text-center p-6 bg-[#F8F9FA] border border-gray-200 rounded-md">
                                <s.icon className="w-8 h-8 text-[var(--brand-blue)] mx-auto mb-2" />
                                <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                                <p className="text-sm text-gray-500">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Countries Grid */}
            <section className="py-20 bg-[#F8F9FA]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <span className="text-[var(--brand-blue)] font-semibold text-sm uppercase tracking-wider">Explore</span>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">Choose Your Destination</h2>
                    </div>
                    {countries.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {countries.map((country) => (
                                <Link
                                    key={country.id}
                                    href={`/destinations/${country.slug}`}
                                    className="group bg-white border border-gray-200 rounded-md overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1"
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
                                            return <img src={src} alt={country.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />;
                                        })()}
                                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <h3 className="text-2xl font-bold text-white">{country.name}</h3>
                                            <div className="flex items-center gap-2 mt-2">
                                                <GraduationCap className="w-4 h-4 text-[var(--brand-yellow)]" />
                                                <span className="text-sm text-gray-200">{country.universities.length} Universities</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed">{country.description}</p>
                                        <div className="flex items-center gap-2 mt-4 text-[var(--brand-blue)] font-medium text-sm group-hover:gap-3 transition-all">
                                            Explore Universities <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-white rounded-md border border-gray-200">
                            <Globe className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-400">Destinations will appear once the database is seeded.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* 5. Why Study Abroad */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <span className="text-[var(--brand-blue)] font-semibold text-sm uppercase tracking-wider">Benefits</span>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">Why Study Abroad?</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { title: "Global Career Opportunities", desc: "An international degree opens doors to multinational companies and global career paths." },
                            { title: "Cultural Immersion", desc: "Experience new cultures, languages, and perspectives that shape you as a global citizen." },
                            { title: "World-Class Education", desc: "Study at universities ranked among the best in the world with cutting-edge curriculum." },
                        ].map((item) => (
                            <div key={item.title} className="p-6 bg-[#F8F9FA] border border-gray-200 rounded-md">
                                <CheckCircle2 className="w-8 h-8 text-[var(--brand-yellow)] mb-3" />
                                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. Scholarship Spotlight */}
            <ScholarshipSpotlight />

            {/* 9. Comparison Table */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <span className="text-[var(--brand-blue)] font-semibold text-sm uppercase tracking-wider">Compare</span>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">Country Comparison</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm border border-gray-200 rounded-md overflow-hidden">
                            <thead>
                                <tr className="bg-[#0A1628] text-white">
                                    <th className="p-4 text-left font-semibold">Feature</th>
                                    <th className="p-4 text-center font-semibold">UK</th>
                                    <th className="p-4 text-center font-semibold">Australia</th>
                                    <th className="p-4 text-center font-semibold">Canada</th>
                                    <th className="p-4 text-center font-semibold">Malaysia</th>
                                    <th className="p-4 text-center font-semibold">NZ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { feat: "Post-Study Work", uk: "2 years", au: "2-4 years", ca: "3 years", my: "1 year", nz: "3 years" },
                                    { feat: "Avg. Tuition/yr", uk: "£12-25K", au: "A$20-45K", ca: "C$15-35K", my: "MYR 15-40K", nz: "NZ$22-35K" },
                                    { feat: "IELTS Required", uk: "6.0-7.0", au: "6.0-7.0", ca: "6.0-6.5", my: "5.5-6.0", nz: "6.0-6.5" },
                                    { feat: "Study Gap", uk: "Flexible", au: "Moderate", ca: "Flexible", my: "Flexible", nz: "Moderate" },
                                    { feat: "MOI Accepted", uk: "Select Unis", au: "Select Unis", ca: "Select Unis", my: "Yes", nz: "Select Unis" },
                                ].map((row) => (
                                    <tr key={row.feat} className="border-t border-gray-100 hover:bg-[#F8F9FA]">
                                        <td className="p-4 font-medium text-gray-900">{row.feat}</td>
                                        <td className="p-4 text-center text-gray-600">{row.uk}</td>
                                        <td className="p-4 text-center text-gray-600">{row.au}</td>
                                        <td className="p-4 text-center text-gray-600">{row.ca}</td>
                                        <td className="p-4 text-center text-gray-600">{row.my}</td>
                                        <td className="p-4 text-center text-gray-600">{row.nz}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* 10. FAQ */}
            <section className="py-20 bg-[#F8F9FA]">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <span className="text-[var(--brand-blue)] font-semibold text-sm uppercase tracking-wider">Help</span>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">Common Questions</h2>
                    </div>
                    <div className="space-y-3">
                        {(faqs.length > 0 ? faqs : [
                            { question: "Which country is best for me?", answer: "It depends on your budget, career goals, and academic profile. Book a free consultation and we'll help you decide." },
                            { question: "Can I work while studying?", answer: "Yes! Most countries allow 20 hours/week part-time work during term and full-time during breaks." },
                        ]).map((faq: any, i: number) => (
                            <details key={i} className="group bg-white border border-gray-200 rounded-md">
                                <summary className="flex items-center justify-between p-4 cursor-pointer text-sm font-semibold text-gray-900">
                                    {faq.question}
                                    <span className="text-gray-400 group-open:rotate-45 transition-transform text-lg">+</span>
                                </summary>
                                <div className="px-4 pb-4 text-sm text-gray-500">{faq.answer}</div>
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
