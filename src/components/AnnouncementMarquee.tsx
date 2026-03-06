"use client";

import { useEffect, useState } from "react";
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

const typeColors: Record<string, string> = {
    event: "text-purple-300",
    offer: "text-green-300",
    scholarship: "text-yellow-300",
    general: "text-blue-300",
};

export default function AnnouncementMarquee({ announcements }: { announcements: Announcement[] }) {
    if (!announcements || announcements.length === 0) return null;

    return (
        <div className="bg-[#0A1628] border-b border-white/10 overflow-hidden">
            <div className="flex items-center">
                <div className="flex-shrink-0 bg-[var(--brand-yellow)] px-4 py-2.5 flex items-center gap-2 z-10">
                    <Megaphone className="w-4 h-4 text-white" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">News</span>
                </div>
                <div className="overflow-hidden flex-1 relative">
                    <div className="flex animate-marquee whitespace-nowrap py-2.5">
                        {[...announcements, ...announcements].map((a, i) => {
                            const Icon = typeIcons[a.type] || Info;
                            const color = typeColors[a.type] || "text-blue-300";
                            return (
                                <div key={`${a.id}-${i}`} className="inline-flex items-center gap-2 mx-8">
                                    <Icon className={`w-3.5 h-3.5 ${color} flex-shrink-0`} />
                                    <span className="text-sm text-gray-300">
                                        <span className="font-semibold text-white">{a.title}</span>
                                        <span className="mx-1.5 text-gray-500">—</span>
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
