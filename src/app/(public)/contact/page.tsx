import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock, MessageCircle, ArrowRight } from "lucide-react";
import LeadForm from "@/components/LeadForm";
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
            <section className="relative min-h-[70vh] flex items-center justify-center pt-24 pb-24 bg-[#0A1628] overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1920&q=80"
                        alt="Customer support team"
                        className="w-full h-full object-cover mix-blend-overlay opacity-40 animate-pulse-slow"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/80 to-[#0A1628]/60" />
                </div>
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[128px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--brand-yellow)] rounded-full blur-[128px]" />
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 w-full mt-10">
                    <FadeIn direction="up">
                        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-sm text-[var(--brand-yellow)] mb-8 font-bold uppercase tracking-widest shadow-2xl">
                            <MessageCircle className="w-4 h-4" />
                            We're Here to Help
                        </div>
                        <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold text-white leading-[1.1] tracking-tight drop-shadow-2xl">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-yellow)] to-[var(--brand-yellow)]">Contact</span> Us
                        </h1>
                        <p className="text-blue-100/80 mt-8 max-w-3xl mx-auto text-xl md:text-2xl leading-relaxed font-light drop-shadow-md">
                            Ready to start your study abroad journey? Get in touch with our expert counselors for a free consultation.
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* 2. Trust */}
            <TrustBanner />

            {/* 3. Contact Form + Info */}
            <section className="py-24 bg-white relative">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-5 gap-16">
                        {/* Form */}
                        <FadeIn direction="right" className="lg:col-span-3">
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A1628] mb-4 tracking-tight">Book Your Free Consultation</h2>
                            <p className="text-gray-500 mb-10 text-lg">Fill out the form and our counselor will contact you within 24 hours.</p>
                            <div className="bg-gradient-to-br from-[#F8F9FA] to-white border border-gray-100 rounded-3xl p-10 shadow-xl shadow-blue-900/5 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                                <div className="relative z-10">
                                    <LeadForm />
                                </div>
                            </div>
                        </FadeIn>

                        {/* Contact Info */}
                        <FadeIn direction="left" delay={0.2} className="lg:col-span-2 space-y-8">
                            <div>
                                <h2 className="text-3xl font-extrabold text-[#0A1628] mb-8 tracking-tight">Get In Touch</h2>
                                <div className="space-y-4">
                                    {[
                                        { icon: Mail, title: "Email", value: "info@cambrybd.com", href: "mailto:info@cambrybd.com" },
                                        { icon: Phone, title: "Phone", value: "+880 1700-000000", href: "tel:+8801700000000" },
                                        { icon: MessageCircle, title: "WhatsApp", value: "+880 1700-000000", href: "https://wa.me/8801700000000" },
                                        { icon: MapPin, title: "Address", value: "Dhaka, Bangladesh", href: null },
                                    ].map((item) => (
                                        <div key={item.title} className="flex items-start gap-5 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
                                            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--brand-yellow)] transition-colors duration-300">
                                                <item.icon className="w-6 h-6 text-[var(--brand-blue)] group-hover:text-white transition-colors" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">{item.title}</p>
                                                {item.href ? (
                                                    <a href={item.href} className="text-lg font-bold text-[#0A1628] hover:text-[var(--brand-yellow)] transition-colors">{item.value}</a>
                                                ) : (
                                                    <p className="text-lg font-bold text-[#0A1628]">{item.value}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Office Hours */}
                            <div className="p-8 bg-gradient-to-br from-[var(--brand-blue)] to-[#0A1628] rounded-3xl shadow-xl border border-white/10 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--brand-yellow)] rounded-full blur-[64px] -translate-y-1/2 translate-x-1/2 opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none" />
                                <div className="flex items-center gap-4 mb-6 relative z-10">
                                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md">
                                        <Clock className="w-6 h-6 text-[var(--brand-yellow)]" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white tracking-tight">Office Hours</h3>
                                </div>
                                <div className="space-y-4 relative z-10">
                                    <div className="flex justify-between items-center text-gray-300 border-b border-white/10 pb-4">
                                        <span className="font-medium">Saturday – Thursday</span>
                                        <span className="font-bold text-white bg-white/10 px-3 py-1 rounded-lg text-sm">10:00 AM – 7:00 PM</span>
                                    </div>
                                    <div className="flex justify-between items-center text-gray-300">
                                        <span className="font-medium">Friday</span>
                                        <span className="font-bold text-red-400 bg-red-400/10 px-3 py-1 rounded-lg text-sm">Closed</span>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* 4. Map */}
            <section className="py-24 bg-[#F8F9FA] relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <FadeIn direction="up">
                        <div className="text-center mb-16">
                            <span className="text-[var(--brand-yellow)] font-bold text-sm uppercase tracking-widest">Location</span>
                            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0A1628] mt-3 tracking-tight">Visit Our Office</h2>
                            <p className="text-gray-500 mt-4 text-lg">We&apos;re located in the heart of Dhaka</p>
                        </div>
                    </FadeIn>
                    <FadeIn direction="up" delay={0.2}>
                        <div className="bg-white border border-gray-100 rounded-3xl h-96 flex items-center justify-center shadow-lg shadow-blue-900/5 group hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=Dhaka,Bangladesh&zoom=13&size=1200x600&maptype=roadmap&style=feature:all|element:labels.text.fill|color:0x333333&style=feature:water|element:geometry|color:0xc8d7d4&style=feature:landscape|element:geometry|color:0xffffff&key=YOUR_API_KEY')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity duration-500 grayscale group-hover:grayscale-0" />
                            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />
                            <div className="text-center relative z-10 p-10 bg-white/90 backdrop-blur-md border border-white rounded-3xl shadow-xl transform group-hover:-translate-y-2 transition-transform duration-500">
                                <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[var(--brand-yellow)] transition-colors duration-300 shadow-inner">
                                    <MapPin className="w-10 h-10 text-[var(--brand-blue)] group-hover:text-white transition-colors" />
                                </div>
                                <p className="text-2xl font-extrabold text-[#0A1628] tracking-tight mb-2">Cambry International Admission Centre</p>
                                <p className="text-gray-500 text-lg mb-6">Dhaka, Bangladesh</p>
                                <a
                                    href="https://maps.google.com/?q=Dhaka,Bangladesh"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--brand-blue)] text-white rounded-full font-bold text-sm hover:bg-[var(--brand-yellow)] transition-colors duration-300 shadow-md hover:shadow-xl"
                                >
                                    Open in Google Maps
                                    <ArrowRight className="w-4 h-4" />
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
