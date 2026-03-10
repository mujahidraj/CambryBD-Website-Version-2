export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock, MessageCircle, ArrowRight, Sparkles } from "lucide-react";
import LeadForm from "@/components/LeadForm";
import PageHero from "@/components/PageHero";
import TrustBanner from "@/components/TrustBanner";
import UrgencyCTA from "@/components/UrgencyCTA";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/MotionWrappers";
import { getFaqs } from "@/actions/faqs";

export const metadata: Metadata = {
    title: "Contact Us | Cambry International Admission Centre",
    description: "Get in touch with Cambry's expert counselors. Free consultation for study abroad opportunities.",
};

export default async function ContactPage() {
    let faqs: any[] = [];
    try {
        faqs = await getFaqs("General");
    } catch { }

    return (
        <>
            {/* 1. Hero */}
            <PageHero
                badge="We're Here to Help"
                badgeIcon={MessageCircle}
                title={<><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">Contact</span> Us</>}
                subtitle="Ready to start your study abroad journey? Get in touch with our expert counselors for a free consultation."
                backgroundImage="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1920&q=80"
                backgroundAlt="Customer support team"
            />

            {/* 2. Trust */}
            <TrustBanner />

            {/* 3. Contact Form + Info */}
            <section className="py-28 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/40 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-50/30 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-5 gap-16">
                        {/* Form */}
                        <FadeIn direction="right" className="lg:col-span-3">
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-100/60 text-amber-600 text-[11px] font-bold uppercase tracking-[0.2em] mb-6 shadow-sm">
                                <Sparkles className="w-3.5 h-3.5" /> Free Consultation
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A1628] mb-4 tracking-tight">Book Your Free Consultation</h2>
                            <p className="text-gray-500 mb-10 text-lg">Fill out the form and our counselor will contact you within 24 hours.</p>
                            <div className="bg-white border border-gray-100/60 rounded-3xl p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.06)] relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50/30 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                                <div className="relative z-10">
                                    <LeadForm />
                                </div>
                            </div>
                        </FadeIn>

                        {/* Contact Info */}
                        <FadeIn direction="left" delay={0.2} className="lg:col-span-2 space-y-6">
                            <div>
                                <h2 className="text-3xl font-extrabold text-[#0A1628] mb-8 tracking-tight">Get In Touch</h2>
                                <div className="space-y-4">
                                    {[
                                        { icon: Mail, title: "Email", value: "info@cambrybd.com", href: "mailto:info@cambrybd.com", gradient: "from-blue-500 to-cyan-400" },
                                        { icon: Phone, title: "Phone", value: "+880 1700-000000", href: "tel:+8801700000000", gradient: "from-green-500 to-emerald-400" },
                                        { icon: MessageCircle, title: "WhatsApp", value: "+880 1700-000000", href: "https://wa.me/8801700000000", gradient: "from-emerald-500 to-green-400" },
                                        { icon: MapPin, title: "Address", value: "Dhaka, Bangladesh", href: null, gradient: "from-amber-500 to-yellow-400" },
                                    ].map((item) => (
                                        <div key={item.title} className="flex items-start gap-4 p-5 bg-white border border-gray-100/60 rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-300 group">
                                            <div className={`w-12 h-12 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                                                <item.icon className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">{item.title}</p>
                                                {item.href ? (
                                                    <a href={item.href} className="text-base font-bold text-[#0A1628] hover:text-amber-600 transition-colors">{item.value}</a>
                                                ) : (
                                                    <p className="text-base font-bold text-[#0A1628]">{item.value}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Office Hours */}
                            <div className="p-8 bg-[#0A1628] rounded-3xl shadow-[0_20px_60px_rgba(10,22,40,0.3)] relative overflow-hidden group">
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
                                <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                                <div className="flex items-center gap-4 mb-6 relative z-10">
                                    <div className="w-12 h-12 bg-white/[0.06] border border-white/[0.08] rounded-xl flex items-center justify-center backdrop-blur-md">
                                        <Clock className="w-5 h-5 text-amber-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white tracking-tight">Office Hours</h3>
                                </div>
                                <div className="space-y-4 relative z-10">
                                    <div className="flex justify-between items-center text-gray-400 border-b border-white/[0.06] pb-4">
                                        <span className="font-medium">Saturday – Thursday</span>
                                        <span className="font-bold text-white bg-white/[0.06] px-3 py-1.5 rounded-lg text-sm">10:00 AM – 7:00 PM</span>
                                    </div>
                                    <div className="flex justify-between items-center text-gray-400">
                                        <span className="font-medium">Friday</span>
                                        <span className="font-bold text-red-400 bg-red-400/10 px-3 py-1.5 rounded-lg text-sm">Closed</span>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* 4. Map */}
            <section className="py-28 bg-gradient-to-b from-[var(--off-white)] to-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <FadeIn direction="up">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100/60 text-blue-600 text-[11px] font-bold uppercase tracking-[0.2em] mb-6 shadow-sm">
                                <MapPin className="w-3.5 h-3.5" /> Location
                            </div>
                            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0A1628] tracking-tight">Visit Our Office</h2>
                            <p className="text-gray-500 mt-4 text-lg">We&apos;re located in the heart of Dhaka</p>
                        </div>
                    </FadeIn>
                    <FadeIn direction="up" delay={0.2}>
                        <div className="bg-white border border-gray-100/60 rounded-3xl h-96 flex items-center justify-center shadow-[0_20px_60px_rgba(0,0,0,0.06)] group hover:shadow-[0_30px_80px_rgba(0,0,0,0.1)] transition-all duration-500 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-amber-50/20" />
                                <div className="text-center relative z-10 p-10 bg-white/95 backdrop-blur-md border border-gray-100/60 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.06)] transform group-hover:-translate-y-1 transition-transform duration-500">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                                    <MapPin className="w-8 h-8 text-white" />
                                </div>
                                <p className="text-2xl font-extrabold text-[#0A1628] tracking-tight mb-2">Cambry International Admission Centre</p>
                                <p className="text-gray-500 text-lg mb-6">Dhaka, Bangladesh</p>
                                <a
                                    href="https://maps.google.com/?q=Dhaka,Bangladesh"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#0A1628] text-white rounded-xl font-bold text-sm hover:bg-[#0A1628]/90 transition-all duration-300 shadow-md hover:shadow-[0_8px_30px_rgba(10,22,40,0.3)] group/btn"
                                >
                                    Open in Google Maps
                                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* 12. Urgency CTA */}
            <UrgencyCTA />
        </>
    );
}
