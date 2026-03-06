"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCounselor, updateCounselor, deleteCounselor } from "@/actions/counselors";
import { Search, Plus, Pencil, Trash2, X } from "lucide-react";
import toast from "react-hot-toast";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";

export default function CounselorsClient({ counselors }: { counselors: any[] }) {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<any>(null);
    const [form, setForm] = useState({ name: "", role: "", bio: "", imageUrl: "", email: "" });
    const [deleteItem, setDeleteItem] = useState<{id: string, name: string} | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const filtered = counselors.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

    const handleSave = async () => {
        try {
            if (editing) { await updateCounselor(editing.id, form); toast.success("Updated"); }
            else { await createCounselor(form); toast.success("Created"); }
            setShowModal(false); setEditing(null); router.refresh();
        } catch { toast.error("Error"); }
    };
    const confirmDelete = async () => {
        if (!deleteItem) return;
        setIsDeleting(true);
        try { await deleteCounselor(deleteItem.id); toast.success("Deleted"); router.refresh(); } catch { toast.error("Error"); }
        finally { setIsDeleting(false); setDeleteItem(null); }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Counselors</h1>
                <button onClick={() => { setEditing(null); setForm({ name: "", role: "", bio: "", imageUrl: "", email: "" }); setShowModal(true); }} className="px-4 py-2 bg-[var(--brand-blue)] text-white rounded-md text-sm font-medium flex items-center gap-2 hover:bg-[#0D2847]"><Plus className="w-4 h-4" /> Add</button>
            </div>
            <div className="relative mb-4"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-md text-sm" /></div>
            <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
                <table className="w-full text-sm">
                    <thead><tr className="bg-gray-50 border-b"><th className="p-3 text-left font-semibold">Name</th><th className="p-3 text-left font-semibold">Role</th><th className="p-3 text-left font-semibold">Email</th><th className="p-3 text-right font-semibold">Actions</th></tr></thead>
                    <tbody>{filtered.map(c => (
                        <tr key={c.id} className="border-b hover:bg-gray-50">
                            <td className="p-3 font-medium">{c.name}</td><td className="p-3 text-gray-500">{c.role}</td><td className="p-3 text-gray-500">{c.email || "—"}</td>
                            <td className="p-3 text-right">
                                <button onClick={() => { setEditing(c); setForm({ name: c.name, role: c.role, bio: c.bio, imageUrl: c.imageUrl, email: c.email || "" }); setShowModal(true); }} className="p-1.5 hover:bg-gray-100 rounded-md"><Pencil className="w-4 h-4 text-gray-500" /></button>
                                <button onClick={() => setDeleteItem({id: c.id, name: c.name})} className="p-1.5 hover:bg-red-50 rounded-md ml-1"><Trash2 className="w-4 h-4 text-red-500" /></button>
                            </td>
                        </tr>
                    ))}</tbody>
                </table>
                {filtered.length === 0 && <div className="p-8 text-center text-gray-400">No counselors</div>}
            </div>
            {showModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"><div className="bg-white rounded-md p-6 w-full max-w-lg">
                    <div className="flex items-center justify-between mb-4"><h2 className="text-lg font-bold">{editing ? "Edit" : "Add"} Counselor</h2><button onClick={() => setShowModal(false)}><X className="w-5 h-5" /></button></div>
                    <div className="space-y-3">
                        <div><label className="text-sm font-medium">Name</label><input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full mt-1 px-3 py-2 border rounded-md text-sm" /></div>
                        <div><label className="text-sm font-medium">Role</label><input type="text" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} className="w-full mt-1 px-3 py-2 border rounded-md text-sm" /></div>
                        <div><label className="text-sm font-medium">Bio</label><textarea value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} rows={3} className="w-full mt-1 px-3 py-2 border rounded-md text-sm" /></div>
                        <div><label className="text-sm font-medium">Image URL</label><input type="text" value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} className="w-full mt-1 px-3 py-2 border rounded-md text-sm" /></div>
                        <div><label className="text-sm font-medium">Email</label><input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full mt-1 px-3 py-2 border rounded-md text-sm" /></div>
                    </div>
                    <div className="flex justify-end gap-3 mt-6"><button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md">Cancel</button><button onClick={handleSave} className="px-4 py-2 text-sm bg-[var(--brand-blue)] text-white rounded-md hover:bg-[#0D2847]">Save</button></div>
                </div></div>
            )}
            <DeleteConfirmModal isOpen={!!deleteItem} itemName={deleteItem?.name || ""} onConfirm={confirmDelete} onCancel={() => setDeleteItem(null)} isLoading={isDeleting} />
        </div>
    );
}
