"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

interface Testimonial {
    studentName: string;
    studentCourse: string;
    universityName: string;
    targetCountry: string;
    quote: string;
}

export default function TestimonialsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (testimonials.length <= 1) return;
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [testimonials.length]);

    if (testimonials.length === 0) return null;

    const goTo = (index: number) => {
        setCurrent(index < 0 ? testimonials.length - 1 : index % testimonials.length);
    };

    return (
        <section className="py-28 bg-gradient-to-b from-[var(--off-white)] to-white relative overflow-hidden">
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-amber-50/30 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-widest mb-6">
                        <Star className="w-3.5 h-3.5" /> Student Stories
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0A1628] tracking-tight">What Our Students Say</h2>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    <div className="bg-white rounded-3xl p-10 md:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-gray-100/80 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-amber-50 to-transparent rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                        <div className="w-16 h-16 bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-8">
                            <Quote className="w-7 h-7 text-amber-500" />
                        </div>

                        <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium italic max-w-2xl mx-auto">
                            &ldquo;{testimonials[current].quote}&rdquo;
                        </p>

                        <div className="mt-8 pt-8 border-t border-gray-100">
                            <p className="font-bold text-[#0A1628] text-lg">{testimonials[current].studentName}</p>
                            <p className="text-sm text-gray-500 mt-1">{testimonials[current].studentCourse}</p>
                            <p className="text-sm text-amber-600 font-semibold mt-1">{testimonials[current].universityName} — {testimonials[current].targetCountry}</p>
                        </div>
                    </div>

                    {testimonials.length > 1 && (
                        <>
                            <button
                                onClick={() => goTo(current - 1)}
                                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-14 w-12 h-12 bg-white border border-gray-100 rounded-2xl flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] hover:-translate-y-1/2 hover:-translate-x-5 md:hover:-translate-x-[60px] transition-all duration-300"
                            >
                                <ChevronLeft className="w-5 h-5 text-gray-600" />
                            </button>
                            <button
                                onClick={() => goTo(current + 1)}
                                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-14 w-12 h-12 bg-white border border-gray-100 rounded-2xl flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] hover:-translate-y-1/2 hover:translate-x-5 md:hover:translate-x-[60px] transition-all duration-300"
                            >
                                <ChevronRight className="w-5 h-5 text-gray-600" />
                            </button>
                        </>
                    )}

                    {/* Dots */}
                    <div className="flex justify-center gap-2 mt-8">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                className={`h-2 rounded-full transition-all duration-300 ${
                                    i === current
                                        ? "bg-gradient-to-r from-amber-500 to-amber-400 w-8"
                                        : "bg-gray-200 hover:bg-gray-300 w-2"
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
