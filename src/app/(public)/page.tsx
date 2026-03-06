export const dynamic = "force-dynamic";
import Link from "next/link";
import { ArrowRight, GraduationCap, Globe, Users, Award, CheckCircle2, Star, Briefcase, Plane, Home, Shield, TrendingUp, Clock, Headphones, Target } from "lucide-react";
import { getTopUniversities } from "@/actions/universities";
import { getCountries } from "@/actions/countries";
import { getFeaturedTestimonials } from "@/actions/testimonials";
import { getCounselors } from "@/actions/counselors";
import { getFaqs } from "@/actions/faqs";
import { getActiveAnnouncements } from "@/actions/announcements";
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
            getTopUniversities(100), // Get all so the Finder can filter successfully by all countries
            getCountries(),
            getFeaturedTestimonials(),
            getCounselors(),
            getFaqs("General"),
            getActiveAnnouncements(),
        ]);
    } catch {
        // DB not available yet
    }

    const stats = [
        { value: "500+", label: "Students Placed", icon: Users },
        { value: "50+", label: "Partner Universities", icon: GraduationCap },
        { value: "5", label: "Countries", icon: Globe },
        { value: "98%", label: "Visa Success Rate", icon: Award },
    ];
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
        { icon: Briefcase, title: "End-to-End Support", desc: "From course selection to arrival at your university, we handle everything." },
        { icon: Award, title: "Scholarship Guidance", desc: "Access exclusive scholarships and financial aid worth thousands." },
        { icon: Plane, title: "Visa Assistance", desc: "98% visa approval rate with expert documentation and interview prep." },
        { icon: Home, title: "Accommodation Help", desc: "Safe, affordable housing near your campus arranged before arrival." },
    ];

    const processSteps = [
        { step: "01", title: "Free Consultation", desc: "Book a call with our expert counselors to discuss your goals and preferences.", icon: Headphones },
        { step: "02", title: "University Matching", desc: "We shortlist the best universities and programs based on your profile.", icon: Target },
        { step: "03", title: "Application & Visa", desc: "Complete application support including SOP, documents, and visa filing.", icon: Shield },
        { step: "04", title: "Fly & Study", desc: "Pre-departure orientation, accommodation setup, and airport assistance.", icon: Plane },
    ];

    return (
        <>
            {/* ===== SECTION 1: FULL-WINDOW HERO WITH IMAGE ===== */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&q=80"
                        alt="Students on university campus"
                        className="w-full h-full object-cover scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628]/95 via-[#0A1628]/85 to-blue-900/60" />
                </div>
                <div className="absolute inset-0 opacity-20 mix-blend-screen pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500 rounded-full blur-[128px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[var(--brand-yellow)] rounded-full blur-[128px]" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 w-full z-10">
                    <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
                        <FadeIn direction="up">
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-sm text-blue-200 mb-8 shadow-2xl">
                                <Star className="w-4 h-4 text-[var(--brand-yellow)]" />
                                Trusted by 500+ Students Worldwide
                            </div>
                        </FadeIn>
                        <FadeIn direction="up" delay={0.1}>
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
                                Your Global Future <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-yellow)] to-[var(--brand-yellow)]">Starts Here</span>
                            </h1>
                        </FadeIn>
                        <FadeIn direction="up" delay={0.2}>
                            <p className="mt-6 text-xl text-gray-300 leading-relaxed">
                                Cambry is your trusted International Admission Centre. We guide you from course selection to visa approval across top universities in the UK, Australia, Canada, Malaysia & New Zealand.
                            </p>
                        </FadeIn>
                        <FadeIn direction="up" delay={0.3}>
                            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[var(--brand-yellow)] to-[var(--brand-yellow)] text-white font-bold rounded-full hover:shadow-[0_0_30px_rgba(232,114,12,0.4)] hover:scale-105 transition-all duration-300"
                                >
                                    Book Free Consultation <ArrowRight className="w-5 h-5" />
                                </Link>
                                <Link
                                    href="/destinations"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-2xl text-white font-bold rounded-full hover:bg-white/20 border border-white/20 hover:scale-105 transition-all duration-300"
                                >
                                    Explore Destinations
                                </Link>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* ===== ANNOUNCEMENT MARQUEE ===== */}
            <AnnouncementMarquee announcements={announcements} />

            {/* ===== SECTION 2: TRUST & AUTHORITY BANNER ===== */}
            <TrustBanner />

            {/* ===== SECTION 3: CORE VALUE PROPOSITION GRID ===== */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <FadeIn direction="up">
                        <div className="text-center mb-16">
                            <span className="text-[var(--brand-yellow)] font-bold text-sm uppercase tracking-widest">Why Choose Us</span>
                            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0A1628] mt-3 tracking-tight">Why Students Choose Cambry</h2>
                            <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">We make studying abroad simple, affordable, and stress-free with our comprehensive premium support services.</p>
                        </div>
                    </FadeIn>
                    <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {valueProps.map((item) => (
                            <StaggerItem key={item.title}>
                                <HoverCard className="bg-white border border-gray-100/50 rounded-2xl p-8 shadow-xl shadow-blue-900/5 hover:shadow-2xl hover:shadow-blue-900/10 transition-all h-full">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center mb-6 text-[var(--brand-blue)]">
                                        <item.icon className="w-7 h-7" />
                                    </div>
                                    <h3 className="font-bold text-[#0A1628] text-xl mb-3">{item.title}</h3>
                                    <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                                </HoverCard>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* ===== SECTION 4: HOW IT WORKS — VISUAL PROCESS ===== */}
            <section className="py-24 bg-[#0A1628] relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920&q=20')] opacity-5 bg-cover bg-center mix-blend-screen" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <FadeIn direction="up">
                        <div className="text-center mb-20">
                            <span className="text-[var(--brand-yellow)] font-bold text-sm uppercase tracking-widest">How It Works</span>
                            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mt-3 tracking-tight">Your Journey in 4 Simple Steps</h2>
                        </div>
                    </FadeIn>
                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                        {processSteps.map((item, i) => (
                            <StaggerItem key={item.step} className="relative text-center group">
                                <div className="w-24 h-24 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center mx-auto mb-8 group-hover:-translate-y-2 group-hover:bg-[var(--brand-yellow)]/20 group-hover:border-[var(--brand-yellow)]/50 transition-all duration-300 shadow-2xl">
                                    <item.icon className="w-10 h-10 text-[var(--brand-yellow)] group-hover:text-white transition-colors" />
                                </div>
                                <div className="absolute top-0 right-1/4 lg:right-auto lg:left-[55%] w-8 h-8 rounded-full bg-gradient-to-br from-[var(--brand-yellow)] to-[var(--brand-yellow)] flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-[var(--brand-yellow)]/30">
                                    {item.step}
                                </div>
                                <h3 className="text-white font-bold text-xl mb-3">{item.title}</h3>
                                <p className="text-gray-400 leading-relaxed px-2">{item.desc}</p>
                                {i < processSteps.length - 1 && (
                                    <div className="hidden lg:block absolute top-12 left-[calc(50%+60px)] w-[calc(100%-120px)] h-[2px] bg-gradient-to-r from-[var(--brand-yellow)]/40 via-[var(--brand-yellow)]/20 to-transparent" />
                                )}
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* ===== SECTION 5: INTERACTIVE TOP DESTINATIONS ===== */}
            <section className="py-24 bg-[#F8F9FA] relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeIn direction="up">
                        <div className="text-center mb-16">
                            <span className="text-[var(--brand-yellow)] font-bold text-sm uppercase tracking-widest">Destinations</span>
                            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0A1628] mt-3 tracking-tight">Top Study Destinations</h2>
                        </div>
                    </FadeIn>
                    <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                        {destinations.map((dest) => (
                            <StaggerItem key={dest.slug}>
                                <Link
                                    href={`/destinations/${dest.slug}`}
                                    className="block group bg-white rounded-2xl overflow-hidden shadow-lg shadow-black/5 hover:shadow-2xl hover:shadow-[var(--brand-yellow)]/10 transition-all duration-300 hover:-translate-y-2 h-full border border-gray-100"
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply z-10 group-hover:opacity-0 transition-opacity duration-500" />
                                        <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                                        <div className="absolute bottom-4 left-4 z-20 flex items-center gap-3">
                                            {(() => {
                                                const flag = dest.flagUrl;
                                                if (!flag) return null;
                                                if (flag.startsWith('http')) return <img src={flag} alt={`${dest.name} flag`} className="w-8 h-6 rounded border border-white/20 object-cover shadow-sm" />;

                                                const codePoints = Array.from(flag).map(c => c.codePointAt(0)?.toString(16));
                                                if (codePoints.length && codePoints.every(c => c)) {
                                                    return <img src={`https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/${codePoints.join('-')}.svg`} alt={`${dest.name} flag`} className="w-8 h-6 rounded border border-white/20 object-cover shadow-sm bg-white" />;
                                                }
                                                return null;
                                            })()}
                                            <h3 className="font-bold text-white text-lg tracking-wide">{dest.name}</h3>
                                        </div>
                                    </div>
                                    <div className="p-5 bg-white">
                                        <p className="text-sm text-gray-500 font-medium leading-relaxed group-hover:text-[var(--brand-yellow)] transition-colors">{dest.fact}</p>
                                    </div>
                                </Link>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* ===== SECTION 6: UNIVERSITY & PROGRAM FINDER ===== */}
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

            {/* ===== SECTION 7: JOURNEY TO ENROLLMENT STEPPER ===== */}
            <JourneyStepper />

            {/* ===== SECTION 8: SUCCESS STORIES COUNTER ===== */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0">
                    <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920&q=80" alt="Campus life" className="w-full h-full object-cover mix-blend-overlay opacity-20" />
                    <div className="absolute inset-0 bg-[#0A1628]" />
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeIn direction="up">
                        <div className="text-center mb-16">
                            <span className="text-[var(--brand-yellow)] font-bold text-sm uppercase tracking-widest">Our Impact</span>
                            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mt-3 tracking-tight">Numbers That Speak</h2>
                            <p className="text-gray-400 mt-4 max-w-xl mx-auto text-lg">Every number represents a dream we helped turn into reality.</p>
                        </div>
                    </FadeIn>
                    <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { value: "500+", label: "Students Placed", icon: GraduationCap, color: "from-blue-500 to-cyan-400" },
                            { value: "98%", label: "Visa Success Rate", icon: Shield, color: "from-green-500 to-emerald-400" },
                            { value: "50+", label: "Partner Universities", icon: Globe, color: "from-purple-500 to-violet-400" },
                            { value: "6+", label: "Years of Excellence", icon: TrendingUp, color: "from-[var(--brand-yellow)] to-yellow-400" },
                        ].map((item) => (
                            <StaggerItem key={item.label} className="text-center group">
                                <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-white/5`}>
                                    <item.icon className="w-10 h-10 text-white" />
                                </div>
                                <p className="text-5xl font-extrabold text-white">{item.value}</p>
                                <p className="text-sm text-blue-200 mt-3 font-medium uppercase tracking-wider">{item.label}</p>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* ===== SECTION 9: SCHOLARSHIP SPOTLIGHT ===== */}
            <ScholarshipSpotlight />

            {/* ===== SECTION 10: LEAD CAPTURE FORM ===== */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-[var(--brand-yellow)]/5 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <FadeIn direction="right">
                            <span className="text-[var(--brand-yellow)] font-bold text-sm uppercase tracking-widest">Get Started</span>
                            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0A1628] mt-3 tracking-tight leading-tight">
                                Ready to Start Your Study Abroad Journey?
                            </h2>
                            <p className="text-gray-500 mt-6 leading-relaxed text-lg">
                                Fill out the form and one of our expert counselors will get in touch within 24 hours. Our consultation is completely free.
                            </p>
                            <div className="mt-8 space-y-4">
                                {["Free personalized counseling", "No hidden fees", "Expert visa guidance", "24/7 support"].map((item) => (
                                    <div key={item} className="flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                                        </div>
                                        <span className="text-gray-700 font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </FadeIn>
                        <FadeIn direction="left" delay={0.2}>
                            <div className="bg-white border border-gray-100 shadow-2xl shadow-blue-900/5 rounded-3xl p-10 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                                <h3 className="text-2xl font-bold text-[#0A1628] mb-8 relative z-10 flex items-center gap-3">
                                    <span className="w-2 h-8 bg-gradient-to-b from-[var(--brand-yellow)] to-[var(--brand-yellow)] rounded-full"></span>
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

            {/* ===== SECTION 11: TESTIMONIALS ===== */}
            <TestimonialsCarousel testimonials={testimonials.length > 0 ? testimonials : [
                { studentName: "Rahul Sharma", studentCourse: "MSc Data Science", universityName: "Imperial College London", targetCountry: "UK", quote: "Cambry made my UK dream possible. The visa process was flawless and the support was incredible." },
                { studentName: "Ayesha Rahman", studentCourse: "BEng Mechanical", universityName: "University of Toronto", targetCountry: "Canada", quote: "I got a fast-track offer and a CAD 10,000 scholarship thanks to my counselor at Cambry." },
                { studentName: "Priya Das", studentCourse: "MBA", universityName: "University of Melbourne", targetCountry: "Australia", quote: "The team at Cambry guided me through every step. I couldn't have done it without them." },
            ]} />

            {/* ===== SECTION 12: PARTNER INSTITUTIONS ===== */}
            <section className="py-20 bg-[#F8F9FA] relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeIn direction="up">
                        <div className="text-center mb-14">
                            <span className="text-[var(--brand-yellow)] font-bold text-sm uppercase tracking-widest">Trusted Partners</span>
                            <h2 className="text-4xl font-extrabold text-[#0A1628] mt-3 tracking-tight">Our Accreditations & Partnerships</h2>
                        </div>
                    </FadeIn>
                    <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {[
                            { name: "British Council", badge: "🏛️" },
                            { name: "IELTS Official", badge: "📝" },
                            { name: "IDP Education", badge: "🌐" },
                            { name: "ICEF Certified", badge: "✅" },
                            { name: "Universities UK", badge: "🎓" },
                            { name: "Study Australia", badge: "🦘" },
                        ].map((partner) => (
                            <StaggerItem key={partner.name}>
                                <div className="flex flex-col items-center justify-center gap-4 p-8 bg-white border border-gray-100 rounded-2xl hover:shadow-xl hover:shadow-[var(--brand-blue)]/5 transition-all duration-300 hover:-translate-y-1 cursor-default h-full">
                                    <span className="text-4xl drop-shadow-sm">{partner.badge}</span>
                                    <span className="text-sm font-bold text-[#0A1628] text-center">{partner.name}</span>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* ===== SECTION 13: UNIVERSITY MARQUEE ===== */}
            <UniversityMarquee universities={universities.length > 0
                ? universities.map(u => ({ name: u.name, imageUrl: u.imageUrl }))
                : [
                    { name: "University of Oxford", imageUrl: "https://logo.clearbit.com/ox.ac.uk" }, 
                    { name: "Imperial College London", imageUrl: "https://logo.clearbit.com/imperial.ac.uk" }, 
                    { name: "University of Toronto", imageUrl: "https://logo.clearbit.com/utoronto.ca" }
                  ]
            } />

            {/* ===== SECTION 14: COUNSELORS & FAQ ===== */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-50/80 rounded-full blur-[100px] translate-y-1/2 translate-x-1/3 pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16">
                        {/* Counselors */}
                        <div>
                            <FadeIn direction="up">
                                <span className="text-[var(--brand-yellow)] font-bold text-sm uppercase tracking-widest">Our Team</span>
                                <h2 className="text-4xl font-extrabold text-[#0A1628] mt-3 mb-10 tracking-tight">Meet Our Counselors</h2>
                            </FadeIn>
                            <StaggerContainer className="grid grid-cols-2 gap-6">
                                {(counselors.length > 0 ? counselors.slice(0, 4) : [
                                    { name: "Sarah Ahmed", role: "UK Counselor", imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400" },
                                    { name: "James Wilson", role: "Canada Specialist", imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400" },
                                ]).map((c: any) => (
                                    <StaggerItem key={c.name}>
                                        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-lg shadow-black/5 hover:shadow-xl hover:-translate-y-1 transition-all group">
                                            <div className="relative h-48 overflow-hidden z-10">
                                                <img src={c.imageUrl} alt={c.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                            </div>
                                            <div className="p-5 text-center bg-white relative z-20">
                                                <p className="font-bold text-[#0A1628] text-lg">{c.name}</p>
                                                <p className="text-sm font-medium text-[var(--brand-yellow)] mt-1">{c.role}</p>
                                            </div>
                                        </div>
                                    </StaggerItem>
                                ))}
                            </StaggerContainer>
                        </div>

                        {/* FAQ */}
                        <div>
                            <FadeIn direction="up" delay={0.2}>
                                <span className="text-[var(--brand-yellow)] font-bold text-sm uppercase tracking-widest">FAQ</span>
                                <h2 className="text-4xl font-extrabold text-[#0A1628] mt-3 mb-10 tracking-tight">Common Questions</h2>
                            </FadeIn>
                            <div className="space-y-4">
                                {(faqs.length > 0 ? faqs.slice(0, 5) : [
                                    { question: "Can I apply without IELTS?", answer: "Many universities accept MOI (Medium of Instruction) or alternative tests like Duolingo depending on the country." },
                                    { question: "What is the study gap limit?", answer: "Most countries accept study gaps with proper justification. UK is generally lenient with 5-10+ year gaps." },
                                    { question: "How long does the process take?", answer: "From initial consultation to receiving your offer letter, it typically takes 4-8 weeks depending on the university and program." },
                                    { question: "Is the consultation really free?", answer: "Yes! Our initial consultation is completely free with no obligations. We only charge service fees after you decide to proceed." },
                                ]).map((faq: any, i: number) => (
                                    <FadeIn direction="up" delay={0.3 + (i * 0.1)} key={i}>
                                        <details className="group bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                            <summary className="flex items-center justify-between p-6 cursor-pointer text-[15px] font-bold text-[#0A1628] hover:text-[var(--brand-yellow)] transition-colors">
                                                {faq.question}
                                                <span className="text-gray-400 group-open:rotate-45 transition-transform text-2xl font-light">+</span>
                                            </summary>
                                            <div className="px-6 pb-6 text-[15px] text-gray-500 leading-relaxed group-open:animate-fade-in">
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

            {/* ===== SECTION 15: URGENCY CTA ===== */}
            <UrgencyCTA />
        </>
    );
}