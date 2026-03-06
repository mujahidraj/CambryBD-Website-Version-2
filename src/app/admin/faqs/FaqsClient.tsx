"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createFaq, updateFaq, deleteFaq } from "@/actions/faqs";
import { Search, Plus, Pencil, Trash2, X } from "lucide-react";
import toast from "react-hot-toast";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";

export default function FaqsClient({ faqs }: { faqs: any[] }) {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<any>(null);
    const [form, setForm] = useState({ question: "", answer: "", category: "General" });
    const [deleteItem, setDeleteItem] = useState<{id: string, name: string} | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const filtered = faqs.filter(f => f.question.toLowerCase().includes(search.toLowerCase()));

    const handleSave = async () => {
        try {
            if (editing) {
                await updateFaq(editing.id, form);
                toast.success("FAQ updated");
            } else {
                await createFaq(form);
                toast.success("FAQ created");
            }
            setShowModal(false);
            setEditing(null);
            setForm({ question: "", answer: "", category: "General" });
            router.refresh();
        } catch { toast.error("Error saving FAQ"); }
    };

    const confirmDelete = async () => {
        if (!deleteItem) return;
        setIsDeleting(true);
        try {
            await deleteFaq(deleteItem.id);
            toast.success("FAQ deleted");
            router.refresh();
        } catch { toast.error("Error deleting FAQ"); }
        finally { setIsDeleting(false); setDeleteItem(null); }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900">FAQs</h1>
                <button onClick={() => { setEditing(null); setForm({ question: "", answer: "", category: "General" }); setShowModal(true); }} className="px-4 py-2 bg-[var(--brand-blue)] text-white rounded-md text-sm font-medium flex items-center gap-2 hover:bg-[#0D2847]">
                    <Plus className="w-4 h-4" /> Add FAQ
                </button>
            </div>
            <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Search FAQs..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-md text-sm" />
            </div>
            <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
                <table className="w-full text-sm">
                    <thead><tr className="bg-gray-50 border-b"><th className="p-3 text-left font-semibold">Question</th><th className="p-3 text-left font-semibold">Category</th><th className="p-3 text-left font-semibold">Active</th><th className="p-3 text-right font-semibold">Actions</th></tr></thead>
                    <tbody>
                        {filtered.map(f => (
                            <tr key={f.id} className="border-b hover:bg-gray-50">
                                <td className="p-3 max-w-xs truncate">{f.question}</td>
                                <td className="p-3"><span className="px-2 py-0.5 bg-blue-50 text-[var(--brand-blue)] text-xs rounded-sm">{f.category}</span></td>
                                <td className="p-3">{f.isActive ? "✓" : "✗"}</td>
                                <td className="p-3 text-right">
                                    <button onClick={() => { setEditing(f); setForm({ question: f.question, answer: f.answer, category: f.category }); setShowModal(true); }} className="p-1.5 hover:bg-gray-100 rounded-md"><Pencil className="w-4 h-4 text-gray-500" /></button>
                                    <button onClick={() => setDeleteItem({id: f.id, name: "this FAQ"})} className="p-1.5 hover:bg-red-50 rounded-md ml-1"><Trash2 className="w-4 h-4 text-red-500" /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filtered.length === 0 && <div className="p-8 text-center text-gray-400">No FAQs found</div>}
            </div>
            {showModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-md p-6 w-full max-w-lg">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold">{editing ? "Edit FAQ" : "Add FAQ"}</h2>
                            <button onClick={() => setShowModal(false)}><X className="w-5 h-5" /></button>
                        </div>
                        <div className="space-y-3">
                            <div><label className="text-sm font-medium">Question</label><input type="text" value={form.question} onChange={e => setForm({ ...form, question: e.target.value })} className="w-full mt-1 px-3 py-2 border rounded-md text-sm" /></div>
                            <div><label className="text-sm font-medium">Answer</label><textarea value={form.answer} onChange={e => setForm({ ...form, answer: e.target.value })} rows={4} className="w-full mt-1 px-3 py-2 border rounded-md text-sm" /></div>
                            <div><label className="text-sm font-medium">Category (where this FAQ will show)</label>
                                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full mt-1 px-3 py-2 border rounded-md text-sm">
                                    <option value="General">General</option>
                                    <option value="Admissions">Admissions</option>
                                    <option value="UK Visas">UK Visas</option>
                                    <option value="Finances">Finances</option>
                                    <option value="Scholarships">Scholarships</option>
                                    <option value="IELTS">IELTS</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-6">
                            <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md">Cancel</button>
                            <button onClick={handleSave} className="px-4 py-2 text-sm bg-[var(--brand-blue)] text-white rounded-md hover:bg-[#0D2847]">Save</button>
                        </div>
                    </div>
                </div>
            )}
            <DeleteConfirmModal isOpen={!!deleteItem} itemName={deleteItem?.name || ""} onConfirm={confirmDelete} onCancel={() => setDeleteItem(null)} isLoading={isDeleting} />
        </div>
    );
}
