"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createIELTSInfo, updateIELTSInfo, deleteIELTSInfo } from "@/actions/ieltsInfo";
import { Search, Plus, Pencil, Trash2, X, CalendarCheck } from "lucide-react";
import toast from "react-hot-toast";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";

export default function IELTSBookingClient({ items }: { items: any[] }) {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<any>(null);
    const [form, setForm] = useState({ testType: "", description: "", fee: "", venue: "", requirements: "", nextDate: "", imageUrl: "", isActive: true });
    const [deleteItem, setDeleteItem] = useState<{id: string, name: string} | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const filtered = items.filter(i => i.testType.toLowerCase().includes(search.toLowerCase()) || i.venue.toLowerCase().includes(search.toLowerCase()));

    const handleSave = async () => {
        if (!form.testType || !form.description || !form.fee || !form.venue || !form.requirements) {
            toast.error("Please fill all required fields");
            return;
        }
        try {
            if (editing) { await updateIELTSInfo(editing.id, form); toast.success("Updated"); }
            else { await createIELTSInfo(form); toast.success("Created"); }
            setShowModal(false); setEditing(null); router.refresh();
        } catch { toast.error("Error"); }
    };
    const confirmDelete = async () => {
        if (!deleteItem) return;
        setIsDeleting(true);
        try { await deleteIELTSInfo(deleteItem.id); toast.success("Deleted"); router.refresh(); } catch { toast.error("Error"); }
        finally { setIsDeleting(false); setDeleteItem(null); }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <CalendarCheck className="w-7 h-7 text-[var(--brand-blue)]" />
                    <h1 className="text-2xl font-bold text-gray-900">IELTS Booking / Admission</h1>
                </div>
                <button onClick={() => { setEditing(null); setForm({ testType: "", description: "", fee: "", venue: "", requirements: "", nextDate: "", imageUrl: "", isActive: true }); setShowModal(true); }} className="px-4 py-2 bg-[var(--brand-blue)] text-white rounded-md text-sm font-medium flex items-center gap-2 hover:bg-[#0D2847]"><Plus className="w-4 h-4" /> Add</button>
            </div>
            <div className="relative mb-4"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="text" placeholder="Search by test type or venue..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-md text-sm" /></div>
            <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
                <table className="w-full text-sm">
                    <thead><tr className="bg-gray-50 border-b"><th className="p-3 text-left font-semibold">Test Type</th><th className="p-3 text-left font-semibold">Fee</th><th className="p-3 text-left font-semibold">Venue</th><th className="p-3 text-left font-semibold">Next Date</th><th className="p-3 text-left font-semibold">Status</th><th className="p-3 text-right font-semibold">Actions</th></tr></thead>
                    <tbody>{filtered.map(i => (
                        <tr key={i.id} className="border-b hover:bg-gray-50">
                            <td className="p-3 font-medium">{i.testType}</td>
                            <td className="p-3 text-gray-500">{i.fee}</td>
                            <td className="p-3 text-gray-500">{i.venue}</td>
                            <td className="p-3 text-gray-500">{i.nextDate ? new Date(i.nextDate).toLocaleDateString() : "—"}</td>
                            <td className="p-3"><span className={`text-xs px-2 py-1 rounded-full font-medium ${i.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{i.isActive ? "Active" : "Inactive"}</span></td>
                            <td className="p-3 text-right">
                                <button onClick={() => { setEditing(i); setForm({ testType: i.testType, description: i.description || "", fee: i.fee, venue: i.venue, requirements: i.requirements || "", nextDate: i.nextDate ? new Date(i.nextDate).toISOString().split("T")[0] : "", imageUrl: i.imageUrl || "", isActive: i.isActive }); setShowModal(true); }} className="p-1.5 hover:bg-gray-100 rounded-md"><Pencil className="w-4 h-4 text-gray-500" /></button>
                                <button onClick={() => setDeleteItem({id: i.id, name: i.testType})} className="p-1.5 hover:bg-red-50 rounded-md ml-1"><Trash2 className="w-4 h-4 text-red-500" /></button>
                            </td>
                        </tr>
                    ))}</tbody>
                </table>
                {filtered.length === 0 && <div className="p-8 text-center text-gray-400">No IELTS info found</div>}
            </div>
            {showModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"><div className="bg-white rounded-md p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between mb-4"><h2 className="text-lg font-bold">{editing ? "Edit" : "Add"} IELTS Info</h2><button onClick={() => setShowModal(false)}><X className="w-5 h-5" /></button></div>
                    <div className="space-y-3">
                        <div><label className="text-sm font-medium">Test Type *</label><input type="text" value={form.testType} onChange={e => setForm({ ...form, testType: e.target.value })} className="w-full mt-1 px-3 py-2 border rounded-md text-sm" placeholder="e.g., IELTS Academic" /></div>
                        <div><label className="text-sm font-medium">Description *</label><textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} className="w-full mt-1 px-3 py-2 border rounded-md text-sm" /></div>
                        <div className="grid grid-cols-2 gap-3">
                            <div><label className="text-sm font-medium">Fee *</label><input type="text" value={form.fee} onChange={e => setForm({ ...form, fee: e.target.value })} className="w-full mt-1 px-3 py-2 border rounded-md text-sm" placeholder="e.g., BDT 22,500" /></div>
                            <div><label className="text-sm font-medium">Venue *</label><input type="text" value={form.venue} onChange={e => setForm({ ...form, venue: e.target.value })} className="w-full mt-1 px-3 py-2 border rounded-md text-sm" placeholder="e.g., British Council, Dhaka" /></div>
                        </div>
                        <div><label className="text-sm font-medium">Requirements *</label><textarea value={form.requirements} onChange={e => setForm({ ...form, requirements: e.target.value })} rows={3} className="w-full mt-1 px-3 py-2 border rounded-md text-sm" placeholder="What candidates need to bring..." /></div>
                        <div className="grid grid-cols-2 gap-3">
                            <div><label className="text-sm font-medium">Next Available Date</label><input type="date" value={form.nextDate} onChange={e => setForm({ ...form, nextDate: e.target.value })} className="w-full mt-1 px-3 py-2 border rounded-md text-sm" /></div>
                            <div><label className="text-sm font-medium">Image URL</label><input type="text" value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} className="w-full mt-1 px-3 py-2 border rounded-md text-sm" placeholder="https://..." /></div>
                        </div>
                        <div className="flex items-center gap-2"><input type="checkbox" checked={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.checked })} id="isActive" /><label htmlFor="isActive" className="text-sm font-medium">Active (visible on public site)</label></div>
                    </div>
                    <div className="flex justify-end gap-3 mt-6"><button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md">Cancel</button><button onClick={handleSave} className="px-4 py-2 text-sm bg-[var(--brand-blue)] text-white rounded-md hover:bg-[#0D2847]">Save</button></div>
                </div></div>
            )}
            <DeleteConfirmModal isOpen={!!deleteItem} itemName={deleteItem?.name || ""} onConfirm={confirmDelete} onCancel={() => setDeleteItem(null)} isLoading={isDeleting} />
        </div>
    );
}
