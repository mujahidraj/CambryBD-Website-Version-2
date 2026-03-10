"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, GraduationCap, ArrowRight, MapPin, Building2, Sparkles } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/MotionWrappers";

interface University {
    id: string;
    name: string;
    slug: string;
    location: string;
    tuitionEstimate: string;
    website?: string | null;
    imageUrl?: string | null;
    country: { name: string; slug: string };
}

interface Country {
    id: string;
    name: string;
    slug: string;
}

export default function UniversityFinder({
    universities,
    countries,
}: {
    universities: University[];
    countries: Country[];
}) {
    const [selectedCountry, setSelectedCountry] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const filtered = universities.filter((uni) => {
        if (!uni.country) return false;
        
        const matchesCountry = !selectedCountry || uni.country.slug.toLowerCase().trim() === selectedCountry.toLowerCase().trim();
        const matchesSearch = !searchQuery || uni.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCountry && matchesSearch;
    });

    return (
        <section className="py-28 bg-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/40 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-50/30 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <FadeIn direction="up">
                    <div className="text-center mb-14">
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100/60 text-amber-600 text-[11px] font-bold uppercase tracking-[0.2em] mb-6 shadow-sm">
                            <Sparkles className="w-3.5 h-3.5" /> Find Your Fit
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0A1628] tracking-tight">
                            University & Program <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Finder</span>
                        </h2>
                        <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">Search and filter from our highly-ranked partner universities to find your perfect academic match.</p>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-col sm:flex-row gap-3 mb-14 max-w-3xl mx-auto bg-white/80 backdrop-blur-xl p-3 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.06)] border border-gray-100/60 relative z-20">
                        <div className="relative flex-1 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-amber-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search by university name..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3.5 bg-slate-50/80 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-300/50 border border-transparent transition-all placeholder:text-gray-400/80"
                            />
                        </div>
                        <div className="w-full sm:w-64 relative group">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-violet-500 transition-colors pointer-events-none" />
                            <select
                                value={selectedCountry}
                                onChange={(e) => setSelectedCountry(e.target.value)}
                                className="w-full pl-12 pr-10 py-3.5 bg-slate-50/80 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-300/50 border border-transparent appearance-none transition-all cursor-pointer font-medium text-gray-700"
                            >
                                <option value="">All Destinations</option>
                                {countries.map((c) => (
                                    <option key={c.id} value={c.slug}>{c.name}</option>
                                ))}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                    </div>
                </FadeIn>

                {/* Results */}
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                    {filtered.slice(0, 12).map((uni) => (
                        <StaggerItem key={uni.id}>
                            <a
                                href={uni.website || (uni.country?.slug ? `/destinations/${uni.country.slug}` : "#")}
                                target={uni.website ? "_blank" : "_self"}
                                rel="noopener noreferrer"
                                className="block bg-white border border-gray-100/80 rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group h-full relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-50 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                
                                <div className="flex items-start gap-4 relative z-10">
                                    {uni.imageUrl ? (
                                        <div className="w-14 h-14 rounded-2xl flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300 border border-gray-100 overflow-hidden bg-white">
                                            <img src={uni.imageUrl} alt={uni.name} className="w-full h-full object-cover" />
                                        </div>
                                    ) : (
                                        <div className="w-14 h-14 bg-gradient-to-br from-[var(--trust-blue)] to-[#0A1628] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                                            <Building2 className="w-6 h-6 text-white" />
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0 pt-1">
                                        <h3 className="font-bold text-[#0A1628] group-hover:text-amber-600 transition-colors truncate text-[17px]">{uni.name}</h3>
                                        <p className="text-sm text-gray-500 mt-1 flex items-center gap-1.5 line-clamp-1">
                                            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                                            {uni.location}
                                        </p>
                                        <div className="flex items-center justify-between mt-4">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-0.5">Est. Tuition</span>
                                                <span className="text-sm font-bold text-[var(--trust-blue)]">{uni.tuitionEstimate}</span>
                                            </div>
                                            <div className="px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-xl">
                                                <span className="text-xs font-semibold text-gray-600">{uni.country?.name || "Global"}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </StaggerItem>
                    ))}
                </StaggerContainer>

                {filtered.length === 0 && (
                    <FadeIn direction="up">
                        <div className="text-center py-16 bg-gray-50/50 border border-gray-100 rounded-3xl">
                            <Building2 className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                            <p className="text-lg font-medium text-gray-600">No universities match your criteria.</p>
                            <p className="text-gray-400 text-sm mt-1">Try adjusting your search or destination filter.</p>
                        </div>
                    </FadeIn>
                )}

                {filtered.length > 12 && (
                    <FadeIn direction="up">
                        <div className="text-center mt-14">
                            <Link href="/destinations" className="inline-flex items-center gap-2 px-8 py-4 bg-[#0A1628] text-white font-bold rounded-2xl hover:bg-[#0A1628]/90 hover:shadow-[0_20px_60px_rgba(10,22,40,0.2)] transition-all duration-300 group">
                                Explore All {filtered.length} Universities 
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </FadeIn>
                )}
            </div>
        </section>
    );
}
