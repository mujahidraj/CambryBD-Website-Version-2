"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, GraduationCap, ArrowRight, MapPin, Building2 } from "lucide-react";
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
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <FadeIn direction="up">
                    <div className="text-center mb-12">
                        <span className="text-[var(--brand-yellow)] font-bold text-sm uppercase tracking-widest">Find Your Fit</span>
                        <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0A1628] mt-3 tracking-tight">University & Program Finder</h2>
                        <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">Search and filter from our highly-ranked partner universities to find your perfect academic match.</p>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-12 max-w-3xl mx-auto bg-white p-3 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative z-20">
                        <div className="relative flex-1 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[var(--brand-yellow)] transition-colors" />
                            <input
                                type="text"
                                placeholder="Search by university name..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3.5 bg-gray-50/50 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--brand-yellow)]/20 focus:border-[var(--brand-yellow)]/30 border border-transparent transition-all"
                            />
                        </div>
                        <div className="w-full sm:w-64 relative group">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[var(--brand-blue)] transition-colors pointer-events-none" />
                            <select
                                value={selectedCountry}
                                onChange={(e) => setSelectedCountry(e.target.value)}
                                className="w-full pl-12 pr-10 py-3.5 bg-gray-50/50 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)]/20 focus:border-[var(--brand-blue)]/30 border border-transparent appearance-none transition-all cursor-pointer font-medium text-gray-700"
                            >
                                <option value="">All Destinations</option>
                                {countries.map((c) => (
                                    <option key={c.id} value={c.slug}>{c.name}</option>
                                ))}
                            </select>
                            {/* Custom caret */}
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
                                className="block bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1 transition-all duration-300 group h-full relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
                                
                                <div className="flex items-start gap-4 relative z-10">
                                    {uni.imageUrl ? (
                                        <div className="w-14 h-14 rounded-xl flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300 border border-gray-100 overflow-hidden bg-white">
                                            <img src={uni.imageUrl} alt={uni.name} className="w-full h-full object-cover" />
                                        </div>
                                    ) : (
                                        <div className="w-14 h-14 bg-gradient-to-br from-[var(--brand-blue)] to-[#0A1628] rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                                            <Building2 className="w-6 h-6 text-white" />
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0 pt-1">
                                        <h3 className="font-bold text-[#0A1628] group-hover:text-[var(--brand-yellow)] transition-colors truncate text-[17px]">{uni.name}</h3>
                                        <p className="text-sm text-gray-500 mt-1 flex items-center gap-1.5 line-clamp-1">
                                            <MapPin className="w-3.5 h-3.5" />
                                            {uni.location}
                                        </p>
                                        <div className="flex items-center justify-between mt-4">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-0.5">Est. Tuition</span>
                                                <span className="text-sm font-bold text-[var(--brand-blue)]">{uni.tuitionEstimate}</span>
                                            </div>
                                            <div className="px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg shadow-sm">
                                                <span className="text-xs font-semibold text-gray-700">{uni.country?.name || "Global"}</span>
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
                        <div className="text-center py-16 bg-gray-50 border border-gray-100 rounded-2xl">
                            <Building2 className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                            <p className="text-lg font-medium text-gray-600">No universities match your criteria.</p>
                            <p className="text-gray-400 text-sm mt-1">Try adjusting your search or destination filter.</p>
                        </div>
                    </FadeIn>
                )}

                {filtered.length > 12 && (
                    <FadeIn direction="up">
                        <div className="text-center mt-12">
                            <Link href="/destinations" className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-gray-100 text-[#0A1628] font-bold rounded-full hover:border-[var(--brand-blue)] hover:bg-gray-50 hover:shadow-lg transition-all duration-300 group">
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
