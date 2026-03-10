"use client";

import { MessageCircle, Search, FileText, Mail, CheckCircle, Plane, PartyPopper } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/MotionWrappers";

const steps = [
    { icon: MessageCircle, title: "Initial Consultation", desc: "Free one-on-one counseling to understand your goals.", color: "from-blue-500 to-cyan-400" },
    { icon: Search, title: "Course Selection", desc: "We match you with the ideal university and program.", color: "from-purple-500 to-violet-400" },
    { icon: FileText, title: "Application", desc: "Complete application submission with SOP & documents.", color: "from-amber-500 to-orange-400" },
    { icon: Mail, title: "Offer Letter", desc: "Receive your official offer letter from the university.", color: "from-emerald-500 to-teal-400" },
    { icon: CheckCircle, title: "Visa Processing", desc: "Expert visa application and interview preparation.", color: "from-blue-600 to-indigo-500" },
    { icon: Plane, title: "Pre-Departure", desc: "Orientation, accommodation, and travel planning.", color: "from-rose-500 to-pink-400" },
    { icon: PartyPopper, title: "Arrival & Support", desc: "Continued support after you reach your destination.", color: "from-amber-500 to-yellow-400" },
];

const topSteps = steps.slice(0, 4);
const bottomSteps = steps.slice(4);

function StepCard({ step, index }: { step: (typeof steps)[number]; index: number }) {
    return (
        <StaggerItem key={step.title} className="group">
            <div className="h-full p-5 rounded-3xl border border-white/70 bg-white/80 backdrop-blur-sm shadow-[0_8px_28px_rgba(15,23,42,0.06)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:-translate-y-2 transition-all duration-500 text-center">
                <div className="relative w-22 h-22 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-gray-100 shadow-[0_6px_24px_rgba(0,0,0,0.06)] flex items-center justify-center mb-6 mx-auto">
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 rounded-2xl group-hover:opacity-100 transition-opacity duration-500`} />
                    <step.icon className="w-8 h-8 text-[var(--brand-blue)] group-hover:text-white relative z-10 transition-colors duration-500" />
                    <div className={`absolute -top-3 -right-3 w-8 h-8 rounded-xl bg-gradient-to-br ${step.color} text-white flex items-center justify-center font-extrabold text-sm shadow-lg`}>
                        {index}
                    </div>
                </div>
                <h3 className="font-bold text-[15px] text-[#0A1628] mb-2 group-hover:text-amber-600 transition-colors">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed px-1">{step.desc}</p>
                <div className="mt-4 h-1.5 w-12 mx-auto rounded-full bg-gradient-to-r from-transparent via-amber-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
        </StaggerItem>
    );
}

export default function JourneyStepper() {
    return (
        <section className="py-32 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_55%,#fefcf7_100%)] relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.09),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(245,158,11,0.12),transparent_35%),radial-gradient(circle_at_50%_100%,rgba(139,92,246,0.08),transparent_40%)] pointer-events-none" />
            <div className="absolute top-0 right-0 w-[620px] h-[620px] bg-amber-100/40 rounded-full blur-[130px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[520px] h-[520px] bg-blue-100/40 rounded-full blur-[110px] translate-y-1/2 -translate-x-1/3 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <FadeIn direction="up">
                    <div className="text-center mb-22">
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-xl border border-purple-100 text-purple-700 text-xs font-bold uppercase tracking-[0.18em] mb-7 shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
                            <Plane className="w-3.5 h-3.5" /> Your Path
                        </div>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0A1628] tracking-tight leading-[1.1]">
                            Journey to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-blue)] via-[#2563EB] to-[var(--brand-yellow)]">Enrollment</span>
                        </h2>
                        <p className="text-gray-600 mt-6 max-w-2xl mx-auto text-lg leading-relaxed">From first consultation to arriving at your dream university, we guide you at every milestone with clarity and confidence.</p>
                    </div>
                </FadeIn>

                <div className="relative space-y-8">
                    <div className="relative">
                        <div className="hidden lg:block absolute top-11 left-[8%] right-[8%] h-0.5 bg-gradient-to-r from-blue-100 via-amber-200 to-blue-100 pointer-events-none" />
                        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                            {topSteps.map((step, i) => <StepCard key={step.title} step={step} index={i + 1} />)}
                        </StaggerContainer>
                    </div>

                    <div className="relative lg:max-w-5xl lg:mx-auto">
                        <div className="hidden lg:block absolute top-11 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-blue-100 via-amber-200 to-blue-100 pointer-events-none" />
                        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                            {bottomSteps.map((step, i) => <StepCard key={step.title} step={step} index={i + 5} />)}
                        </StaggerContainer>
                    </div>
                </div>
            </div>
        </section>
    );
}
