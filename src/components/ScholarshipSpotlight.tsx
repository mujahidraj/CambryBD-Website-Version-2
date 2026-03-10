"use client";

import { motion } from "framer-motion";
import { Award, Sparkles } from "lucide-react";

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

const gradients = [
    "from-blue-500 to-cyan-400",
    "from-emerald-500 to-teal-400",
    "from-rose-500 to-pink-400",
    "from-purple-500 to-violet-400",
    "from-amber-500 to-orange-400",
];

export default function ScholarshipSpotlight({ scholarships = defaultScholarships }: { scholarships?: ScholarshipItem[] }) {
    return (
        <section className="py-28 bg-[#0A1628] relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
            <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-amber-500/[0.04] rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-purple-500/[0.04] rounded-full blur-[130px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/[0.08] text-amber-400 text-xs font-bold uppercase tracking-widest mb-6">
                        <Award className="w-3.5 h-3.5" /> Financial Aid
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">Scholarship & Financial Aid <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">Spotlight</span></h2>
                    <p className="text-blue-200/40 mt-5 max-w-xl mx-auto text-lg leading-relaxed">Don&apos;t let finances stop your dream. Explore generous scholarships across our partner destinations.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {scholarships.map((item, i) => (
                        <motion.div
                            key={item.country}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08 }}
                            viewport={{ once: true }}
                            className="bg-white/[0.04] backdrop-blur-md border border-white/[0.06] rounded-3xl p-8 hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-500 group relative overflow-hidden"
                        >
                            <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${gradients[i % gradients.length]} opacity-0 group-hover:opacity-[0.06] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-opacity duration-500`} />
                            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradients[i % gradients.length]} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                <Award className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="font-bold text-white text-xl mb-2">{item.country}</h3>
                            <p className="text-amber-400 font-bold text-lg">{item.highlight}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
