"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Globe,
    GraduationCap,
    BookOpen,
    Users,
    LogOut,
    Menu,
    MessageSquare,
    UserCircle,
    HelpCircle,
    Award,
    Languages,
    ShieldCheck,
    CalendarCheck,
    Megaphone,
} from "lucide-react";
import { useState } from "react";
import { logoutAdmin } from "@/actions/auth";

const navItems = [
    { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/admin/leads", icon: Users, label: "Leads" },
    { href: "/admin/countries", icon: Globe, label: "Countries" },
    { href: "/admin/universities", icon: GraduationCap, label: "Universities" },
    { href: "/admin/courses", icon: BookOpen, label: "Courses" },
    { href: "/admin/english-tests", icon: Languages, label: "English Tests" },
    { href: "/admin/scholarships", icon: Award, label: "Scholarships" },
    { href: "/admin/counselors", icon: UserCircle, label: "Counselors" },
    { href: "/admin/testimonials", icon: MessageSquare, label: "Testimonials" },
    { href: "/admin/faqs", icon: HelpCircle, label: "FAQs" },
    { href: "/admin/certifications", icon: ShieldCheck, label: "Certifications" },
    { href: "/admin/ielts-booking", icon: CalendarCheck, label: "IELTS Booking" },
    { href: "/admin/announcements", icon: Megaphone, label: "Announcements" },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = async () => {
        await logoutAdmin();
        router.push("/admin/login");
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#0A1628] text-white transform transition-transform duration-200 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:translate-x-0 flex flex-col`}
            >
                <div className="p-6 border-b border-white/10">
                    <Link href="/admin" className="flex items-center gap-3">
                        <Image
                            src="https://i.postimg.cc/DyrWZMyx/cambry-logo.png"
                            alt="Cambry Logo"
                            width={40}
                            height={40}
                            className="h-10 w-10 object-contain bg-white/10 rounded-lg p-1"
                        />
                        <div className="flex flex-col justify-center">
                            <span className="text-lg font-bold text-white tracking-tight leading-none mb-1 mt-1">
                                Cambry
                            </span>
                            <span className="text-[9px] text-[var(--brand-yellow)] font-bold tracking-[0.1em] uppercase leading-none">
                                Admin Panel
                            </span>
                        </div>
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-0.5 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive =
                            pathname === item.href ||
                            (item.href !== "/admin" && pathname.startsWith(item.href));
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 px-4 py-2.5 rounded-md transition-all duration-150 text-sm ${isActive
                                    ? "bg-[var(--brand-blue)] text-white shadow-lg"
                                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                                    }`}
                            >
                                <item.icon className="w-4 h-4" />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-md text-gray-300 hover:bg-red-500/20 hover:text-red-400 transition-all w-full text-sm"
                    >
                        <LogOut className="w-4 h-4" />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Top bar */}
                <header className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4 flex items-center gap-4 sticky top-0 z-30">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden p-2 rounded-md hover:bg-gray-100"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                    <div className="flex-1" />
                    <Link
                        href="/"
                        className="text-sm text-gray-500 hover:text-[var(--brand-blue)] transition-colors"
                    >
                        View Public Site →
                    </Link>
                </header>

                {/* Page content */}
                <main className="flex-1 p-4 lg:p-8">{children}</main>
            </div>
        </div>
    );
}
