"use client";

import { MessageCircle, Search, FileText, Mail, CheckCircle, Plane, PartyPopper } from "lucide-react";
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

                <div className="relative">
                    {/* Connector line */}
                    <div className="hidden lg:block absolute top-[2.5rem] left-[5%] right-[5%] h-[2px] bg-gradient-to-r from-transparent via-blue-100 to-transparent pointer-events-none" />

                    <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-8 lg:gap-4 relative z-10">
                        {steps.map((step, i) => (
                            <StaggerItem key={step.title} className="flex flex-col items-center text-center group">
                                <div className="relative w-20 h-20 rounded-2xl bg-white border hover:border-transparent border-gray-100 shadow-xl shadow-blue-900/5 flex items-center justify-center mb-6 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-[var(--brand-yellow)]/10 transition-all duration-300 z-10">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-blue)] to-[#0A1628] opacity-0 rounded-2xl group-hover:opacity-100 transition-opacity duration-300" />
                                    <step.icon className="w-8 h-8 text-[var(--brand-blue)] group-hover:text-white relative z-10 transition-colors duration-300" />
                                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-br from-[var(--brand-yellow)] to-[var(--brand-yellow)] text-white flex items-center justify-center font-bold text-sm border-2 border-white shadow-md">
                                        {i + 1}
                                    </div>
                                </div>
                                <h3 className="font-bold text-[15px] text-[#0A1628] mb-2 group-hover:text-[var(--brand-yellow)] transition-colors">{step.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed px-2">{step.desc}</p>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </div>
        </section>
    );
}
