"use client";

import { MessageCircle, Search, FileText, Mail, CheckCircle, Plane, PartyPopper, ArrowRight } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/MotionWrappers";

const steps = [
    { icon: MessageCircle, title: "Initial Consultation", desc: "Free one-on-one counseling to understand your goals." },
    { icon: Search, title: "Course Selection", desc: "We match you with the ideal university and program." },
    { icon: FileText, title: "Application", desc: "Complete application submission with SOP & documents." },
    { icon: Mail, title: "Offer Letter", desc: "Receive your official offer letter from the university." },
    { icon: CheckCircle, title: "Visa Processing", desc: "Expert visa application and interview preparation." },
    { icon: Plane, title: "Pre-Departure", desc: "Orientation, accommodation, and travel planning." },
    { icon: PartyPopper, title: "Arrival & Support", desc: "Continued support after you reach your destination." },
];

export default function JourneyStepper() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--brand-yellow)]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <FadeIn direction="up">
                    <div className="text-center mb-20">
                        <span className="text-[var(--brand-yellow)] font-bold text-sm uppercase tracking-widest">Your Path</span>
                        <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0A1628] mt-3 tracking-tight">Journey to Enrollment</h2>
                        <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">From first consultation to arriving at your dream university, we guide you every step of the way.</p>
                    </div>
                </FadeIn>

                <div className="relative mt-10">
                    <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-16 lg:gap-y-20 gap-x-8 relative z-10 p-4">
                        {steps.map((step, i) => {
                            let arrowClass = "hidden sm:flex";
                            if ((i + 1) % 4 === 0) arrowClass = "hidden";
                            else if ((i + 1) % 2 === 0) arrowClass = "hidden lg:flex";

                            return (
                                <div key={step.title} className="relative">
                                    <StaggerItem className="flex flex-col items-center text-center group h-full">
                                        <div className="relative w-24 h-24 sm:w-20 sm:h-20 rounded-2xl bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex items-center justify-center mb-6 group-hover:-translate-y-2 group-hover:shadow-[0_10px_30px_rgba(255,192,0,0.15)] transition-all duration-500 z-10">
                                            <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628] to-[var(--brand-blue)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                                            <step.icon className="w-10 h-10 sm:w-8 sm:h-8 text-[var(--brand-blue)] group-hover:text-white relative z-10 transition-colors duration-500 transform group-hover:scale-110" />
                                            <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-br from-[var(--brand-yellow)] to-yellow-500 text-[#0A1628] flex items-center justify-center font-extrabold text-sm border-2 border-white shadow-lg z-20 group-hover:scale-110 group-hover:from-white group-hover:to-white transition-all duration-500">
                                                {i + 1}
                                            </div>
                                        </div>
                                        <h3 className="font-bold text-lg sm:text-[15px] text-[#0A1628] mb-2 group-hover:text-[var(--brand-yellow)] transition-colors px-2 relative z-10">{step.title}</h3>
                                        <p className="text-sm text-gray-500 leading-relaxed px-4 sm:px-2 relative z-10">{step.desc}</p>
                                    </StaggerItem>

                                    {/* Desktop / Tablet Right Arrow */}
                                    {i < steps.length - 1 && (
                                        <div className={`absolute top-12 sm:top-10 -right-8 w-16 h-8 justify-center items-center z-0 ${arrowClass}`}>
                                            <div className="relative flex items-center w-full h-full">
                                                <div className="absolute inset-0 flex items-center">
                                                    <div className="w-full border-t-2 border-dashed border-[var(--brand-yellow)]/40"></div>
                                                </div>
                                                <div className="absolute right-0 flex items-center justify-center animate-[pulse_2s_infinite] sm:translate-x-2">
                                                    <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 text-[var(--brand-yellow)] drop-shadow-[0_0_8px_rgba(255,192,0,0.5)]" />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Mobile Down Arrow */}
                                    {i < steps.length - 1 && (
                                        <div className="sm:hidden absolute -bottom-10 left-1/2 -translate-x-1/2 h-10 flex flex-col justify-center items-center z-0">
                                            <div className="absolute inset-0 flex justify-center">
                                                <div className="h-full border-l-2 border-dashed border-[var(--brand-yellow)]/40"></div>
                                            </div>
                                            <div className="absolute bottom-0 flex items-center justify-center animate-[pulse_2s_infinite] translate-y-3">
                                                <ArrowRight className="w-6 h-6 text-[var(--brand-yellow)] rotate-90 drop-shadow-[0_0_8px_rgba(255,192,0,0.5)]" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </StaggerContainer>
                </div>
            </div>
        </section>
    );
}
