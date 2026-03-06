"use client";

import { useState } from "react";
import { Megaphone, Plus, Pencil, Trash2, X } from "lucide-react";
import { createAnnouncement, updateAnnouncement, deleteAnnouncement } from "@/actions/announcements";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";

interface Announcement {
    id: string;
    title: string;
    content: string;
    type: string;
    isActive: boolean;
    createdAt: Date;
}

export default function AnnouncementsClient({ announcements: initial }: { announcements: Announcement[] }) {
    const [items, setItems] = useState(initial);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<Announcement | null>(null);
    const [form, setForm] = useState({ title: "", content: "", type: "general" });
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [deleteItem, setDeleteItem] = useState<{id: string, name: string} | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const filtered = items.filter(a => a.title.toLowerCase().includes(search.toLowerCase()) || a.content.toLowerCase().includes(search.toLowerCase()));

    const openAdd = () => { setEditing(null); setForm({ title: "", content: "", type: "general" }); setShowModal(true); };
    const openEdit = (a: Announcement) => { setEditing(a); setForm({ title: a.title, content: a.content, type: a.type }); setShowModal(true); };

    const handleSave = async () => {
        if (!form.title.trim() || !form.content.trim()) return;
        setLoading(true);
        try {
            if (editing) {
                const updated = await updateAnnouncement(editing.id, form);
                setItems(prev => prev.map(a => a.id === editing.id ? { ...a, ...updated } : a));
            } else {
                const created = await createAnnouncement(form);
                setItems(prev => [created, ...prev]);
            }
            setShowModal(false);
        } catch (e: any) { alert("Error: " + e.message); }
        setLoading(false);
    };

    const confirmDelete = async () => {
        if (!deleteItem) return;
        setIsDeleting(true);
        try {
            await deleteAnnouncement(deleteItem.id);
            setItems(prev => prev.filter(a => a.id !== deleteItem.id));
        } catch (e: any) { alert("Failed to delete: " + e.message); }
        finally {
            setIsDeleting(false);
            setDeleteItem(null);
        }
    };

    const toggleActive = async (a: Announcement) => {
        try {
            const updated = await updateAnnouncement(a.id, { isActive: !a.isActive });
            setItems(prev => prev.map(x => x.id === a.id ? { ...x, ...updated } : x));
        } catch (e: any) { alert("Error: " + e.message); }
    };

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <Megaphone className="w-8 h-8 text-[var(--brand-blue)]" />
                    <h1 className="text-2xl font-bold text-gray-900">Announcements</h1>
                </div>
                <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2.5 bg-[#0A1628] text-white rounded-lg text-sm font-medium hover:bg-[var(--brand-blue)] transition-colors">
                    <Plus className="w-4 h-4" /> Add
                </button>
            </div>

            <div className="mb-6">
                <input type="text" placeholder="Search announcements..." value={search} onChange={e => setSearch(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[var(--brand-blue)] focus:border-transparent" />
            </div>

            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                    <thead><tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-6 py-3 text-left font-semibold text-gray-600">Title</th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-600">Content</th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-600">Type</th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-600">Status</th>
                        <th className="px-6 py-3 text-right font-semibold text-gray-600">Actions</th>
                    </tr></thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr><td colSpan={5} className="text-center py-12 text-gray-400">No announcements found</td></tr>
                        ) : filtered.map(a => (
                            <tr key={a.id} className="border-t border-gray-100 hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">{a.title}</td>
                                <td className="px-6 py-4 text-gray-500 max-w-xs truncate">{a.content}</td>
                                <td className="px-6 py-4">
                                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${a.type === "event" ? "bg-purple-50 text-purple-700" : a.type === "offer" ? "bg-green-50 text-green-700" : a.type === "scholarship" ? "bg-blue-50 text-blue-700" : "bg-gray-100 text-gray-600"}`}>{a.type}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <button onClick={() => toggleActive(a)} className={`text-xs px-2.5 py-1 rounded-full font-medium cursor-pointer ${a.isActive ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
                                        {a.isActive ? "Active" : "Inactive"}
                                    </button>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button onClick={() => openEdit(a)} className="p-1.5 hover:bg-blue-50 rounded-md"><Pencil className="w-4 h-4 text-blue-500" /></button>
                                    <button onClick={() => setDeleteItem({id: a.id, name: a.title})} className="p-1.5 hover:bg-red-50 rounded-md ml-1"><Trash2 className="w-4 h-4 text-red-500" /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg w-full max-w-md p-6 mx-4">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold">{editing ? "Edit Announcement" : "Add Announcement"}</h2>
                            <button onClick={() => setShowModal(false)}><X className="w-5 h-5 text-gray-400" /></button>
                        </div>
                        <div className="space-y-4">
                            <div><label className="text-sm font-medium">Title *</label><input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full mt-1 px-3 py-2 border rounded-md text-sm" placeholder="e.g., Spring 2026 Scholarship Open" /></div>
                            <div><label className="text-sm font-medium">Content *</label><textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} rows={3} className="w-full mt-1 px-3 py-2 border rounded-md text-sm" placeholder="Announcement details..." /></div>
                            <div><label className="text-sm font-medium">Type</label>
                                <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="w-full mt-1 px-3 py-2 border rounded-md text-sm">
                                    <option value="general">General</option>
                                    <option value="event">Event</option>
                                    <option value="offer">Offer</option>
                                    <option value="scholarship">Scholarship</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-6">
                            <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md">Cancel</button>
                            <button onClick={handleSave} disabled={loading} className="px-4 py-2 text-sm bg-[#0A1628] text-white rounded-md hover:bg-[var(--brand-blue)] disabled:opacity-50">
                                {loading ? "Saving..." : editing ? "Update" : "Create"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <DeleteConfirmModal isOpen={!!deleteItem} itemName={deleteItem?.name || ""} onConfirm={confirmDelete} onCancel={() => setDeleteItem(null)} isLoading={isDeleting} />
        </div>
    );
}
