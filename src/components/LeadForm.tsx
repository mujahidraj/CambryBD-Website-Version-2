"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";
import { createLead } from "@/actions/leads";
import { usePathname } from "next/navigation";

export default function LeadForm({ className = "" }: { className?: string }) {
    const pathname = usePathname();
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        desiredCountry: "",
        testPreference: "",
        programInterest: "",
        message: "",
    });
    const [honeypot, setHoneypot] = useState("");
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const countries = [
        "United Kingdom",
        "Australia",
        "Canada",
        "Malaysia",
        "New Zealand",
        "South Korea",
        "Japan",
        "Italy",
        "Malta",
        "Cyprus",
        "Finland",
        "Other",
    ];

    const programs = [
        "Bachelor's Degree",
        "Master's Degree",
        "PhD",
        "Diploma/Certificate",
        "Foundation Program",
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (honeypot) return; // Bot trap
        if (!form.name || !form.email || !form.phone || !form.desiredCountry) {
            toast.error("Please fill in all required fields");
            return;
        }
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            toast.error("Please enter a valid email address");
            return;
        }
        setLoading(true);
        try {
            await createLead({
                name: form.name,
                email: form.email,
                phone: form.phone,
                desiredCountry: form.desiredCountry,
                testPreference: form.testPreference || undefined,
                programInterest: form.programInterest || undefined,
                message: form.message || undefined,
                sourcePage: pathname || undefined,
            });
            setSubmitted(true);
            toast.success("Thank you! We'll get back to you within 24 hours.");
            setForm({ name: "", email: "", phone: "", desiredCountry: "", testPreference: "", programInterest: "", message: "" });
        } catch {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const inputClasses = "w-full px-4 py-3.5 bg-slate-50/80 border border-gray-100/60 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-300/50 transition-all duration-300 text-[#0A1628] placeholder:text-gray-400/80 font-medium";
    const labelClasses = "text-sm font-semibold text-[#0A1628] block mb-2 tracking-wide";

    if (submitted) {
        return (
            <div className={`text-center py-12 ${className}`}>
                <div className="w-20 h-20 bg-gradient-to-br from-green-50 to-emerald-100 border border-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-9 h-9 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-[#0A1628]">Inquiry Sent!</h3>
                <p className="text-gray-500 mt-3 text-lg">Our counselors will contact you within 24 hours.</p>
                <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-sm text-amber-600 font-bold hover:text-amber-700 transition-colors"
                >
                    Submit another inquiry
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className={`space-y-5 ${className}`}>
            {/* Honeypot - hidden from humans */}
            <input
                type="text"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="absolute opacity-0 pointer-events-none h-0 w-0"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <label className={labelClasses}>Full Name *</label>
                    <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={inputClasses}
                        placeholder="John Doe"
                        required
                    />
                </div>
                <div>
                    <label className={labelClasses}>Email *</label>
                    <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={inputClasses}
                        placeholder="john@example.com"
                        required
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <label className={labelClasses}>Phone *</label>
                    <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className={inputClasses}
                        placeholder="+880 1700-000000"
                        required
                    />
                </div>
                <div>
                    <label className={labelClasses}>Preferred Country *</label>
                    <select
                        value={form.desiredCountry}
                        onChange={(e) => setForm({ ...form, desiredCountry: e.target.value })}
                        className={`${inputClasses} appearance-none cursor-pointer`}
                        required
                    >
                        <option value="">Select a country...</option>
                        {countries.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div>
                <label className={labelClasses}>English Test Preference</label>
                <select
                    value={form.testPreference}
                    onChange={(e) => setForm({ ...form, testPreference: e.target.value })}
                    className={`${inputClasses} appearance-none cursor-pointer`}
                >
                    <option value="">Select your preference...</option>
                    <option value="IELTS">IELTS</option>
                    <option value="PTE">PTE</option>
                    <option value="IELTS & PTE">IELTS & PTE</option>
                    <option value="Not Sure">Not Sure</option>
                </select>
            </div>
            <div>
                <label className={labelClasses}>Program Interest</label>
                <select
                    value={form.programInterest}
                    onChange={(e) => setForm({ ...form, programInterest: e.target.value })}
                    className={`${inputClasses} appearance-none cursor-pointer`}
                >
                    <option value="">Select a program type...</option>
                    {programs.map((p) => (
                        <option key={p} value={p}>{p}</option>
                    ))}
                </select>
            </div>
            <div>
                <label className={labelClasses}>Your Message</label>
                <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={3}
                    className={`${inputClasses} resize-none`}
                    placeholder="Tell us about your study abroad goals..."
                />
            </div>
            <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 bg-[length:200%] hover:bg-right text-white font-bold rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 transition-all duration-500 disabled:opacity-50 shadow-[0_8px_30px_rgba(245,158,11,0.3)] hover:shadow-[0_12px_40px_rgba(245,158,11,0.4)] flex items-center justify-center gap-2 text-lg"
            >
                {loading ? (
                    "Sending..."
                ) : (
                    <>
                        <Send className="w-5 h-5" /> Book Free Consultation
                    </>
                )}
            </button>
        </form>
    );
}
