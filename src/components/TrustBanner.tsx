"use client";

import { motion } from "framer-motion";
import { Shield, Award, Users, CheckCircle } from "lucide-react";

const trustItems = [
    { icon: Shield, text: "British Council Partner" },
    { icon: Award, text: "IELTS Registration Centre" },
    { icon: CheckCircle, text: "98% Visa Approval Rate" },
    { icon: Users, text: "50+ Partner Institutions" },
];

export default function TrustBanner() {
    return (
        <section className="bg-gradient-to-r from-[#0A1628] via-[#0F1D32] to-[#0A1628] border-y border-white/[0.06] py-5 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(139,92,246,0.03)_0%,transparent_50%,rgba(245,158,11,0.03)_100%)]" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
                    {trustItems.map((item, i) => (
                        <motion.div
                            key={item.text}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-3 text-sm group"
                        >
                            <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center group-hover:bg-amber-500/10 group-hover:border-amber-500/20 transition-all duration-300">
                                <item.icon className="w-4 h-4 text-amber-400" />
                            </div>
                            <span className="font-semibold text-white/60 group-hover:text-white/80 transition-colors duration-300">{item.text}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
