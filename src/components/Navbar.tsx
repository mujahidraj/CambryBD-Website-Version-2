"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { GraduationCap, Menu, X, ChevronDown, MapPin, Info, ShieldCheck } from "lucide-react";

/** Helper to render a consistent flag emoji on Windows/Mac utilizing Twemoji SVG CDN directly */
const getFlagImageUrl = (flagStr: string | null | undefined) => {
    if (!flagStr) return null;
    if (flagStr.startsWith('http')) return flagStr;
    
    // For string emojis (e.g., '🇨🇦'), grab the Unicode code points and convert to Twemoji URL
    const codePoints = Array.from(flagStr).map(c => c.codePointAt(0)?.toString(16));
    if (codePoints.length && codePoints.every(c => c)) {
        return `https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/${codePoints.join('-')}.svg`;
    }
    return null;
};

export default function Navbar({ countries = [] }: { countries?: { name: string, slug: string, flagUrl?: string | null }[] }) {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [destDropdownOpen, setDestDropdownOpen] = useState(false);
    const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);

    const destRef = useRef<HTMLDivElement>(null);
    const aboutRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        
        const handleClickOutside = (event: MouseEvent) => {
            if (destRef.current && !destRef.current.contains(event.target as Node)) {
                setDestDropdownOpen(false);
            }
            if (aboutRef.current && !aboutRef.current.contains(event.target as Node)) {
                setAboutDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        
        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                ? "bg-[#0A1628]/85 backdrop-blur-2xl border-b border-white/10 shadow-2xl py-1"
                : "bg-transparent py-3"
                }`}
        >
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <Link href="/" className="flex items-center gap-2 group">
                        <Image
                            src="https://i.postimg.cc/DyrWZMyx/cambry-logo.png"
                            alt="Cambry Logo"
                            width={40}
                            height={40}
                            className="h-10 w-10 object-contain group-hover:scale-105 transition-transform duration-300"
                            priority
                        />
                        <div className="flex flex-col justify-center">
                            <span className="text-xl font-bold text-white tracking-tight leading-none mb-0.5 mt-1">
                                Cambry
                            </span>
                            <span className="text-[9px] text-white/70 font-bold tracking-[0.15em] uppercase leading-none">
                                International Admission Centre
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-2">
                        <Link href="/" className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${pathname === "/" ? "text-white bg-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] border border-white/5" : "text-white/70 hover:text-white hover:bg-white/5"}`}>
                            Home
                        </Link>

                        {/* About Dropdown */}
                        <div className="relative group" ref={aboutRef}>
                            <button 
                                onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                                onMouseEnter={() => setAboutDropdownOpen(true)}
                                className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${(pathname === "/about" || pathname === "/certifications") ? "text-white bg-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] border border-white/5" : "text-white/70 hover:text-white hover:bg-white/5"}`}
                            >
                                About <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${aboutDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                            <div 
                                onMouseLeave={() => setAboutDropdownOpen(false)}
                                className={`absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl shadow-black/5 ring-1 ring-black/5 transition-all duration-200 origin-top-left ${aboutDropdownOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}
                            >
                                <div className="p-2 space-y-1">
                                    <Link href="/about" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group/item">
                                        <div className="w-8 h-8 rounded-md bg-blue-100/50 flex items-center justify-center group-hover/item:bg-blue-200 transition-colors">
                                            <Info className="w-4 h-4 text-[var(--brand-blue)]" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">About Us</p>
                                            <p className="text-xs text-gray-500">Our mission and values</p>
                                        </div>
                                    </Link>
                                    <Link href="/certifications" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group/item">
                                        <div className="w-8 h-8 rounded-md bg-emerald-100/50 flex items-center justify-center group-hover/item:bg-emerald-200 transition-colors">
                                            <ShieldCheck className="w-4 h-4 text-emerald-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Certifications</p>
                                            <p className="text-xs text-gray-500">Our agency accreditations</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <Link href="/services" className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${pathname === "/services" ? "text-white bg-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] border border-white/5" : "text-white/70 hover:text-white hover:bg-white/5"}`}>
                            Services
                        </Link>

                        {/* Destinations Dropdown */}
                        <div className="relative group" ref={destRef}>
                            <button 
                                onClick={() => setDestDropdownOpen(!destDropdownOpen)}
                                onMouseEnter={() => setDestDropdownOpen(true)}
                                className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${pathname.startsWith("/destinations") ? "text-white bg-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] border border-white/5" : "text-white/70 hover:text-white hover:bg-white/5"}`}
                            >
                                Destinations <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${destDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                            <div 
                                onMouseLeave={() => setDestDropdownOpen(false)}
                                className={`absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl shadow-black/5 ring-1 ring-black/5 transition-all duration-200 origin-top-left ${destDropdownOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}
                            >
                                <div className="p-2 space-y-1">
                                    <Link href="/destinations" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group/item">
                                        <div className="w-8 h-8 rounded-md bg-var(--brand-yellow)-100/50 flex items-center justify-center group-hover/item:bg-var(--brand-yellow)-200 transition-colors">
                                            <MapPin className="w-4 h-4 text-[var(--brand-yellow)]" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">All Destinations</p>
                                            <p className="text-xs text-gray-500">View all study countries</p>
                                        </div>
                                    </Link>
                                    {(countries || []).map((country) => (
                                        <Link key={country.slug} href={`/destinations/${country.slug}`} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-[var(--brand-blue)] rounded-md transition-colors">
                                            {getFlagImageUrl(country.flagUrl) && (
                                                <img src={getFlagImageUrl(country.flagUrl)!} alt={`${country.name} flag`} className="w-5 h-4 object-cover rounded shadow-sm" />
                                            )}
                                            Study in {country.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <Link href="/ielts-booking" className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${pathname === "/ielts-booking" ? "text-white bg-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] border border-white/5" : "text-white/70 hover:text-white hover:bg-white/5"}`}>
                            IELTS
                        </Link>
                        
                        <Link href="/contact" className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${pathname === "/contact" ? "text-white bg-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] border border-white/5" : "text-white/70 hover:text-white hover:bg-white/5"}`}>
                            Contact
                        </Link>
                        <Link
                            href="/contact"
                            className="ml-4 px-6 py-2.5 bg-gradient-to-r from-[var(--brand-yellow)] to-[var(--brand-yellow)] text-white text-sm font-semibold rounded-full hover:shadow-[0_0_20px_rgba(232,114,12,0.4)] hover:scale-105 transition-all duration-300 shadow-lg border border-white/10"
                        >
                            Apply Now
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setOpen(!open)}
                            className="text-white hover:text-white/80 p-2 transition-colors"
                        >
                            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Nav */}
                {open && (
                    <div className="md:hidden pb-6 border-t border-white/10 bg-[#0A1628]/95 backdrop-blur-3xl shadow-2xl mt-3 rounded-b-2xl absolute left-0 right-0 origin-top animate-fade-in">
                        <div className="pt-4 px-4 space-y-2">
                            <Link href="/" onClick={() => setOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 transition-colors">Home</Link>
                            
                            {/* Mobile About Dropdown */}
                            <div className="space-y-1">
                                <button onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)} className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 transition-colors">
                                    About <ChevronDown className={`w-4 h-4 transition-transform ${aboutDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {aboutDropdownOpen && (
                                    <div className="pl-6 pr-4 space-y-1 pb-2">
                                        <Link href="/about" onClick={() => setOpen(false)} className="block px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors">About Us</Link>
                                        <Link href="/certifications" onClick={() => setOpen(false)} className="block px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Certifications</Link>
                                    </div>
                                )}
                            </div>

                            <Link href="/services" onClick={() => setOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 transition-colors">Services</Link>
                            
                            {/* Mobile Destinations Dropdown */}
                            <div className="space-y-1">
                                <button onClick={() => setDestDropdownOpen(!destDropdownOpen)} className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 transition-colors">
                                    Destinations <ChevronDown className={`w-4 h-4 transition-transform ${destDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {destDropdownOpen && (
                                    <div className="pl-6 pr-4 space-y-1 pb-2">
                                        <Link href="/destinations" onClick={() => setOpen(false)} className="block font-medium px-4 py-2.5 text-sm text-[var(--brand-yellow)] hover:bg-white/5 rounded-lg transition-colors">All Destinations</Link>
                                        {(countries || []).map((country) => (
                                            <Link key={country.slug} href={`/destinations/${country.slug}`} onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                                                {getFlagImageUrl(country.flagUrl) && (
                                                    <img src={getFlagImageUrl(country.flagUrl)!} alt={`${country.name} flag`} className="w-5 h-4 object-cover rounded shadow-sm" />
                                                )}
                                                Study in {country.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <Link href="/ielts-booking" onClick={() => setOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 transition-colors">IELTS Booking</Link>
                            <Link href="/contact" onClick={() => setOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 transition-colors">Contact</Link>
                            
                            <Link
                                href="/contact"
                                onClick={() => setOpen(false)}
                                className="block mt-6 text-center px-4 py-3.5 bg-gradient-to-r from-[var(--brand-yellow)] to-[var(--brand-yellow)] text-white text-sm font-bold rounded-xl hover:shadow-[0_0_20px_rgba(232,114,12,0.4)] transition-all"
                            >
                                Apply Now
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
