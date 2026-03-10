import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/MotionWrappers";
import type { LucideIcon } from "lucide-react";

interface PageHeroProps {
    badge: string;
    badgeIcon: LucideIcon;
    title: React.ReactNode;
    subtitle: string;
    backgroundImage: string;
    backgroundAlt: string;
    cta?: { label: string; href: string };
    children?: React.ReactNode;
}

export default function PageHero({
    badge,
    badgeIcon: BadgeIcon,
    title,
    subtitle,
    backgroundImage,
    backgroundAlt,
    cta,
    children,
}: PageHeroProps) {
    return (
        <section className="relative min-h-[85vh] flex items-center justify-center pt-24 pb-28 bg-[#0A1628] overflow-hidden">
            {/* Background image */}
            <div className="absolute inset-0">
                <img
                    src={backgroundImage}
                    alt={backgroundAlt}
                    className="w-full h-full object-cover mix-blend-overlay opacity-25"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/85 to-[#0A1628]/60" />
            </div>

            {/* Ambient orbs */}
            <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

            {/* Grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 w-full mt-10">
                <FadeIn direction="up">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.06] backdrop-blur-2xl border border-white/[0.08] text-[11px] text-amber-400 mb-8 font-bold uppercase tracking-[0.2em]">
                        <BadgeIcon className="w-3.5 h-3.5" />
                        {badge}
                    </div>
                    <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold text-white leading-[1.05] tracking-tight">
                        {title}
                    </h1>
                    <p className="text-blue-100/60 mt-8 max-w-3xl mx-auto text-xl md:text-2xl leading-relaxed font-light">
                        {subtitle}
                    </p>
                    {cta && (
                        <Link
                            href={cta.href}
                            className="inline-flex items-center gap-3 mt-10 px-10 py-5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-2xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-[0_20px_60px_rgba(245,158,11,0.3)] hover:shadow-[0_25px_70px_rgba(245,158,11,0.4)] hover:-translate-y-0.5 text-lg group"
                        >
                            {cta.label} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    )}
                    {children}
                </FadeIn>
            </div>
        </section>
    );
}
