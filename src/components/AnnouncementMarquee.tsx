"use client";

import { Megaphone, Sparkles, Gift, GraduationCap, Info } from "lucide-react";

interface Announcement {
    id: string;
    title: string;
    content: string;
    type: string;
}

const typeIcons: Record<string, any> = {
    event: Sparkles,
    offer: Gift,
    scholarship: GraduationCap,
    general: Info,
};

const typeDots: Record<string, string> = {
    event: "bg-purple-400",
    offer: "bg-emerald-400",
    scholarship: "bg-amber-400",
    general: "bg-blue-400",
};

export default function AnnouncementMarquee({ announcements }: { announcements: Announcement[] }) {
    if (!announcements || announcements.length === 0) return null;

    return (
        <div className="bg-gradient-to-r from-[#0A1628] via-[#0F1D32] to-[#0A1628] border-b border-white/[0.06] overflow-hidden relative">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(245,158,11,0.03)_0%,transparent_50%,rgba(139,92,246,0.03)_100%)]" />
            <div className="flex items-center relative z-10">
                <div className="flex-shrink-0 bg-gradient-to-r from-amber-500 to-amber-400 px-5 py-3 flex items-center gap-2 z-10 shadow-[4px_0_20px_rgba(245,158,11,0.2)]">
                    <Megaphone className="w-4 h-4 text-white" />
                    <span className="text-[11px] font-extrabold text-white uppercase tracking-widest">News</span>
                </div>
                <div className="overflow-hidden flex-1 relative">
                    <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#0A1628] to-transparent z-10" />
                    <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#0A1628] to-transparent z-10" />
                    <div className="flex animate-marquee whitespace-nowrap py-3">
                        {[...announcements, ...announcements].map((a, i) => {
                            const Icon = typeIcons[a.type] || Info;
                            const dot = typeDots[a.type] || "bg-blue-400";
                            return (
                                <div key={`${a.id}-${i}`} className="inline-flex items-center gap-3 mx-10">
                                    <div className={`w-1.5 h-1.5 rounded-full ${dot} animate-pulse`} />
                                    <Icon className="w-3.5 h-3.5 text-white/40 flex-shrink-0" />
                                    <span className="text-sm text-white/50">
                                        <span className="font-bold text-white/90">{a.title}</span>
                                        <span className="mx-2 text-white/20">•</span>
                                        {a.content}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
