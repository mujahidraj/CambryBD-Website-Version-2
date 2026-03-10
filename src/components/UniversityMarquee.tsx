"use client";

import { GraduationCap } from "lucide-react";

export default function UniversityMarquee({ universities }: { universities: { name: string, imageUrl: string }[] }) {
    if (universities.length === 0) return null;

    const items = [...universities, ...universities];

    return (
        <section className="py-24 relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50">
            {/* Subtle mesh gradient */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-200 rounded-full blur-[140px]" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-100 rounded-full blur-[140px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14 text-center relative z-10">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-100/60 text-violet-600 text-[11px] font-bold uppercase tracking-[0.2em] mb-6 shadow-sm">
                    <GraduationCap className="w-3.5 h-3.5" /> Trusted Partners
                </div>
                <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0A1628] tracking-tight">
                    Partner Universities <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">Worldwide</span>
                </h2>
            </div>

            <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-slate-50 via-slate-50/90 to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-slate-50 via-slate-50/90 to-transparent z-10" />

                <div className="flex animate-marquee whitespace-nowrap">
                    {items.map((university, i) => (
                        <div
                            key={`${university.name}-${i}`}
                            className="inline-flex items-center justify-center mx-3 sm:mx-4 px-5 py-3 sm:py-3.5 bg-white/80 backdrop-blur-sm border border-gray-100/60 rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:bg-white transition-all duration-300 shrink-0 group"
                        >
                            <img
                                src={university.imageUrl}
                                alt={`${university.name} avatar`}
                                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                className="h-10 w-10 sm:h-11 sm:w-11 object-cover mr-3 sm:mr-4 rounded-xl border border-gray-100/50 group-hover:scale-110 transition-transform duration-300"
                            />
                            <span className="text-sm sm:text-base pr-2 font-semibold text-[#0A1628] whitespace-nowrap">{university.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
