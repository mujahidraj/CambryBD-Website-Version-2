import { prisma } from "@/lib/prisma";
import { Globe, GraduationCap, BookOpen, Users, TrendingUp, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
    const [countryCount, universityCount, courseCount, leadStats] =
        await Promise.all([
            prisma.country.count(),
            prisma.university.count(),
            prisma.course.count(),
            prisma.lead.groupBy({
                by: ["status"],
                _count: true,
            }),
        ]);

    const totalLeads = leadStats.reduce((acc: number, s: { _count: number }) => acc + s._count, 0);
    const newLeads = leadStats.find((s: { status: string; _count: number }) => s.status === "NEW")?._count || 0;
    const contactedLeads = leadStats.find((s: { status: string; _count: number }) => s.status === "CONTACTED")?._count || 0;

    const recentLeads = await prisma.lead.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
    });

    const stats = [
        {
            label: "Countries",
            value: countryCount,
            icon: Globe,
            href: "/admin/countries",
            color: "from-blue-500 to-blue-700",
            shadow: "shadow-blue-600/30",
        },
        {
            label: "Universities",
            value: universityCount,
            icon: GraduationCap,
            href: "/admin/universities",
            color: "from-emerald-500 to-emerald-700",
            shadow: "shadow-emerald-600/30",
        },
        {
            label: "Courses",
            value: courseCount,
            icon: BookOpen,
            href: "/admin/courses",
            color: "from-purple-500 to-purple-700",
            shadow: "shadow-purple-600/30",
        },
        {
            label: "Total Leads",
            value: totalLeads,
            icon: Users,
            href: "/admin/leads",
            color: "from-amber-500 to-amber-700",
            shadow: "shadow-amber-600/30",
        },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-500 mt-1">Welcome to your admin panel</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <Link
                        key={stat.label}
                        href={stat.href}
                        className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group border border-gray-100"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div
                                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} ${stat.shadow} shadow-lg flex items-center justify-center`}
                            >
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                            <ArrowUpRight className="w-5 h-5 text-gray-300 group-hover:text-gray-500 transition-colors" />
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                        <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                    </Link>
                ))}
            </div>

            {/* Lead Status + Recent Leads */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-blue-600" />
                        Lead Overview
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                            <span className="text-sm font-medium text-green-700">New Leads</span>
                            <span className="text-2xl font-bold text-green-700">{newLeads}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                            <span className="text-sm font-medium text-blue-700">Contacted</span>
                            <span className="text-2xl font-bold text-blue-700">{contactedLeads}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                            <span className="text-sm font-medium text-gray-700">Closed</span>
                            <span className="text-2xl font-bold text-gray-700">
                                {totalLeads - newLeads - contactedLeads}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Users className="w-5 h-5 text-blue-600" />
                        Recent Leads
                    </h2>
                    {recentLeads.length === 0 ? (
                        <p className="text-gray-400 text-center py-8">No leads yet</p>
                    ) : (
                        <div className="space-y-3">
                            {recentLeads.map((lead: any) => (
                                <div
                                    key={lead.id}
                                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors"
                                >
                                    <div>
                                        <p className="font-medium text-gray-900">{lead.name}</p>
                                        <p className="text-sm text-gray-500">{lead.desiredCountry}</p>
                                    </div>
                                    <span
                                        className={`text-xs px-3 py-1 rounded-full font-medium ${lead.status === "NEW"
                                            ? "bg-green-100 text-green-700"
                                            : lead.status === "CONTACTED"
                                                ? "bg-blue-100 text-blue-700"
                                                : "bg-gray-100 text-gray-700"
                                            }`}
                                    >
                                        {lead.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
