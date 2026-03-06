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
        <section className="bg-[#0A1628] border-y border-white/10 py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
                    {trustItems.map((item, i) => (
                        <motion.div
                            key={item.text}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-2 text-sm text-gray-300"
                        >
                            <item.icon className="w-4 h-4 text-[var(--brand-yellow)]" />
                            <span className="font-medium">{item.text}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
