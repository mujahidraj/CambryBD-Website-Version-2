import Link from "next/link";
import Image from "next/image";
import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#040B16] text-white relative overflow-hidden border-t border-white/5">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--brand-yellow)]/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-3 group">
                            <Image
                                src="https://i.postimg.cc/DyrWZMyx/cambry-logo.png"
                                alt="Cambry Logo"
                                width={56}
                                height={56}
                                className="h-14 w-14 object-contain group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="flex flex-col justify-center">
                                <span className="text-2xl font-bold tracking-tight text-white leading-none mb-1 mt-1">
                                    Cambry
                                </span>
                                <span className="text-[10px] text-white/70 font-bold tracking-[0.15em] uppercase leading-none">
                                    International Admission Centre
                                </span>
                            </div>
                        </Link>
                        <p className="text-white/60 text-sm leading-relaxed mt-4 pr-4">
                            Your trusted International Admission Centre. We help students achieve their dreams of studying at top universities worldwide.
                        </p>
                        <div className="flex gap-3">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-gradient-to-br hover:from-blue-500 hover:to-[var(--brand-blue)] hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1"
                                >
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-3">
                            {[
                                { href: "/about", label: "About Us" },
                                { href: "/services", label: "Our Services" },
                                { href: "/destinations", label: "Destinations" },
                                { href: "/contact", label: "Contact Us" },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white transition-colors text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Destinations */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Top Destinations</h3>
                        <ul className="space-y-3">
                            {[
                                { href: "/destinations/united-kingdom", label: "United Kingdom" },
                                { href: "/destinations/australia", label: "Australia" },
                                { href: "/destinations/canada", label: "Canada" },
                                { href: "/destinations/malaysia", label: "Malaysia" },
                                { href: "/destinations/new-zealand", label: "New Zealand" },
                            ].map((d) => (
                                <li key={d.href}>
                                    <Link href={d.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                                        {d.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
                        <div className="space-y-3">
                            <a
                                href="mailto:info@cambrybd.com"
                                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm"
                            >
                                <Mail className="w-4 h-4 flex-shrink-0" />
                                info@cambrybd.com
                            </a>
                            <a
                                href="tel:+8801700000000"
                                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm"
                            >
                                <Phone className="w-4 h-4 flex-shrink-0" />
                                +880 1700-000000
                            </a>
                            <div className="flex items-start gap-3 text-gray-400 text-sm">
                                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                Dhaka, Bangladesh
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/10 relative z-10 bg-black/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-white/50">
                        © {new Date().getFullYear()} Cambry International Admission Centre. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
