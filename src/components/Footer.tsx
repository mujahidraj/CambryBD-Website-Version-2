import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#0F172A] text-white relative overflow-hidden">
            {/* Ambient gradient orbs */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/[0.07] rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/[0.05] rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/[0.03] rounded-full blur-[100px] pointer-events-none" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    {/* Brand */}
                    <div className="space-y-6 lg:col-span-1">
                        <Link href="/" className="flex items-center gap-3 group inline-flex">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-purple-500 rounded-lg opacity-0 group-hover:opacity-20 blur-md transition-opacity" />
                                <Image
                                    src="https://i.postimg.cc/DyrWZMyx/cambry-logo.png"
                                    alt="Cambry Logo"
                                    width={48}
                                    height={48}
                                    className="h-12 w-12 object-contain relative z-10 group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="flex flex-col justify-center">
                                <span className="text-2xl font-bold tracking-tight text-white leading-none mb-1">Cambry</span>
                                <span className="text-[9px] text-white/40 font-bold tracking-[0.2em] uppercase leading-none">International Admission Centre</span>
                            </div>
                        </Link>
                        <p className="text-white/40 text-sm leading-relaxed pr-4">
                            Your trusted International Admission Centre. We help students achieve their dreams of studying at top universities worldwide.
                        </p>
                        <div className="flex gap-2">
                            {[
                                { Icon: Facebook, gradient: "hover:from-blue-500 hover:to-blue-600" },
                                { Icon: Twitter, gradient: "hover:from-sky-400 hover:to-sky-500" },
                                { Icon: Instagram, gradient: "hover:from-pink-500 hover:to-purple-500" },
                                { Icon: Linkedin, gradient: "hover:from-blue-600 hover:to-blue-700" },
                            ].map(({ Icon, gradient }, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className={`w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/50 hover:text-white hover:bg-gradient-to-br ${gradient} hover:border-transparent hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105`}
                                >
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-sm uppercase tracking-widest text-white/60 mb-6">Quick Links</h3>
                        <ul className="space-y-3">
                            {[
                                { href: "/about", label: "About Us" },
                                { href: "/services", label: "Our Services" },
                                { href: "/destinations", label: "Destinations" },
                                { href: "/contact", label: "Contact Us" },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-white/40 hover:text-amber-400 transition-colors text-sm font-medium hover:translate-x-1 inline-block transition-transform duration-200">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Destinations */}
                    <div>
                        <h3 className="font-bold text-sm uppercase tracking-widest text-white/60 mb-6">Top Destinations</h3>
                        <ul className="space-y-3">
                            {[
                                { href: "/destinations/united-kingdom", label: "United Kingdom" },
                                { href: "/destinations/australia", label: "Australia" },
                                { href: "/destinations/canada", label: "Canada" },
                                { href: "/destinations/malaysia", label: "Malaysia" },
                                { href: "/destinations/new-zealand", label: "New Zealand" },
                            ].map((d) => (
                                <li key={d.href}>
                                    <Link href={d.href} className="text-white/40 hover:text-amber-400 transition-colors text-sm font-medium hover:translate-x-1 inline-block transition-transform duration-200">
                                        {d.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-bold text-sm uppercase tracking-widest text-white/60 mb-6">Contact Info</h3>
                        <div className="space-y-4">
                            <a href="mailto:info@cambrybd.com" className="flex items-center gap-3 text-white/40 hover:text-white transition-colors text-sm group">
                                <div className="w-9 h-9 rounded-lg bg-white/[0.05] flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                                    <Mail className="w-4 h-4 text-amber-400/60 group-hover:text-amber-400" />
                                </div>
                                info@cambrybd.com
                            </a>
                            <a href="tel:+8801700000000" className="flex items-center gap-3 text-white/40 hover:text-white transition-colors text-sm group">
                                <div className="w-9 h-9 rounded-lg bg-white/[0.05] flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                                    <Phone className="w-4 h-4 text-blue-400/60 group-hover:text-blue-400" />
                                </div>
                                +880 1700-000000
                            </a>
                            <div className="flex items-start gap-3 text-white/40 text-sm group">
                                <div className="w-9 h-9 rounded-lg bg-white/[0.05] flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <MapPin className="w-4 h-4 text-purple-400/60" />
                                </div>
                                Dhaka, Bangladesh
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/[0.06] relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-white/30 font-medium">
                        &copy; {new Date().getFullYear()} Cambry International Admission Centre. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <a href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors font-medium">Privacy Policy</a>
                        <a href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors font-medium">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
