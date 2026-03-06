export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import Link from "next/link";
import { CalendarCheck, MapPin, CreditCard, Clock, FileText, CheckCircle2, ArrowRight, Info, Users } from "lucide-react";
import { getActiveIELTSInfo } from "@/actions/ieltsInfo";
import LeadForm from "@/components/LeadForm";
import TrustBanner from "@/components/TrustBanner";
import UrgencyCTA from "@/components/UrgencyCTA";

export const metadata: Metadata = {
    title: "IELTS Booking & Admission | Cambry International Admission Centre",
    description: "Book your IELTS exam through Cambry. We provide IELTS Academic, General Training, and UKVI test booking assistance. Visit us for in-person confirmation.",
};

export default async function IELTSBookingPage() {
    let ieltsItems: any[] = [];
    try { ieltsItems = await getActiveIELTSInfo(); } catch { }

    return (
        <>
            {/* 1. Hero */}
            <section className="relative min-h-screen flex items-center justify-center pt-20 pb-20 bg-[#0A1628] overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=1920&q=80"
                        alt="Students taking test"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[#0A1628]/80" />
                </div>
                <div className="absolute inset-0 opacity-15">
                    <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[128px]" />
                    <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-purple-500 rounded-full blur-[100px]" />
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-up">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-600/30">
                        <CalendarCheck className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
                        IELTS <span className="text-[var(--brand-yellow)]">Booking</span> & Admission
                    </h1>
                    <p className="text-gray-300 mt-6 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
                        Cambry is an authorized IELTS admission and booking centre. Get all the information you need and book your test through us.
                    </p>
                    <Link href="#enquiry" className="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-[var(--brand-yellow)] text-white font-semibold rounded-md hover:bg-[#D4660A] transition-all shadow-xl animate-pulse-cta">
                        Enquire Now <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>

            {/* 2. Trust */}
            <TrustBanner />

            {/* 3. Important Notice */}
            <section className="py-8 bg-amber-50 border-y border-amber-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-start gap-4">
                        <Info className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <h3 className="text-sm font-bold text-amber-800 mb-1">Important Information</h3>
                            <p className="text-sm text-amber-700">
                                IELTS booking and admission confirmation requires an <strong>in-person visit</strong> to our office.
                                Please use the enquiry form below to express interest, and our team will guide you through the process
                                when you visit us. This page is for informational purposes only.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. How It Works */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <span className="text-[var(--brand-blue)] font-semibold text-sm uppercase tracking-wider">Simple Process</span>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">How to Book Your IELTS Through Cambry</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { step: "01", title: "Submit Enquiry", desc: "Fill the form below with your preferred test type and date.", icon: FileText },
                            { step: "02", title: "Our Team Contacts You", desc: "We'll reach out within 24 hours to discuss details and availability.", icon: Users },
                            { step: "03", title: "Visit Our Office", desc: "Come in person with required documents for booking confirmation.", icon: MapPin },
                            { step: "04", title: "Booking Confirmed", desc: "We complete your registration and you receive your test date confirmation.", icon: CheckCircle2 },
                        ].map((item) => (
                            <div key={item.step} className="text-center">
                                <div className="w-14 h-14 rounded-xl bg-[var(--brand-blue)] text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                                    {item.step}
                                </div>
                                <h3 className="text-base font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. Test Types */}
            <section className="py-20 bg-[#F8F9FA]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <span className="text-[var(--brand-blue)] font-semibold text-sm uppercase tracking-wider">Available Tests</span>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">IELTS Test Types & Information</h2>
                    </div>
                    {ieltsItems.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {ieltsItems.map((item: any) => (
                                <div key={item.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all">
                                    {item.imageUrl && (
                                        <div className="aspect-video bg-gray-100 overflow-hidden">
                                            <img src={item.imageUrl} alt={item.testType} className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                    <div className="p-6">
                                        <h3 className="text-lg font-bold text-gray-900 mb-3">{item.testType}</h3>
                                        <p className="text-gray-500 text-sm leading-relaxed mb-4">{item.description}</p>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-sm">
                                                <CreditCard className="w-4 h-4 text-[var(--brand-yellow)]" />
                                                <span className="text-gray-600"><strong>Fee:</strong> {item.fee}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <MapPin className="w-4 h-4 text-[var(--brand-yellow)]" />
                                                <span className="text-gray-600"><strong>Venue:</strong> {item.venue}</span>
                                            </div>
                                            {item.nextDate && (
                                                <div className="flex items-center gap-2 text-sm">
                                                    <Clock className="w-4 h-4 text-[var(--brand-yellow)]" />
                                                    <span className="text-gray-600"><strong>Next Date:</strong> {new Date(item.nextDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-gray-100">
                                            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-2">Requirements</p>
                                            <p className="text-sm text-gray-500">{item.requirements}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { type: "IELTS Academic", desc: "For higher education and professional registration. Tests academic language proficiency.", fee: "Contact for fees", venue: "Contact for venues" },
                                { type: "IELTS General Training", desc: "For migration to English-speaking countries and work experience or training programs.", fee: "Contact for fees", venue: "Contact for venues" },
                                { type: "IELTS for UKVI", desc: "Secure English Language Test (SELT) approved by UK Visas and Immigration.", fee: "Contact for fees", venue: "Contact for venues" },
                            ].map((item) => (
                                <div key={item.type} className="bg-white border border-gray-200 rounded-xl p-8">
                                    <h3 className="text-lg font-bold text-gray-900 mb-3">{item.type}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-4">{item.desc}</p>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-sm"><CreditCard className="w-4 h-4 text-[var(--brand-yellow)]" /><span className="text-gray-600">{item.fee}</span></div>
                                        <div className="flex items-center gap-2 text-sm"><MapPin className="w-4 h-4 text-[var(--brand-yellow)]" /><span className="text-gray-600">{item.venue}</span></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* 6. Why Book Through Cambry */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Why Book IELTS Through Cambry?</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {[
                            "Expert guidance on which IELTS test type suits your goal",
                            "Assistance with test registration and documentation",
                            "Preparation tips and resources from experienced counselors",
                            "Seamless integration with your study abroad application",
                            "Follow-up support for score review and re-booking",
                            "One-stop shop for IELTS + university admissions",
                        ].map((item) => (
                            <div key={item} className="flex items-center gap-3 p-4 bg-[#F8F9FA] border border-gray-200 rounded-md">
                                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <span className="text-sm font-medium text-gray-700">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. Enquiry Form */}
            <section id="enquiry" className="py-20 bg-[#F8F9FA]">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white border border-gray-200 rounded-md p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Interested in IELTS Booking?</h2>
                        <p className="text-gray-500 text-center mb-2">
                            Fill out the form below and our team will contact you within 24 hours.
                        </p>
                        <p className="text-xs text-amber-600 font-medium text-center mb-8">
                            Note: Final booking confirmation requires an in-person visit to our office.
                        </p>
                        <LeadForm />
                    </div>
                </div>
            </section>

            {/* 8. Urgency CTA */}
            <UrgencyCTA />
        </>
    );
}
