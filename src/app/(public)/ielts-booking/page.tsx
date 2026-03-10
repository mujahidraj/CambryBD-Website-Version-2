/* eslint-disable @typescript-eslint/no-explicit-any */
export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import Link from "next/link";
import { CalendarCheck, MapPin, CreditCard, Clock, FileText, CheckCircle2, ArrowRight, Info, Users, Sparkles } from "lucide-react";
import { getActiveIELTSInfo } from "@/actions/ieltsInfo";
import LeadForm from "@/components/LeadForm";
import PageHero from "@/components/PageHero";
import TrustBanner from "@/components/TrustBanner";
import UrgencyCTA from "@/components/UrgencyCTA";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/MotionWrappers";

export const metadata: Metadata = {
    title: "IELTS & PTE Exams + Course Registrations | Cambry International Admission Centre",
    description: "Register for IELTS and PTE exams and preparation courses through Cambry. Compare modules, fees, schedules, and register with expert support.",
};

export default async function IELTSBookingPage() {
    let ieltsItems: any[] = [];
    try { ieltsItems = await getActiveIELTSInfo(); } catch { }

    return (
        <>
            {/* 1. Hero */}
            <PageHero
                badge="Test Preparation"
                badgeIcon={CalendarCheck}
                title={<>IELTS & PTE <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">Registration</span></>}
                subtitle="Register for IELTS and PTE exams, plus online/offline preparation courses with complete guidance from our team."
                backgroundImage="https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=1920&q=80"
                backgroundAlt="Students taking test"
                cta={{ label: "Enquire Now", href: "#enquiry" }}
            />

            {/* 2. Trust */}
            <TrustBanner />

            {/* 3. Important Notice */}
            <section className="py-6 bg-gradient-to-r from-amber-50 to-orange-50 border-y border-amber-100/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                            <Info className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-amber-800 mb-1">Important Information</h3>
                            <p className="text-sm text-amber-700/80 leading-relaxed">
                                IELTS/PTE exam booking and course registration can be started online. Final confirmation may require an <strong>in-person visit</strong> depending on provider requirements.
                                Please use the enquiry form below to express interest, and our team will guide you through the process
                                when you visit us.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. How It Works */}
            <section className="py-28 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <FadeIn direction="up">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100/60 text-blue-600 text-[11px] font-bold uppercase tracking-[0.2em] mb-6 shadow-sm">
                                <Sparkles className="w-3.5 h-3.5" /> Simple Process
                            </div>
                            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0A1628] tracking-tight">How to Register for IELTS/PTE</h2>
                        </div>
                    </FadeIn>
                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            {[
                                { step: "01", title: "Choose Exam/Course", desc: "Select IELTS or PTE, then pick exam slot or course batch.", icon: FileText, gradient: "from-blue-500 to-cyan-400" },
                                { step: "02", title: "Submit Enquiry", desc: "Send preferred type, module, score target, and schedule.", icon: Users, gradient: "from-violet-500 to-purple-400" },
                                { step: "03", title: "Counselor Guidance", desc: "Get document checklist, fee details, and preparation plan.", icon: MapPin, gradient: "from-amber-500 to-orange-400" },
                                { step: "04", title: "Registration Confirmed", desc: "Your exam seat or course batch is confirmed successfully.", icon: CheckCircle2, gradient: "from-emerald-500 to-teal-400" },
                        ].map((item) => (
                            <StaggerItem key={item.step}>
                                <div className="text-center group">
                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} text-white flex items-center justify-center mx-auto mb-5 text-xl font-bold shadow-lg group-hover:scale-110 transition-transform`}>
                                        {item.step}
                                    </div>
                                    <h3 className="text-base font-bold text-[#0A1628] mb-2">{item.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* 5. Test Types */}
            <section className="py-28 bg-gradient-to-b from-slate-50 to-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <FadeIn direction="up">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-100/60 text-violet-600 text-[11px] font-bold uppercase tracking-[0.2em] mb-6 shadow-sm">
                                <CalendarCheck className="w-3.5 h-3.5" /> Available Tests
                            </div>
                            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0A1628] tracking-tight">IELTS & PTE Exams + Courses</h2>
                        </div>
                    </FadeIn>
                    {ieltsItems.length > 0 ? (
                        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {ieltsItems.map((item: any) => (
                                <StaggerItem key={item.id}>
                                    <div className="bg-white border border-gray-100/60 rounded-3xl overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 group h-full flex flex-col">
                                        {item.imageUrl && (
                                            <div className="aspect-video bg-slate-50 overflow-hidden">
                                                <img src={item.imageUrl} alt={item.testType} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                            </div>
                                        )}
                                        <div className="p-7 flex-1 flex flex-col">
                                            <h3 className="text-lg font-bold text-[#0A1628] mb-3">{item.testType}</h3>
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                <span className="text-[11px] px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-bold">{item.testProvider || "IELTS"}</span>
                                                <span className="text-[11px] px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 font-bold">{item.offeringType || "EXAM"}</span>
                                                {item.moduleType && <span className="text-[11px] px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 font-bold">{item.moduleType}</span>}
                                            </div>
                                            <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">{item.description}</p>
                                            <div className="space-y-2.5">
                                                <div className="flex items-center gap-2.5 text-sm">
                                                    <CreditCard className="w-4 h-4 text-amber-500" />
                                                    <span className="text-gray-600"><strong className="text-[#0A1628]">Fee:</strong> {item.fee}</span>
                                                </div>
                                                <div className="flex items-center gap-2.5 text-sm">
                                                    <MapPin className="w-4 h-4 text-amber-500" />
                                                    <span className="text-gray-600"><strong className="text-[#0A1628]">Venue:</strong> {item.venue}</span>
                                                </div>
                                                {item.nextDate && (
                                                    <div className="flex items-center gap-2.5 text-sm">
                                                        <Clock className="w-4 h-4 text-amber-500" />
                                                        <span className="text-gray-600"><strong className="text-[#0A1628]">Next Date:</strong> {new Date(item.nextDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                                                    </div>
                                                )}
                                                {item.duration && <div className="text-sm text-gray-600"><strong className="text-[#0A1628]">Duration:</strong> {item.duration}</div>}
                                                {item.classMode && <div className="text-sm text-gray-600"><strong className="text-[#0A1628]">Mode:</strong> {item.classMode}</div>}
                                                {item.targetScore && <div className="text-sm text-gray-600"><strong className="text-[#0A1628]">Target Score:</strong> {item.targetScore}</div>}
                                                {item.seats && <div className="text-sm text-gray-600"><strong className="text-[#0A1628]">Seats:</strong> {item.seats}</div>}
                                                {item.registrationOpenUntil && <div className="text-sm text-gray-600"><strong className="text-[#0A1628]">Register By:</strong> {new Date(item.registrationOpenUntil).toLocaleDateString()}</div>}
                                            </div>
                                            <div className="mt-5 pt-5 border-t border-gray-50">
                                                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.15em] mb-2">Requirements</p>
                                                <p className="text-sm text-gray-500">{item.requirements}</p>
                                                {item.notes && <p className="text-sm text-gray-500 mt-2"><strong className="text-[#0A1628]">Notes:</strong> {item.notes}</p>}
                                                <a href={item.ctaUrl && (String(item.ctaUrl).startsWith("/") || String(item.ctaUrl).startsWith("#")) ? item.ctaUrl : "#enquiry"} className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold">{item.ctaLabel || "Register Now"}<ArrowRight className="w-4 h-4" /></a>
                                            </div>
                                        </div>
                                    </div>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    ) : (
                        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { type: "IELTS Academic Exam", desc: "For higher education and professional registration.", fee: "Contact for fees", venue: "Contact for venues", gradient: "from-blue-500 to-cyan-400" },
                                { type: "IELTS General Training Exam", desc: "For migration and work pathways.", fee: "Contact for fees", venue: "Contact for venues", gradient: "from-violet-500 to-purple-400" },
                                { type: "PTE Academic Exam", desc: "Computer-based test accepted by universities globally.", fee: "Contact for fees", venue: "Contact for venues", gradient: "from-amber-500 to-orange-400" },
                                { type: "IELTS Prep Course", desc: "Structured coaching with mock tests and feedback.", fee: "Contact for fees", venue: "Online/Offline", gradient: "from-emerald-500 to-teal-400" },
                                { type: "PTE Prep Course", desc: "Section-wise practice with AI-supported score review.", fee: "Contact for fees", venue: "Online/Offline", gradient: "from-rose-500 to-pink-400" },
                                { type: "Crash Course (IELTS/PTE)", desc: "Fast-track prep for candidates with upcoming exam dates.", fee: "Contact for fees", venue: "Hybrid", gradient: "from-indigo-500 to-blue-400" },
                            ].map((item) => (
                                <StaggerItem key={item.type}>
                                    <div className="bg-white border border-gray-100/60 rounded-3xl p-8 shadow-[0_2px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group h-full">
                                        <div className={`w-14 h-14 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                                            <CalendarCheck className="w-7 h-7 text-white" />
                                        </div>
                                        <h3 className="text-lg font-bold text-[#0A1628] mb-3">{item.type}</h3>
                                        <p className="text-gray-500 text-sm leading-relaxed mb-4">{item.desc}</p>
                                        <div className="space-y-2.5">
                                            <div className="flex items-center gap-2.5 text-sm"><CreditCard className="w-4 h-4 text-amber-500" /><span className="text-gray-600">{item.fee}</span></div>
                                            <div className="flex items-center gap-2.5 text-sm"><MapPin className="w-4 h-4 text-amber-500" /><span className="text-gray-600">{item.venue}</span></div>
                                        </div>
                                    </div>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    )}
                </div>
            </section>

            {/* 6. Why Book Through Cambry */}
            <section className="py-28 bg-white relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-50/30 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <FadeIn direction="up">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100/60 text-emerald-600 text-[11px] font-bold uppercase tracking-[0.2em] mb-6 shadow-sm">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Why Us
                            </div>
                            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0A1628] tracking-tight">Why Register Through Cambry?</h2>
                        </div>
                    </FadeIn>
                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
                        {[
                            "Expert guidance on which IELTS/PTE option fits your profile",
                            "Assistance with test registration and documentation",
                            "Preparation roadmap for both exam and course registrations",
                            "Seamless integration with your study abroad application",
                            "Follow-up support for score review and re-booking",
                            "One-stop shop for IELTS, PTE, and university admissions",
                        ].map((item) => (
                            <StaggerItem key={item}>
                                <div className="flex items-center gap-4 p-5 bg-white border border-gray-100/60 rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300 group">
                                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-400 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform">
                                        <CheckCircle2 className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="text-sm font-semibold text-[#0A1628]">{item}</span>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* 7. Enquiry Form */}
            <section id="enquiry" className="py-28 bg-gradient-to-b from-slate-50 to-white relative">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <FadeIn direction="up">
                        <div className="bg-white/80 backdrop-blur-xl border border-gray-100/60 rounded-3xl p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.06)] relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50/30 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                            <div className="relative z-10">
                                <h2 className="text-3xl font-extrabold text-[#0A1628] mb-2 text-center tracking-tight">Interested in IELTS/PTE Registration?</h2>
                                <p className="text-gray-500 text-center mb-2 text-lg">
                                    Fill out the form and our team will contact you within 24 hours.
                                </p>
                                <p className="text-xs text-amber-600 font-bold text-center mb-8 uppercase tracking-wide">
                                    Note: Final booking confirmation requires an in-person visit.
                                </p>
                                <LeadForm />
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* 8. Urgency CTA */}
            <UrgencyCTA />
        </>
    );
}
