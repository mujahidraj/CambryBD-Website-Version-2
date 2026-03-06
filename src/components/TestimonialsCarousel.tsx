"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

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
        <section className="py-20 bg-[#F8F9FA]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <span className="text-[var(--brand-blue)] font-semibold text-sm uppercase tracking-wider">Student Stories</span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">What Our Students Say</h2>
                </div>

                <div className="relative max-w-3xl mx-auto">
                    <div className="bg-white rounded-md p-8 md:p-12 shadow-sm border border-gray-200 text-center">
                        <Quote className="w-10 h-10 text-[var(--brand-yellow)] mx-auto mb-6 opacity-50" />
                        <p className="text-lg text-gray-700 leading-relaxed italic mb-6">
                            &ldquo;{testimonials[current].quote}&rdquo;
                        </p>
                        <div>
                            <p className="font-bold text-gray-900">{testimonials[current].studentName}</p>
                            <p className="text-sm text-gray-500">{testimonials[current].studentCourse}</p>
                            <p className="text-sm text-[var(--brand-blue)] font-medium">{testimonials[current].universityName} — {testimonials[current].targetCountry}</p>
                        </div>
                    </div>

                    {testimonials.length > 1 && (
                        <>
                            <button
                                onClick={() => goTo(current - 1)}
                                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-10 h-10 bg-white border border-gray-200 rounded-md flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
                            >
                                <ChevronLeft className="w-5 h-5 text-gray-600" />
                            </button>
                            <button
                                onClick={() => goTo(current + 1)}
                                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-10 h-10 bg-white border border-gray-200 rounded-md flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
                            >
                                <ChevronRight className="w-5 h-5 text-gray-600" />
                            </button>
                        </>
                    )}

                    {/* Dots */}
                    <div className="flex justify-center gap-2 mt-6">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                className={`w-2.5 h-2.5 rounded-full transition-colors ${i === current ? "bg-[var(--brand-blue)]" : "bg-gray-300 hover:bg-gray-400"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
