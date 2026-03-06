"use client";

import { useState } from "react";
import { Trash2, Mail, Phone, MapPin, Clock } from "lucide-react";
import toast from "react-hot-toast";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";
import ImportExportButtons from "@/components/admin/ImportExportButtons";
import { updateLeadStatus, deleteLead } from "@/actions/leads";

type Lead = {
    id: string;
    name: string;
    email: string;
    phone: string;
    desiredCountry: string;
    message: string;
    status: string;
    createdAt: string;
};

export default function LeadsClient({ leads }: { leads: Lead[] }) {
    const [filter, setFilter] = useState("ALL");
    const [loading, setLoading] = useState<string | null>(null);
    const [deleteItem, setDeleteItem] = useState<{id: string, name: string} | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const filtered = filter === "ALL" ? leads : leads.filter((l) => l.status === filter);

    const handleStatusChange = async (id: string, status: "NEW" | "CONTACTED" | "CLOSED") => {
        setLoading(id);
        try {
            await updateLeadStatus(id, status);
            toast.success("Status updated");
            window.location.reload();
        } catch {
            toast.error("Failed to update status");
        } finally {
            setLoading(null);
        }
    };

    const confirmDelete = async () => {
        if (!deleteItem) return;
        setIsDeleting(true);
        try {
            await deleteLead(deleteItem.id);
            toast.success("Lead deleted");
            window.location.reload();
        } catch {
            toast.error("Failed to delete");
        } finally {
            setIsDeleting(false);
            setDeleteItem(null);
        }
    };

    const statusColors: Record<string, string> = {
        NEW: "bg-green-100 text-green-700",
        CONTACTED: "bg-blue-100 text-blue-700",
        CLOSED: "bg-gray-100 text-gray-700",
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Leads Management</h1>
                    <p className="text-gray-500 mt-1">Track and manage student applications</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <ImportExportButtons model="lead" data={leads} />
                </div>
            </div>

            {/* Filter tabs */}
            <div className="flex gap-2">
                {["ALL", "NEW", "CONTACTED", "CLOSED"].map((s) => (
                    <button
                        key={s}
                        onClick={() => setFilter(s)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${filter === s
                                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                                : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                            }`}
                    >
                        {s} {s !== "ALL" && `(${leads.filter((l) => l.status === s).length})`}
                        {s === "ALL" && ` (${leads.length})`}
                    </button>
                ))}
            </div>

            {/* Lead cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filtered.map((lead) => (
                    <div
                        key={lead.id}
                        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="font-semibold text-gray-900 text-lg">{lead.name}</h3>
                                <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                                    <MapPin className="w-3.5 h-3.5" />
                                    <span>Interested in: {lead.desiredCountry}</span>
                                </div>
                            </div>
                            <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusColors[lead.status]}`}>
                                {lead.status}
                            </span>
                        </div>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{lead.message}</p>

                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                            <span className="flex items-center gap-1">
                                <Mail className="w-3.5 h-3.5" /> {lead.email}
                            </span>
                            <span className="flex items-center gap-1">
                                <Phone className="w-3.5 h-3.5" /> {lead.phone}
                            </span>
                        </div>

                        <div className="flex items-center gap-1 text-xs text-gray-400 mb-4">
                            <Clock className="w-3 h-3" />
                            {new Date(lead.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </div>

                        <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                            <select
                                value={lead.status}
                                onChange={(e) =>
                                    handleStatusChange(lead.id, e.target.value as "NEW" | "CONTACTED" | "CLOSED")
                                }
                                disabled={loading === lead.id}
                                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="NEW">New</option>
                                <option value="CONTACTED">Contacted</option>
                                <option value="CLOSED">Closed</option>
                            </select>
                            <button
                                onClick={() => setDeleteItem({id: lead.id, name: lead.name})}
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
                {filtered.length === 0 && (
                    <div className="col-span-2 text-center py-12 text-gray-400 bg-white rounded-2xl border border-gray-100">
                        No leads found for this filter.
                    </div>
                )}
            </div>

            <DeleteConfirmModal isOpen={!!deleteItem} itemName={deleteItem?.name || ""} onConfirm={confirmDelete} onCancel={() => setDeleteItem(null)} isLoading={isDeleting} />
        </div>
    );
}
