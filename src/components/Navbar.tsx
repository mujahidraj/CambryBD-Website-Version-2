"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, MapPin, Info, ShieldCheck } from "lucide-react";

const getFlagImageUrl = (flagStr: string | null | undefined) => {
    if (!flagStr) return null;
    if (flagStr.startsWith('http')) return flagStr;
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
            if (destRef.current && !destRef.current.contains(event.target as Node)) setDestDropdownOpen(false);
            if (aboutRef.current && !aboutRef.current.contains(event.target as Node)) setAboutDropdownOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const isActive = (path: string) => pathname === path;
    const navLinkClass = (path: string) =>
        `relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
            isActive(path)
                ? "text-white bg-white/15 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]"
                : "text-white/70 hover:text-white hover:bg-white/[0.08]"
        }`;

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
                scrolled
                    ? "bg-[#0F172A]/80 backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.3)] py-0"
                    : "bg-transparent py-2"
            }`}
        >
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-purple-500 rounded-xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500" />
                            <Image
                                src="https://i.postimg.cc/DyrWZMyx/cambry-logo.png"
                                alt="Cambry Logo"
                                width={42}
                                height={42}
                                className="h-10 w-10 object-contain relative z-10 group-hover:scale-110 transition-transform duration-500"
                                priority
                            />
                        </div>
                        <div className="flex flex-col justify-center">
                            <span className="text-xl font-bold text-white tracking-tight leading-none mb-0.5">Cambry</span>
                            <span className="text-[8px] text-white/50 font-bold tracking-[0.2em] uppercase leading-none">International Admission Centre</span>
                        </div>
                    </Link>

                    <div className="hidden md:flex items-center gap-1">
                        <Link href="/" className={navLinkClass("/")}>Home</Link>

                        <div className="relative" ref={aboutRef}>
                            <button
                                onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                                onMouseEnter={() => setAboutDropdownOpen(true)}
                                className={`flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                                    (isActive("/about") || isActive("/certifications")) ? "text-white bg-white/15" : "text-white/70 hover:text-white hover:bg-white/[0.08]"
                                }`}
                            >
                                About <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${aboutDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                            <div
                                onMouseLeave={() => setAboutDropdownOpen(false)}
                                className={`absolute top-full left-0 mt-3 w-72 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] ring-1 ring-black/5 transition-all duration-300 origin-top-left ${aboutDropdownOpen ? 'opacity-100 scale-100 visible translate-y-0' : 'opacity-0 scale-95 invisible -translate-y-2'}`}
                            >
                                <div className="p-2.5 space-y-1">
                                    <Link href="/about" className="flex items-center gap-3 p-3.5 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all group/item">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center group-hover/item:scale-110 transition-all shadow-sm">
                                            <Info className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">About Us</p>
                                            <p className="text-xs text-gray-500">Our mission and values</p>
                                        </div>
                                    </Link>
                                    <Link href="/certifications" className="flex items-center gap-3 p-3.5 rounded-xl hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all group/item">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center group-hover/item:scale-110 transition-all shadow-sm">
                                            <ShieldCheck className="w-5 h-5 text-emerald-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">Certifications</p>
                                            <p className="text-xs text-gray-500">Our agency accreditations</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <Link href="/services" className={navLinkClass("/services")}>Services</Link>

                        <div className="relative" ref={destRef}>
                            <button
                                onClick={() => setDestDropdownOpen(!destDropdownOpen)}
                                onMouseEnter={() => setDestDropdownOpen(true)}
                                className={`flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                                    pathname.startsWith("/destinations") ? "text-white bg-white/15" : "text-white/70 hover:text-white hover:bg-white/[0.08]"
                                }`}
                            >
                                Destinations <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${destDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                            <div
                                onMouseLeave={() => setDestDropdownOpen(false)}
                                className={`absolute top-full left-0 mt-3 w-[30rem] max-h-[70vh] overflow-y-auto bg-white/95 backdrop-blur-2xl rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] ring-1 ring-black/5 transition-all duration-300 origin-top-left ${destDropdownOpen ? 'opacity-100 scale-100 visible translate-y-0' : 'opacity-0 scale-95 invisible -translate-y-2'}`}
                            >
                                <div className="p-2.5 space-y-0.5">
                                    <Link href="/destinations" className="flex items-center gap-3 p-3.5 rounded-xl hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 transition-all group/item">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center group-hover/item:scale-110 transition-all shadow-sm">
                                            <MapPin className="w-5 h-5 text-amber-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">All Destinations</p>
                                            <p className="text-xs text-gray-500">View all study countries</p>
                                        </div>
                                    </Link>
                                    <div className="h-px bg-gray-100 mx-3 my-1" />
                                    <div className="grid grid-cols-2 gap-1">
                                        {(countries || []).map((country) => (
                                            <Link key={country.slug} href={`/destinations/${country.slug}`} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-blue-700 rounded-lg transition-all">
                                                {getFlagImageUrl(country.flagUrl) && (
                                                    <img src={getFlagImageUrl(country.flagUrl)!} alt={`${country.name} flag`} className="w-5 h-4 object-cover rounded shadow-sm" />
                                                )}
                                                <span className="truncate">Study in {country.name}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Link href="/ielts-booking" className={navLinkClass("/ielts-booking")}>IELTS & PTE</Link>
                        <Link href="/contact" className={navLinkClass("/contact")}>Contact</Link>

                        <Link
                            href="/contact"
                            className="ml-3 px-6 py-2.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-white text-sm font-bold rounded-xl hover:shadow-[0_0_30px_rgba(245,158,11,0.35)] hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-amber-500/20 animate-gradient bg-[length:200%_200%]"
                        >
                            Apply Now
                        </Link>
                    </div>

                    <button onClick={() => setOpen(!open)} className="md:hidden text-white hover:text-white/80 p-2.5 rounded-xl hover:bg-white/10 transition-all">
                        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {open && (
                    <div className="md:hidden pb-8 bg-[#0F172A]/98 backdrop-blur-3xl shadow-2xl mt-2 rounded-2xl absolute left-3 right-3 origin-top animate-fade-in border border-white/[0.06]">
                        <div className="pt-4 px-4 space-y-1">
                            <Link href="/" onClick={() => setOpen(false)} className="block px-4 py-3.5 rounded-xl text-sm font-semibold text-white/80 hover:text-white hover:bg-white/[0.08] transition-colors">Home</Link>
                            <div className="space-y-1">
                                <button onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)} className="flex items-center justify-between w-full px-4 py-3.5 rounded-xl text-sm font-semibold text-white/80 hover:text-white hover:bg-white/[0.08] transition-colors">
                                    About <ChevronDown className={`w-4 h-4 transition-transform ${aboutDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {aboutDropdownOpen && (
                                    <div className="pl-6 pr-4 space-y-1 pb-2">
                                        <Link href="/about" onClick={() => setOpen(false)} className="block px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors">About Us</Link>
                                        <Link href="/certifications" onClick={() => setOpen(false)} className="block px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Certifications</Link>
                                    </div>
                                )}
                            </div>
                            <Link href="/services" onClick={() => setOpen(false)} className="block px-4 py-3.5 rounded-xl text-sm font-semibold text-white/80 hover:text-white hover:bg-white/[0.08] transition-colors">Services</Link>
                            <div className="space-y-1">
                                <button onClick={() => setDestDropdownOpen(!destDropdownOpen)} className="flex items-center justify-between w-full px-4 py-3.5 rounded-xl text-sm font-semibold text-white/80 hover:text-white hover:bg-white/[0.08] transition-colors">
                                    Destinations <ChevronDown className={`w-4 h-4 transition-transform ${destDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {destDropdownOpen && (
                                    <div className="pl-6 pr-4 space-y-1 pb-2">
                                        <Link href="/destinations" onClick={() => setOpen(false)} className="block font-semibold px-4 py-2.5 text-sm text-amber-400 hover:bg-white/5 rounded-lg transition-colors">All Destinations</Link>
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
                            <Link href="/ielts-booking" onClick={() => setOpen(false)} className="block px-4 py-3.5 rounded-xl text-sm font-semibold text-white/80 hover:text-white hover:bg-white/[0.08] transition-colors">IELTS & PTE</Link>
                            <Link href="/contact" onClick={() => setOpen(false)} className="block px-4 py-3.5 rounded-xl text-sm font-semibold text-white/80 hover:text-white hover:bg-white/[0.08] transition-colors">Contact</Link>
                            <Link href="/contact" onClick={() => setOpen(false)} className="block mt-4 text-center px-4 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-amber-500/20 transition-all">
                                Apply Now
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
