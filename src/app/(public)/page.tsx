/* eslint-disable @typescript-eslint/no-explicit-any */
export const dynamic = "force-dynamic";
import Link from "next/link";
import { ArrowRight, GraduationCap, Globe, Users, Award, CheckCircle2, Star, Briefcase, Plane, Home, Shield, TrendingUp, Clock, Headphones, Target, Sparkles } from "lucide-react";
import { getTopUniversities } from "@/actions/universities";
import { getCountries } from "@/actions/countries";
import { getFeaturedTestimonials } from "@/actions/testimonials";
import { getCounselors } from "@/actions/counselors";
import { getFaqs } from "@/actions/faqs";
import { getActiveAnnouncements } from "@/actions/announcements";
import PageHero from "@/components/PageHero";
import LeadForm from "@/components/LeadForm";
import TrustBanner from "@/components/TrustBanner";
import JourneyStepper from "@/components/JourneyStepper";
import ScholarshipSpotlight from "@/components/ScholarshipSpotlight";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import UniversityMarquee from "@/components/UniversityMarquee";
import UrgencyCTA from "@/components/UrgencyCTA";
import UniversityFinder from "@/components/UniversityFinder";
import AnnouncementMarquee from "@/components/AnnouncementMarquee";
import { FadeIn, StaggerContainer, StaggerItem, HoverCard } from "@/components/MotionWrappers";

export default async function HomePage() {
    let universities: Awaited<ReturnType<typeof getTopUniversities>> = [];
    let countries: Awaited<ReturnType<typeof getCountries>> = [];
    let testimonials: any[] = [];
    let counselors: any[] = [];
    let faqs: any[] = [];
    let announcements: any[] = [];

    try {
        [universities, countries, testimonials, counselors, faqs, announcements] = await Promise.all([
            getTopUniversities(100),
            getCountries(),
            getFeaturedTestimonials(),
            getCounselors(),
            getFaqs("General"),
            getActiveAnnouncements(),
        ]);
    } catch {
        // DB not available yet
    }

    const destinations = [
        { name: "United Kingdom", slug: "united-kingdom", flagUrl: "https://flagcdn.com/w80/gb.png", fact: "2-year post-study work visa", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800" },
        { name: "Australia", slug: "australia", flagUrl: "https://flagcdn.com/w80/au.png", fact: "2-4 year post-study work rights", image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800" },
        { name: "Canada", slug: "canada", flagUrl: "https://flagcdn.com/w80/ca.png", fact: "3-year PGWP available", image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800" },
        { name: "Malaysia", slug: "malaysia", flagUrl: "https://flagcdn.com/w80/my.png", fact: "Affordable quality education", image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800" },
        { name: "New Zealand", slug: "new-zealand", flagUrl: "https://flagcdn.com/w80/nz.png", fact: "3-year post-study work visa", image: "https://images.unsplash.com/photo-1469521669194-babb45599def?w=800" },
    ].map(dest => {
        const dbCountry = countries.find(c => c.slug.toLowerCase().trim() === dest.slug.toLowerCase().trim());
        return {
            ...dest,
            flagUrl: (dbCountry?.flagUrl && dbCountry.flagUrl.startsWith('http')) ? dbCountry.flagUrl : dest.flagUrl,
            image: dbCountry?.imageUrl || dest.image,
        };
    });

    const valueProps = [
        { icon: Briefcase, title: "End-to-End Support", desc: "From course selection to arrival at your university, we handle everything.", gradient: "from-blue-500 to-cyan-400" },
        { icon: Award, title: "Scholarship Guidance", desc: "Access exclusive scholarships and financial aid worth thousands.", gradient: "from-amber-500 to-orange-400" },
        { icon: Plane, title: "Visa Assistance", desc: "98% visa approval rate with expert documentation and interview prep.", gradient: "from-emerald-500 to-teal-400" },
        { icon: Home, title: "Accommodation Help", desc: "Safe, affordable housing near your campus arranged before arrival.", gradient: "from-purple-500 to-violet-400" },
    ];

    const processSteps = [
        { step: "01", title: "Free Consultation", desc: "Book a call with our expert counselors to discuss your goals and preferences.", icon: Headphones },
        { step: "02", title: "University Matching", desc: "We shortlist the best universities and programs based on your profile.", icon: Target },
        { step: "03", title: "Application & Visa", desc: "Complete application support including SOP, documents, and visa filing.", icon: Shield },
        { step: "04", title: "Fly & Study", desc: "Pre-departure orientation, accommodation setup, and airport assistance.", icon: Plane },
    ];

    return (
        <>
            {/* ===== HERO ===== */}
            <PageHero
                badge="Trusted by 500+ Students Worldwide"
                badgeIcon={GraduationCap}
                title={<>Your Global Future<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400">Starts Here</span></>}
                subtitle="Cambry is your trusted International Admission Centre. We guide you from course selection to visa approval across top universities in the UK, Australia, Canada, Malaysia & New Zealand."
                backgroundImage="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&q=80"
                backgroundAlt="Students on university campus"
                cta={{ label: "Book Free Consultation", href: "/contact" }}
            >
                {/* Floating stats */}
                <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-3xl mx-auto">
                    {[
                        { value: "500+", label: "Students Placed", icon: Users },
                        { value: "50+", label: "Partner Universities", icon: GraduationCap },
                        { value: "5", label: "Countries", icon: Globe },
                        { value: "98%", label: "Visa Success", icon: Award },
                    ].map((stat) => (
                        <div key={stat.label} className="bg-white/[0.06] backdrop-blur-xl border border-white/[0.08] rounded-2xl px-4 py-5 text-center hover:bg-white/[0.1] transition-colors duration-300">
                            <stat.icon className="w-5 h-5 text-amber-400 mx-auto mb-2" />
                            <p className="text-2xl font-extrabold text-white">{stat.value}</p>
                            <p className="text-[11px] text-blue-200/60 font-semibold uppercase tracking-widest mt-1">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </PageHero>

            {/* ===== ANNOUNCEMENT MARQUEE ===== */}
            <AnnouncementMarquee announcements={announcements} />

            {/* ===== TRUST BANNER ===== */}
            <TrustBanner />

            {/* ===== WHY CHOOSE US ===== */}
            <section className="py-28 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-blue-50/80 to-purple-50/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-50/50 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3 pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <FadeIn direction="up">
                        <div className="text-center mb-20">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-100 text-amber-600 text-xs font-bold uppercase tracking-widest mb-6">
                                <Sparkles className="w-3.5 h-3.5" /> Why Choose Us
                            </div>
                            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0A1628] tracking-tight">
                                Why Students Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-blue)] to-[var(--accent)]">Cambry</span>
                            </h2>
                            <p className="text-gray-500 mt-5 max-w-2xl mx-auto text-lg leading-relaxed">We make studying abroad simple, affordable, and stress-free with our comprehensive premium support services.</p>
                        </div>
                    </FadeIn>

                    <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {valueProps.map((item) => (
                            <StaggerItem key={item.title}>
                                <HoverCard className="bg-white border border-gray-100/80 rounded-3xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-500 h-full group relative overflow-hidden">
                                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-[0.06] rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 transition-opacity duration-500`} />
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        <item.icon className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="font-bold text-[#0A1628] text-xl mb-3">{item.title}</h3>
                                    <p className="text-gray-500 leading-relaxed text-[15px]">{item.desc}</p>
                                </HoverCard>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* ===== HOW IT WORKS ===== */}
            <section className="py-28 bg-[#0A1628] relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920&q=20')] opacity-[0.03] bg-cover bg-center" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-500/[0.07] rounded-full blur-[150px] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <FadeIn direction="up">
                        <div className="text-center mb-20">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/[0.08] text-amber-400 text-xs font-bold uppercase tracking-widest mb-6">
                                <Target className="w-3.5 h-3.5" /> How It Works
                            </div>
                            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">Your Journey in <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">4 Simple Steps</span></h2>
                        </div>
                    </FadeIn>

                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {processSteps.map((item, i) => (
                            <StaggerItem key={item.step} className="relative text-center group">
                                {/* Connector line */}
                                {i < processSteps.length - 1 && (
                                    <div className="hidden lg:block absolute top-14 left-[calc(50%+50px)] w-[calc(100%-100px)] h-px bg-gradient-to-r from-white/20 via-amber-400/30 to-white/20" />
                                )}

                                <div className="relative inline-flex flex-col items-center">
                                    <div className="relative w-28 h-28 rounded-3xl bg-white/[0.04] backdrop-blur-md border border-white/[0.08] flex items-center justify-center mx-auto mb-8 group-hover:bg-white/[0.08] group-hover:border-amber-400/30 group-hover:-translate-y-2 transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
                                        <item.icon className="w-10 h-10 text-amber-400 group-hover:scale-110 transition-transform duration-300" />
                                        <div className="absolute -top-3 -right-3 w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-400 flex items-center justify-center text-white font-extrabold text-sm shadow-[0_4px_15px_rgba(245,158,11,0.4)]">
                                            {item.step}
                                        </div>
                                    </div>
                                    <h3 className="text-white font-bold text-xl mb-3">{item.title}</h3>
                                    <p className="text-blue-200/50 leading-relaxed px-2 text-[15px]">{item.desc}</p>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* ===== TOP DESTINATIONS ===== */}
            <section className="py-28 bg-[var(--off-white)] relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeIn direction="up">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-widest mb-6">
                                <Globe className="w-3.5 h-3.5" /> Destinations
                            </div>
                            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0A1628] tracking-tight">Top Study Destinations</h2>
                        </div>
                    </FadeIn>

                    <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
                        {destinations.map((dest) => (
                            <StaggerItem key={dest.slug}>
                                <Link
                                    href={`/destinations/${dest.slug}`}
                                    className="block group bg-white rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-2 h-full border border-gray-100/50"
                                >
                                    <div className="relative h-52 overflow-hidden">
                                        <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                        <div className="absolute bottom-4 left-4 z-20 flex items-center gap-3">
                                            {dest.flagUrl && dest.flagUrl.startsWith('http') && (
                                                <img src={dest.flagUrl} alt={`${dest.name} flag`} className="w-8 h-6 rounded-sm border border-white/30 object-cover shadow-md" />
                                            )}
                                            <h3 className="font-bold text-white text-lg drop-shadow-lg">{dest.name}</h3>
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <p className="text-sm text-gray-500 font-medium leading-relaxed group-hover:text-amber-600 transition-colors duration-300">{dest.fact}</p>
                                    </div>
                                </Link>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* ===== UNIVERSITY FINDER ===== */}
            <UniversityFinder
                universities={universities.map(u => ({
                    id: u.id,
                    name: u.name,
                    slug: u.slug,
                    location: u.location,
                    tuitionEstimate: u.tuitionEstimate,
                    website: u.website,
                    imageUrl: u.imageUrl,
                    country: { name: u.country.name, slug: u.country.slug },
                }))}
                countries={countries.map(c => ({
                    id: c.id,
                    name: c.name,
                    slug: c.slug,
                }))}
            />

            {/* ===== JOURNEY STEPPER ===== */}
            <JourneyStepper />

            {/* ===== IMPACT STATS ===== */}
            <section className="py-28 relative overflow-hidden">
                <div className="absolute inset-0 bg-[#0A1628]" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/[0.06] rounded-full blur-[150px] pointer-events-none" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
                    <FadeIn direction="up">
                        <div className="text-center mb-20">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/[0.08] text-amber-400 text-xs font-bold uppercase tracking-widest mb-6">
                                <TrendingUp className="w-3.5 h-3.5" /> Our Impact
                            </div>
                            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">Numbers That Speak</h2>
                            <p className="text-blue-200/40 mt-5 max-w-xl mx-auto text-lg">Every number represents a dream we helped turn into reality.</p>
                        </div>
                    </FadeIn>

                    <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { value: "500+", label: "Students Placed", icon: GraduationCap, gradient: "from-blue-500 to-cyan-400" },
                            { value: "98%", label: "Visa Success Rate", icon: Shield, gradient: "from-emerald-500 to-teal-400" },
                            { value: "50+", label: "Partner Universities", icon: Globe, gradient: "from-purple-500 to-violet-400" },
                            { value: "6+", label: "Years of Excellence", icon: TrendingUp, gradient: "from-amber-500 to-orange-400" },
                        ].map((item) => (
                            <StaggerItem key={item.label} className="text-center group">
                                <div className="bg-white/[0.04] backdrop-blur-md border border-white/[0.06] rounded-3xl p-8 hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-500">
                                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                                        <item.icon className="w-10 h-10 text-white" />
                                    </div>
                                    <p className="text-5xl font-extrabold text-white tracking-tight">{item.value}</p>
                                    <p className="text-sm text-blue-200/40 mt-3 font-bold uppercase tracking-widest">{item.label}</p>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* ===== SCHOLARSHIP SPOTLIGHT ===== */}
            <ScholarshipSpotlight />

            {/* ===== LEAD FORM ===== */}
            <section className="py-28 bg-white relative overflow-hidden">
                <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-amber-50/60 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-50/60 rounded-full blur-[100px] translate-y-1/2 translate-x-1/3 pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <FadeIn direction="right">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-100 text-amber-600 text-xs font-bold uppercase tracking-widest mb-6">
                                <Sparkles className="w-3.5 h-3.5" /> Get Started
                            </div>
                            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0A1628] tracking-tight leading-tight">
                                Ready to Start Your<br />Study Abroad Journey?
                            </h2>
                            <p className="text-gray-500 mt-6 leading-relaxed text-lg">
                                Fill out the form and one of our expert counselors will get in touch within 24 hours. Our consultation is completely free.
                            </p>
                            <div className="mt-10 space-y-4">
                                {["Free personalized counseling", "No hidden fees", "Expert visa guidance", "24/7 support"].map((item) => (
                                    <div key={item} className="flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0">
                                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                        </div>
                                        <span className="text-gray-700 font-semibold">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </FadeIn>

                        <FadeIn direction="left" delay={0.2}>
                            <div className="bg-white border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.06)] rounded-3xl p-10 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-50 to-purple-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                                <h3 className="text-2xl font-bold text-[#0A1628] mb-8 relative z-10 flex items-center gap-3">
                                    <span className="w-1.5 h-8 bg-gradient-to-b from-amber-500 to-amber-400 rounded-full" />
                                    Book Free Consultation
                                </h3>
                                <div className="relative z-10">
                                    <LeadForm />
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* ===== TESTIMONIALS ===== */}
            <TestimonialsCarousel testimonials={testimonials.length > 0 ? testimonials : [
                { studentName: "Rahul Sharma", studentCourse: "MSc Data Science", universityName: "Imperial College London", targetCountry: "UK", quote: "Cambry made my UK dream possible. The visa process was flawless and the support was incredible." },
                { studentName: "Ayesha Rahman", studentCourse: "BEng Mechanical", universityName: "University of Toronto", targetCountry: "Canada", quote: "I got a fast-track offer and a CAD 10,000 scholarship thanks to my counselor at Cambry." },
                { studentName: "Priya Das", studentCourse: "MBA", universityName: "University of Melbourne", targetCountry: "Australia", quote: "The team at Cambry guided me through every step. I couldn't have done it without them." },
            ]} />

            {/* ===== PARTNERS ===== */}
            <section className="py-24 bg-[var(--off-white)] relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeIn direction="up">
                        <div className="text-center mb-14">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-widest mb-6">
                                <Shield className="w-3.5 h-3.5" /> Trusted Partners
                            </div>
                            <h2 className="text-4xl font-extrabold text-[#0A1628] tracking-tight">Our Accreditations & Partnerships</h2>
                        </div>
                    </FadeIn>
                    <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
                        {[
                            { name: "British Council", logo: "https://www.britishcouncil.in/profiles/solas2/themes/solas_ui/images/desktop/britishcouncil_indigo_logo.jpg" },
                            { name: "IELTS Official", logo: "https://1000logos.net/wp-content/uploads/2021/03/IELTS-logo.jpg" },
                            { name: "IDP Education", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThDu-SQB0s3K7sjA6GR_cpRmqNinNDHnEd1A&s" },
                            { name: "ICEF Certified", logo: "https://www.icef.com/academy/wp-content/uploads/2020/02/ICEF-Academy-Logo-Blue.png" },
                            { name: "Universities UK", logo: "https://images.seeklogo.com/logo-png/14/1/universities-uk-logo-png_seeklogo-145932.png" },
                            { name: "Cambry IELTS Admission", logo: "data:image/jpeg;base64,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" },
                        ].map((partner) => (
                            <StaggerItem key={partner.name}>
                                <div className="flex flex-col items-center justify-center gap-4 p-6 bg-white border border-gray-100 rounded-2xl hover:shadow-xl hover:shadow-[var(--brand-blue)]/5 transition-all duration-300 hover:-translate-y-1 cursor-default h-full">
                                    <div className="h-12 flex items-center justify-center">
                                        <img src={partner.logo} alt={partner.name} className="max-h-full max-w-full object-contain mix-blend-multiply" />
                                    </div>
                                    <span className="text-sm font-bold text-[#0A1628] text-center">{partner.name}</span>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* ===== UNIVERSITY MARQUEE ===== */}
            <UniversityMarquee universities={universities.length > 0
                ? universities.map(u => ({ name: u.name, imageUrl: u.imageUrl }))
                : [
                    { name: "University of Oxford", imageUrl: "https://logo.clearbit.com/ox.ac.uk" },
                    { name: "Imperial College London", imageUrl: "https://logo.clearbit.com/imperial.ac.uk" },
                    { name: "University of Toronto", imageUrl: "https://logo.clearbit.com/utoronto.ca" }
                ]
            } />

            {/* ===== COUNSELORS & FAQ ===== */}
            <section className="py-28 bg-white relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-50/60 rounded-full blur-[120px] translate-y-1/2 translate-x-1/3 pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16">
                        {/* Counselors */}
                        <div>
                            <FadeIn direction="up">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-100 text-amber-600 text-xs font-bold uppercase tracking-widest mb-6">
                                    <Users className="w-3.5 h-3.5" /> Our Team
                                </div>
                                <h2 className="text-4xl font-extrabold text-[#0A1628] mb-10 tracking-tight">Certified Counselors</h2>
                            </FadeIn>
                            <StaggerContainer className="grid grid-cols-2 gap-5">
                                {(counselors.length > 0 ? counselors.slice(0, 4) : [
                                    { name: "British Council Certified Counselor" },
                                    { name: "ABC Certified Counselor" },
                                    { name: "NZQA Certified Counselor" },
                                    { name: "ICEF Certified Counselor" },
                                ]).map((c: any) => (
                                    <StaggerItem key={c.name}>
                                        <div className="bg-white border border-gray-100/80 rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-500 group text-center h-full flex flex-col items-center justify-center">
                                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-400 flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                                                <Award className="w-7 h-7 text-white" />
                                            </div>
                                            <p className="font-bold text-[#0A1628] text-base leading-snug">{c.name}</p>
                                        </div>
                                    </StaggerItem>
                                ))}
                            </StaggerContainer>
                        </div>

                        {/* FAQ */}
                        <div>
                            <FadeIn direction="up" delay={0.2}>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-widest mb-6">
                                    <Star className="w-3.5 h-3.5" /> FAQ
                                </div>
                                <h2 className="text-4xl font-extrabold text-[#0A1628] mb-10 tracking-tight">Common Questions</h2>
                            </FadeIn>
                            <div className="space-y-3">
                                {(faqs.length > 0 ? faqs.slice(0, 5) : [
                                    { question: "Can I apply without IELTS?", answer: "Many universities accept MOI (Medium of Instruction) or alternative tests like Duolingo depending on the country." },
                                    { question: "What is the study gap limit?", answer: "Most countries accept study gaps with proper justification. UK is generally lenient with 5-10+ year gaps." },
                                    { question: "How long does the process take?", answer: "From initial consultation to receiving your offer letter, it typically takes 4-8 weeks depending on the university and program." },
                                    { question: "Is the consultation really free?", answer: "Yes! Our initial consultation is completely free with no obligations. We only charge service fees after you decide to proceed." },
                                ]).map((faq: any, i: number) => (
                                    <FadeIn direction="up" delay={0.3 + (i * 0.1)} key={i}>
                                        <details className="group bg-white border border-gray-100/80 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300 overflow-hidden">
                                            <summary className="flex items-center justify-between p-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                                                <span className="font-bold text-[#0A1628] text-[15px] pr-4">{faq.question}</span>
                                                <div className="w-8 h-8 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 group-open:bg-amber-500 group-open:border-amber-500 group-open:text-white transition-all duration-300">
                                                    <span className="text-lg leading-none transform group-open:rotate-45 transition-transform duration-300">+</span>
                                                </div>
                                            </summary>
                                            <div className="px-6 pb-6 text-[15px] text-gray-500 leading-relaxed border-t border-gray-50">
                                                {faq.answer}
                                            </div>
                                        </details>
                                    </FadeIn>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== URGENCY CTA ===== */}
            <UrgencyCTA />
        </>
    );
}
