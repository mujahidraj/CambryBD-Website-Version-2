"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createScholarship, updateScholarship, deleteScholarship } from "@/actions/scholarships";
import { Search, Plus, Pencil, Trash2, X, Award } from "lucide-react";
import toast from "react-hot-toast";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";

export default function ScholarshipsClient({ scholarships, universities }: { scholarships: any[]; universities: any[] }) {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<any>(null);
    const [form, setForm] = useState({ name: "", amount: "", description: "", criteria: "", deadline: "", universityId: "" });
    const [deleteItem, setDeleteItem] = useState<{id: string, name: string} | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const filtered = scholarships.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.university?.name?.toLowerCase().includes(search.toLowerCase()));

    const handleSave = async () => {
        if (!form.name || !form.amount || !form.description || !form.universityId) {
            toast.error("Please fill all required fields");
            return;
        }
        try {
            if (editing) {
                await updateScholarship(editing.id, {
                    ...form,
                    deadline: form.deadline ? new Date(form.deadline) : null,
                });
                toast.success("Updated");
            } else {
                await createScholarship({
                    ...form,
                    deadline: form.deadline ? new Date(form.deadline) : undefined,
                });
                toast.success("Created");
            }
            setShowModal(false); setEditing(null); router.refresh();
        } catch { toast.error("Error saving"); }
    };

    const confirmDelete = async () => {
        if (!deleteItem) return;
        setIsDeleting(true);
        try { await deleteScholarship(deleteItem.id); toast.success("Deleted"); router.refresh(); } catch { toast.error("Error"); }
        finally { setIsDeleting(false); setDeleteItem(null); }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <Award className="w-7 h-7 text-[var(--brand-blue)]" />
                    <h1 className="text-2xl font-bold text-gray-900">Scholarships</h1>
                </div>
                <button onClick={() => { setEditing(null); setForm({ name: "", amount: "", description: "", criteria: "", deadline: "", universityId: "" }); setShowModal(true); }} className="px-4 py-2 bg-[var(--brand-blue)] text-white rounded-md text-sm font-medium flex items-center gap-2 hover:bg-[#0D2847]"><Plus className="w-4 h-4" /> Add</button>
            </div>
            <div className="relative mb-4"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="text" placeholder="Search by name or university..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-md text-sm" /></div>
            <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
                <table className="w-full text-sm">
                    <thead><tr className="bg-gray-50 border-b"><th className="p-3 text-left font-semibold">Name</th><th className="p-3 text-left font-semibold">Amount</th><th className="p-3 text-left font-semibold">University</th><th className="p-3 text-left font-semibold">Deadline</th><th className="p-3 text-right font-semibold">Actions</th></tr></thead>
                    <tbody>{filtered.map(s => (
                        <tr key={s.id} className="border-b hover:bg-gray-50">
                            <td className="p-3 font-medium">{s.name}</td>
                            <td className="p-3 text-[var(--brand-yellow)] font-medium">{s.amount}</td>
                            <td className="p-3 text-gray-500">{s.university?.name || "—"}</td>
                            <td className="p-3 text-gray-500">{s.deadline ? new Date(s.deadline).toLocaleDateString() : "—"}</td>
                            <td className="p-3 text-right">
                                <button onClick={() => { setEditing(s); setForm({ name: s.name, amount: s.amount, description: s.description || "", criteria: s.criteria || "", deadline: s.deadline ? new Date(s.deadline).toISOString().split("T")[0] : "", universityId: s.universityId }); setShowModal(true); }} className="p-1.5 hover:bg-gray-100 rounded-md"><Pencil className="w-4 h-4 text-gray-500" /></button>
                                <button onClick={() => setDeleteItem({id: s.id, name: s.name})} className="p-1.5 hover:bg-red-50 rounded-md ml-1"><Trash2 className="w-4 h-4 text-red-500" /></button>
                            </td>
                        </tr>
                    ))}</tbody>
                </table>
                {filtered.length === 0 && <div className="p-8 text-center text-gray-400">No scholarships found</div>}
            </div>
            {showModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"><div className="bg-white rounded-md p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between mb-4"><h2 className="text-lg font-bold">{editing ? "Edit" : "Add"} Scholarship</h2><button onClick={() => setShowModal(false)}><X className="w-5 h-5" /></button></div>
                    <div className="space-y-3">
                        <div><label className="text-sm font-medium">Name *</label><input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full mt-1 px-3 py-2 border rounded-md text-sm" placeholder="e.g., International Excellence Scholarship" /></div>
                        <div><label className="text-sm font-medium">University *</label>
                            <select value={form.universityId} onChange={e => setForm({ ...form, universityId: e.target.value })} className="w-full mt-1 px-3 py-2 border rounded-md text-sm">
                                <option value="">Select university...</option>
                                {universities.map((u: any) => (<option key={u.id} value={u.id}>{u.name}</option>))}
                            </select>
                        </div>
                        <div><label className="text-sm font-medium">Amount *</label><input type="text" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} className="w-full mt-1 px-3 py-2 border rounded-md text-sm" placeholder="e.g., Up to NZD 20,000" /></div>
                        <div><label className="text-sm font-medium">Description *</label><textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} className="w-full mt-1 px-3 py-2 border rounded-md text-sm" /></div>
                        <div><label className="text-sm font-medium">Eligibility Criteria</label><textarea value={form.criteria} onChange={e => setForm({ ...form, criteria: e.target.value })} rows={2} className="w-full mt-1 px-3 py-2 border rounded-md text-sm" /></div>
                        <div><label className="text-sm font-medium">Deadline</label><input type="date" value={form.deadline} onChange={e => setForm({ ...form, deadline: e.target.value })} className="w-full mt-1 px-3 py-2 border rounded-md text-sm" /></div>
                    </div>
                    <div className="flex justify-end gap-3 mt-6"><button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md">Cancel</button><button onClick={handleSave} className="px-4 py-2 text-sm bg-[var(--brand-blue)] text-white rounded-md hover:bg-[#0D2847]">Save</button></div>
                </div></div>
            )}
            <DeleteConfirmModal isOpen={!!deleteItem} itemName={deleteItem?.name || ""} onConfirm={confirmDelete} onCancel={() => setDeleteItem(null)} isLoading={isDeleting} />
        </div>
    );
}
