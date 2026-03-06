"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";

interface ScholarshipItem {
    country: string;
    highlight: string;
}

const defaultScholarships: ScholarshipItem[] = [
    { country: "United Kingdom", highlight: "Up to 50% tuition fee reduction" },
    { country: "Australia", highlight: "Up to 30% scholarships available" },
    { country: "Canada", highlight: "Scholarships up to CAD 20,000" },
    { country: "New Zealand", highlight: "Scholarships up to NZD 20,000" },
    { country: "Malaysia", highlight: "Affordable tuition from MYR 15,000/yr" },
];

export default function ScholarshipSpotlight({ scholarships = defaultScholarships }: { scholarships?: ScholarshipItem[] }) {
    return (
        <section className="py-20 bg-[#0A1628]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <span className="text-[var(--brand-yellow)] font-semibold text-sm uppercase tracking-wider">Financial Aid</span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2">Scholarship & Financial Aid Spotlight</h2>
                    <p className="text-gray-400 mt-3 max-w-xl mx-auto">Don&apos;t let finances stop your dream. Explore generous scholarships across our partner destinations.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {scholarships.map((item, i) => (
                        <motion.div
                            key={item.country}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.08 }}
                            viewport={{ once: true }}
                            className="bg-white/5 border border-white/10 rounded-md p-6 hover:bg-white/10 transition-colors"
                        >
                            <Award className="w-8 h-8 text-[var(--brand-yellow)] mb-3" />
                            <h3 className="font-bold text-white text-lg">{item.country}</h3>
                            <p className="text-[var(--brand-yellow)] font-semibold mt-2">{item.highlight}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
