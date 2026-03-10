export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getFaqs } from "@/actions/faqs";
import { ArrowRight, GraduationCap, MapPin, Award, BookOpen, CheckCircle2, Globe, Briefcase, Clock, FileText, CheckCircle, Plane } from "lucide-react";
import PageHero from "@/components/PageHero";
import TrustBanner from "@/components/TrustBanner";
import ScholarshipSpotlight from "@/components/ScholarshipSpotlight";
import UrgencyCTA from "@/components/UrgencyCTA";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/MotionWrappers";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const country = await prisma.country.findUnique({ where: { slug } });
    return {
        title: country ? `Study in ${country.name} | Cambry` : "Country | Cambry",
        description: country?.description?.slice(0, 160),
    };
}

export default async function CountryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const country = await prisma.country.findUnique({
        where: { slug },
        include: {
            universities: {
                include: {
                    englishReqs: true,
                    scholarships: true,
                    courses: true,
                },
            },
        },
    });

    if (!country) notFound();

    let faqs: any[] = [];
    try { faqs = await getFaqs(country.name); } catch { }

    const allScholarships = country.universities.flatMap(u => u.scholarships);
    const allEnglishReqs = country.universities.flatMap(u => u.englishReqs);
    const allCourses = country.universities.flatMap(u => u.courses);

    // Parse the infographic JSON securely
    const infographic = country.infographicData ? (country.infographicData as any) : null;

    // Fetch flag from REST Countries API if not available in DB or if it's an emoji (doesn't start with http)
    let flagUrl = country.flagUrl;
    if (!flagUrl || !flagUrl.startsWith('http')) {
        try {
            // Using a more exact search to prevent getting a multi-result array where index 0 might be a partial match
            const res = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(country.name)}?fullText=true`);
            if (res.ok) {
                const data = await res.json();
                flagUrl = data[0]?.flags?.svg || data[0]?.flags?.png || flagUrl; // fallback to original if missing
            } else {
                // Fallback to broader search if fullText fails
                const fallbackRes = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(country.name)}`);
                if (fallbackRes.ok) {
                    const fallbackData = await fallbackRes.json();
                    flagUrl = fallbackData[0]?.flags?.svg || fallbackData[0]?.flags?.png || flagUrl;
                }
            }
        } catch (e) {
            console.error("Failed to fetch flag", e);
        }
    }

    return (
        <>
            {/* 1. Hero */}
            <PageHero
                badge="Destinations"
                badgeIcon={MapPin}
                title={<>Study in <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">{country.name}</span>
                    {flagUrl && flagUrl.startsWith('http') ? (
                        <img src={flagUrl} alt={`${country.name} flag`} className="w-16 h-12 md:w-24 md:h-16 rounded-xl shadow-lg object-cover inline-block ml-4" />
                    ) : flagUrl ? (
                        <span className="text-4xl md:text-6xl inline-block ml-4">{flagUrl}</span>
                    ) : null}
                </>}
                subtitle={country.description || `Explore study opportunities in ${country.name}.`}
                backgroundImage={flagUrl || country.imageUrl}
                backgroundAlt={country.name}
                cta={{ label: "Start Your Application", href: "/contact" }}
            />

            {/* 2. Trust */}
            <TrustBanner />

            {/* 3. Quick Facts */}
            <section className="py-16 bg-white relative -mt-8 z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { label: "Partner Universities", value: `${country.universities.length}`, icon: GraduationCap, gradient: "from-blue-500 to-cyan-400" },
                            { label: "Available Scholarships", value: `${allScholarships.length}`, icon: Award, gradient: "from-amber-500 to-yellow-400" },
                            { label: "Total Programs", value: `${country.universities.reduce((a, u) => a + u.courses.length, 0)}`, icon: BookOpen, gradient: "from-green-500 to-emerald-400" },
                            { label: "Local Currency", value: `${country.currency || 'N/A'}`, icon: Briefcase, gradient: "from-purple-500 to-violet-400" },
                        ].map((s) => (
                            <StaggerItem key={s.label} className="text-center p-8 bg-white border border-gray-100/60 rounded-3xl shadow-[0_2px_16px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-300 group">
                                <div className={`w-14 h-14 bg-gradient-to-br ${s.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                                    <s.icon className="w-7 h-7 text-white" />
                                </div>
                                <p className="text-3xl font-extrabold text-[#0A1628] mb-1">{s.value}</p>
                                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">{s.label}</p>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* NEW: Infographic Data Sections */}
            {infographic && (
                <>
                    {/* Why Study Here */}
                    {infographic.whyStudy && infographic.whyStudy.length > 0 && (
                        <section className="py-28 bg-gradient-to-b from-[var(--off-white)] to-white relative">
                            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/30 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/3 pointer-events-none" />
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                                <FadeIn direction="up">
                                    <div className="text-center mb-16">
                                        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100/60 text-emerald-600 text-[11px] font-bold uppercase tracking-[0.2em] mb-6 shadow-sm">
                                            <CheckCircle className="w-3.5 h-3.5" /> Benefits
                                        </div>
                                        <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0A1628] tracking-tight">Why Study in {country.name}?</h2>
                                    </div>
                                </FadeIn>
                                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {infographic.whyStudy.map((reason: string, idx: number) => (
                                        <StaggerItem key={idx} className="bg-white p-8 rounded-3xl border border-gray-100/60 shadow-[0_2px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] flex items-start gap-6 hover:-translate-y-1 transition-all duration-300 group">
                                            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-400 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                                <CheckCircle className="w-6 h-6 text-white" />
                                            </div>
                                            <div className="pt-1">
                                                <h3 className="font-bold text-[#0A1628] text-[17px] leading-relaxed">{reason}</h3>
                                            </div>
                                        </StaggerItem>
                                    ))}
                                </StaggerContainer>
                            </div>
                        </section>
                    )}

                    {/* Timeline */}
                    {infographic.timeline && infographic.timeline.length > 0 && (
                        <section className="py-28 bg-white relative overflow-hidden">
                            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-amber-50/30 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                                <FadeIn direction="up">
                                    <div className="text-center mb-16">
                                        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-100/60 text-amber-600 text-[11px] font-bold uppercase tracking-[0.2em] mb-6 shadow-sm">
                                            <Clock className="w-3.5 h-3.5" /> Process
                                        </div>
                                        <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0A1628] tracking-tight">Application Timeline</h2>
                                    </div>
                                </FadeIn>
                                <div className="max-w-4xl mx-auto">
                                    <div className="relative space-y-4 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:ml-[50%] md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-transparent before:via-blue-100 before:to-transparent">
                                        {infographic.timeline.map((item: any, idx: number) => (
                                            <FadeIn key={idx} direction={idx % 2 === 0 ? "right" : "left"} delay={idx * 0.1}>
                                                <div className={`relative flex items-center justify-between md:justify-normal ${idx % 2 === 0 ? "md:flex-row-reverse" : ""} group is-active`}>
                                                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-gradient-to-br from-amber-500 to-amber-400 text-white shadow-lg shrink-0 z-10 group-hover:scale-110 transition-transform duration-300 md:absolute md:left-1/2 md:-translate-x-1/2`}>
                                                        <span className="font-bold text-sm">{item.step}</span>
                                                    </div>
                                                    
                                                    <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-5 rounded-3xl bg-white shadow-[0_2px_16px_rgba(0,0,0,0.04)] border border-gray-100/60 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-300 group-hover:-translate-y-1 relative overflow-hidden">
                                                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[var(--brand-yellow)]/5 to-transparent rounded-full blur-xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                        <div className="relative z-10">
                                                            <div className="flex items-center justify-between mb-2">
                                                                <h3 className="font-bold text-lg text-[#0A1628]">{item.title}</h3>
                                                            </div>
                                                            <p className="text-xs font-bold text-amber-600 flex items-center gap-1.5 uppercase tracking-wider">
                                                                <Clock className="w-3.5 h-3.5" /> {item.duration}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </FadeIn>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Work Rights & Entry Requirements Grid */}
                    <section className="py-28 bg-[#0A1628] text-white relative overflow-hidden">
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
                        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                
                                {/* Work Rights */}
                                {infographic.workRights && (
                                    <FadeIn direction="right">
                                        <div className="bg-white/[0.06] p-10 rounded-3xl border border-white/[0.08] backdrop-blur-2xl hover:bg-white/[0.1] transition-colors duration-300 group h-full">
                                            <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-yellow-400 rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform">
                                                <Briefcase className="w-8 h-8 text-white" />
                                            </div>
                                            <h3 className="text-3xl font-bold mb-8 tracking-tight">Work Rights</h3>
                                            <div className="space-y-8">
                                                {infographic.workRights.duringStudy && (
                                                    <div className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-amber-400 before:rounded-full">
                                                        <p className="text-blue-200 text-sm font-bold uppercase tracking-widest mb-2">During Study</p>
                                                        <p className="text-xl font-medium leading-relaxed">{infographic.workRights.duringStudy}</p>
                                                    </div>
                                                )}
                                                {infographic.workRights.postStudy && (
                                                    <div className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-amber-400 before:rounded-full">
                                                        <p className="text-blue-200 text-sm font-bold uppercase tracking-widest mb-2">Post-Study Work Visa</p>
                                                        <p className="text-xl font-medium leading-relaxed">{infographic.workRights.postStudy}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </FadeIn>
                                )}

                                {/* Entry Requirements */}
                                {infographic.entryRequirements && (
                                    <FadeIn direction="left" delay={0.2}>
                                        <div className="bg-white/[0.06] p-10 rounded-3xl border border-white/[0.08] backdrop-blur-2xl hover:bg-white/[0.1] transition-colors duration-300 group h-full">
                                            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform">
                                                <FileText className="w-8 h-8 text-white" />
                                            </div>
                                            <h3 className="text-3xl font-bold mb-8 tracking-tight">Entry Requirements</h3>
                                            <div className="space-y-8">
                                                {infographic.entryRequirements.bachelors && (
                                                    <div className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-blue-400 before:rounded-full">
                                                        <p className="text-blue-200 text-sm font-bold uppercase tracking-widest mb-2">Bachelors Program</p>
                                                        <p className="text-lg font-medium leading-relaxed">{infographic.entryRequirements.bachelors}</p>
                                                    </div>
                                                )}
                                                {infographic.entryRequirements.masters && (
                                                    <div className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-blue-400 before:rounded-full">
                                                        <p className="text-blue-200 text-sm font-bold uppercase tracking-widest mb-2">Masters Program</p>
                                                        <p className="text-lg font-medium leading-relaxed">{infographic.entryRequirements.masters}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </FadeIn>
                                )}
                            </div>
                        </div>
                    </section>
                </>
            )}

            {/* 4. Universities Grid */}
            <section className="py-28 bg-gradient-to-b from-[var(--off-white)] to-white relative">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <FadeIn direction="up">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100/60 text-blue-600 text-[11px] font-bold uppercase tracking-[0.2em] mb-6 shadow-sm">
                                <GraduationCap className="w-3.5 h-3.5" /> Universities
                            </div>
                            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0A1628] tracking-tight">Partner Universities in {country.name}</h2>
                        </div>
                    </FadeIn>
                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {country.universities.map((uni) => (
                            <StaggerItem key={uni.id}>
                                <a href={uni.website || "#"} target="_blank" rel="noopener noreferrer" className="block bg-white border border-gray-100/60 rounded-3xl overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 group h-full">
                                    <div className="relative h-56 overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/60 via-transparent to-transparent group-hover:from-[#0A1628]/40 transition-colors duration-500 z-10" />
                                        <img src={uni.imageUrl} alt={uni.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                        {uni.ranking && (
                                            <div className="absolute top-4 left-4 px-4 py-1.5 bg-white/95 backdrop-blur-md rounded-full text-xs font-extrabold text-[#0A1628] shadow-lg z-20 flex items-center gap-1.5">
                                                <Award className="w-3.5 h-3.5 text-amber-500" /> #{uni.ranking} World
                                            </div>
                                        )}
                                        <div className="absolute bottom-4 right-4 w-10 h-10 bg-white/95 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg z-20 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                            <ArrowRight className="w-5 h-5 text-amber-500" />
                                        </div>
                                    </div>
                                    <div className="p-8">
                                        <h3 className="font-bold text-xl text-[#0A1628] leading-tight mb-3">{uni.name}</h3>
                                        <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                                            <MapPin className="w-4 h-4 text-gray-400" /> {uni.location}
                                        </div>
                                        <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Est. Tuition</span>
                                                <span className="text-base font-extrabold text-[#0A1628]">{uni.tuitionEstimate}</span>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* NEW: Available Courses Section */}
            {allCourses.length > 0 && (
                <section className="py-28 bg-white relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <FadeIn direction="up">
                            <div className="text-center mb-16">
                                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-100/60 text-purple-600 text-[11px] font-bold uppercase tracking-[0.2em] mb-6 shadow-sm">
                                    <BookOpen className="w-3.5 h-3.5" /> Programs
                                </div>
                                <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0A1628] tracking-tight">Available Courses in {country.name}</h2>
                                <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">Explore top-tier bachelor's and master's programs across our partner institutions.</p>
                            </div>
                        </FadeIn>
                        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {allCourses.map((course) => {
                                const uni = country.universities.find(u => u.id === course.universityId);
                                return (
                                    <StaggerItem key={course.id}>
                                        <div className="bg-white border border-gray-100/60 rounded-3xl p-8 shadow-[0_2px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group h-full flex flex-col relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50/50 to-transparent rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            
                                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 text-blue-600 text-xs font-extrabold rounded-full mb-6 uppercase tracking-widest w-fit">
                                                <GraduationCap className="w-4 h-4" />
                                                {course.level}
                                            </div>
                                            <h3 className="text-xl font-bold text-[#0A1628] line-clamp-2 leading-tight mb-4 flex-1">{course.title}</h3>
                                            
                                            <div className="space-y-4 mb-6 flex-1">
                                                <div className="text-sm font-semibold text-gray-600 flex items-center gap-3">
                                                    {uni?.imageUrl ? (
                                                        <img src={uni.imageUrl} alt={uni.name} className="w-8 h-8 rounded-full object-cover border border-gray-200 shadow-sm" />
                                                    ) : (
                                                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center border border-gray-200 shadow-sm">
                                                            <MapPin className="w-4 h-4 text-gray-400" />
                                                        </div>
                                                    )}
                                                    <span className="line-clamp-1">{uni?.name}</span>
                                                </div>
                                                <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">{course.description}</p>
                                            </div>

                                            <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-auto">
                                                <div className="flex items-center gap-2 text-gray-500 font-medium text-sm">
                                                    <Clock className="w-4 h-4 text-amber-500" /> {course.duration}
                                                </div>
                                                <div className="text-right">
                                                    <span className="block text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-0.5">Avg/Year</span>
                                                    <span className="text-sm font-extrabold text-[#0A1628]">{uni?.tuitionEstimate?.split(" ")[0]}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </StaggerItem>
                                );
                            })}
                        </StaggerContainer>
                    </div>
                </section>
            )}

            {/* 5. English Requirements */}
            {allEnglishReqs.length > 0 && (
                <section className="py-28 bg-gradient-to-b from-[var(--off-white)] to-white relative">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <FadeIn direction="up">
                            <div className="text-center mb-16">
                                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-100/60 text-amber-600 text-[11px] font-bold uppercase tracking-[0.2em] mb-6 shadow-sm">
                                    <FileText className="w-3.5 h-3.5" /> Requirements
                                </div>
                                <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0A1628] tracking-tight">English Language Requirements</h2>
                            </div>
                        </FadeIn>
                        <FadeIn direction="up" delay={0.2}>
                            <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-gray-100/60 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-base">
                                        <thead>
                                            <tr className="bg-[#0A1628] text-white">
                                                <th className="px-8 py-5 text-left font-bold uppercase tracking-wider text-sm">Test</th>
                                                <th className="px-8 py-5 text-left font-bold uppercase tracking-wider text-sm">Minimum Score</th>
                                                <th className="px-8 py-5 text-center font-bold uppercase tracking-wider text-sm">MOI Accepted</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {allEnglishReqs.slice(0, 10).map((req) => (
                                                <tr key={req.id} className="hover:bg-amber-50/30 transition-colors duration-200">
                                                    <td className="px-8 py-6 font-bold text-[#0A1628]">{req.testName}</td>
                                                    <td className="px-8 py-6 text-gray-600 font-medium">{req.minimumScore}</td>
                                                    <td className="px-8 py-6">
                                                        {req.acceptsMOI ? (
                                                            <div className="flex items-center justify-center">
                                                                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                                                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="text-center text-gray-400 font-bold">—</div>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </section>
            )}

            {/* 6. Scholarships */}
            {allScholarships.length > 0 && (
                <section className="py-28 bg-white relative">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-50/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <FadeIn direction="up">
                            <div className="text-center mb-16">
                                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-100/60 text-amber-600 text-[11px] font-bold uppercase tracking-[0.2em] mb-6 shadow-sm">
                                    <Award className="w-3.5 h-3.5" /> Financial Aid
                                </div>
                                <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0A1628] tracking-tight">Scholarships in {country.name}</h2>
                            </div>
                        </FadeIn>
                        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {allScholarships.map((s) => (
                                <StaggerItem key={s.id} className="bg-white border border-gray-100/60 rounded-3xl p-8 shadow-[0_2px_16px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-300 group h-full relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-50 to-transparent rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                    <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-yellow-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                                        <Award className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="font-bold text-[#0A1628] text-xl mb-3 leading-tight">{s.name}</h3>
                                    <div className="inline-block px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-400 rounded-xl text-white font-extrabold text-sm mb-4 shadow-md">
                                        {s.amount}
                                    </div>
                                    <p className="text-base text-gray-500 leading-relaxed max-w-sm line-clamp-3">{s.description}</p>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    </div>
                </section>
            )}


            {/* 9. Visa Requirements */}
            <section className="py-28 bg-white relative">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <FadeIn direction="up">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100/60 text-blue-600 text-[11px] font-bold uppercase tracking-[0.2em] mb-6 shadow-sm">
                                <Plane className="w-3.5 h-3.5" /> Visa Info
                            </div>
                            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0A1628] tracking-tight">Visa Requirements</h2>
                        </div>
                    </FadeIn>
                    <FadeIn direction="up" delay={0.2}>
                        <div className="bg-white border border-gray-100/60 rounded-3xl p-10 md:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.06)] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/30 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 group-hover:bg-blue-50/50 transition-colors" />
                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mb-8 shadow-lg">
                                    <Globe className="w-7 h-7 text-white" />
                                </div>
                                <p className="text-gray-600 leading-relaxed text-lg md:text-xl font-medium">{country.visaRequirements}</p>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* 10. FAQ */}
            <section className="py-28 bg-gradient-to-b from-[var(--off-white)] to-white relative">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <FadeIn direction="up">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100/60 text-blue-600 text-[11px] font-bold uppercase tracking-[0.2em] mb-6 shadow-sm">
                                <Globe className="w-3.5 h-3.5" /> Support
                            </div>
                            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0A1628] tracking-tight">FAQ about {country.name}</h2>
                        </div>
                    </FadeIn>
                    <div className="space-y-4">
                        {(faqs.length > 0 ? faqs : [
                            { question: `What IELTS score do I need for ${country.name}?`, answer: "Requirements vary by university, but typically range from 6.0 to 7.0 overall. Some universities accept alternative tests like PTE, TOEFL, or Duolingo." },
                            { question: `Can I work while studying in ${country.name}?`, answer: "Yes, international students can usually work part-time (20 hours/week) during term and full-time during breaks." },
                        ]).map((faq: any, i: number) => (
                            <FadeIn key={i} direction="up" delay={i * 0.1}>
                                <details className="group bg-white border border-gray-100/60 rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300 overflow-hidden">
                                    <summary className="flex items-center justify-between p-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                                        <h3 className="text-lg font-bold text-[#0A1628] pr-8">{faq.question}</h3>
                                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 group-open:bg-gradient-to-br group-open:from-amber-500 group-open:to-amber-400 group-open:text-white transition-colors duration-300">
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
