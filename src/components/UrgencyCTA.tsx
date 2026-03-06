"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function UrgencyCTA() {
    return (
        <section className="py-20 bg-[var(--brand-yellow)]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-white">
                    Intakes Are Filling Fast!
                </h2>
                <p className="text-white/90 mt-4 text-lg max-w-xl mx-auto">
                    Don&apos;t miss the upcoming semester deadlines. Secure your spot at a top university today. Our experts are ready to help you start your journey.
                </p>
                <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-white text-[var(--brand-yellow)] font-bold rounded-md hover:bg-gray-50 transition-colors shadow-xl animate-pulse-cta"
                >
                    Book Your Free Consultation Now <ArrowRight className="w-5 h-5" />
                </Link>
                <p className="text-white/70 text-sm mt-4">No fees • No obligations • Limited spots available</p>
            </div>
        </section>
    );
}
