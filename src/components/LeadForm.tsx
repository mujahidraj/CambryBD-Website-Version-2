"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import toast from "react-hot-toast";
import { createLead } from "@/actions/leads";

export default function LeadForm({ className = "" }: { className?: string }) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        desiredCountry: "",
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
                programInterest: form.programInterest || undefined,
                message: form.message || undefined,
            });
            setSubmitted(true);
            toast.success("Thank you! We'll get back to you within 24 hours.");
            setForm({ name: "", email: "", phone: "", desiredCountry: "", programInterest: "", message: "" });
        } catch {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className={`text-center py-10 ${className}`}>
                <div className="w-16 h-16 bg-green-100 rounded-md flex items-center justify-center mx-auto mb-4">
                    <Send className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Inquiry Sent!</h3>
                <p className="text-gray-500 mt-2">Our counselors will contact you within 24 hours.</p>
                <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-sm text-[var(--brand-blue)] font-medium hover:underline"
                >
                    Submit another inquiry
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1.5">Full Name *</label>
                    <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent transition-all"
                        placeholder="John Doe"
                        required
                    />
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1.5">Email *</label>
                    <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent transition-all"
                        placeholder="john@example.com"
                        required
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1.5">Phone *</label>
                    <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent transition-all"
                        placeholder="+880 1700-000000"
                        required
                    />
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1.5">Preferred Country *</label>
                    <select
                        value={form.desiredCountry}
                        onChange={(e) => setForm({ ...form, desiredCountry: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent transition-all"
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
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Program Interest</label>
                <select
                    value={form.programInterest}
                    onChange={(e) => setForm({ ...form, programInterest: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent transition-all"
                >
                    <option value="">Select a program type...</option>
                    {programs.map((p) => (
                        <option key={p} value={p}>{p}</option>
                    ))}
                </select>
            </div>
            <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Your Message</label>
                <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent transition-all resize-none"
                    placeholder="Tell us about your study abroad goals..."
                />
            </div>
            <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-[var(--brand-yellow)] text-white font-semibold rounded-md hover:bg-[#D4660A] focus:outline-none focus:ring-2 focus:ring-[var(--brand-yellow)] focus:ring-offset-2 transition-all disabled:opacity-50 shadow-lg flex items-center justify-center gap-2"
            >
                {loading ? (
                    "Sending..."
                ) : (
                    <>
                        <Send className="w-4 h-4" /> Book Free Consultation
                    </>
                )}
            </button>
        </form>
    );
}
