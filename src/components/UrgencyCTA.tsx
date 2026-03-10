"use client";

import Link from "next/link";
import { ArrowRight, Clock, Sparkles } from "lucide-react";

export default function UrgencyCTA() {
    return (
        <section className="py-32 relative overflow-hidden">
            {/* Multi-layered gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15)_0%,transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,0,0,0.1)_0%,transparent_60%)]" />

            {/* Floating orbs */}
            <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-yellow-300/20 rounded-full blur-[80px] translate-y-1/2 pointer-events-none" />

            {/* Dot grid */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/15 border border-white/20 text-white text-[11px] font-bold uppercase tracking-[0.2em] mb-8 backdrop-blur-md shadow-lg">
                    <Clock className="w-3.5 h-3.5" /> Limited Time
                </div>
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
                    Intakes Are
                    <br />
                    <span className="relative">
                        Filling Fast
                        <Sparkles className="absolute -top-2 -right-8 w-6 h-6 text-yellow-200 animate-pulse" />
                    </span>
                </h2>
                <p className="text-white/85 mt-7 text-lg md:text-xl max-w-xl mx-auto leading-relaxed font-light">
                    Don&apos;t miss the upcoming semester deadlines. Secure your spot at a top university today.
                </p>
                <Link
                    href="/contact"
                    className="inline-flex items-center gap-3 mt-10 px-10 py-5 bg-white text-amber-600 font-bold rounded-2xl hover:bg-white/95 transition-all duration-300 shadow-[0_20px_60px_rgba(0,0,0,0.15)] hover:shadow-[0_25px_70px_rgba(0,0,0,0.25)] hover:-translate-y-1 text-lg group"
                >
                    Book Your Free Consultation <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                </Link>
                <p className="text-white/60 text-sm mt-6 font-medium tracking-wide">No fees &bull; No obligations &bull; Limited spots available</p>
            </div>
        </section>
    );
}
