"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCertification, updateCertification, deleteCertification } from "@/actions/certifications";
import { Search, Plus, Pencil, Trash2, X, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

export default function CertificationsClient({ certifications }: { certifications: any[] }) {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<any>(null);
    const [form, setForm] = useState({ title: "", issuingBody: "", description: "", imageUrl: "", dateIssued: "", isActive: true });
    const filtered = certifications.filter(c => c.title.toLowerCase().includes(search.toLowerCase()) || c.issuingBody.toLowerCase().includes(search.toLowerCase()));

    const handleSave = async () => {
        if (!form.title || !form.issuingBody || !form.description || !form.imageUrl) {
            toast.error("Please fill all required fields");
            return;
        }
        try {
            if (editing) { await updateCertification(editing.id, form); toast.success("Updated"); }
            else { await createCertification(form); toast.success("Created"); }
            setShowModal(false); setEditing(null); router.refresh();
        } catch { toast.error("Error"); }
    };
    const handleDelete = async (id: string) => {
        if (!confirm("Delete this certification?")) return;
        try { await deleteCertification(id); toast.success("Deleted"); router.refresh(); } catch { toast.error("Error"); }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <ShieldCheck className="w-7 h-7 text-[var(--brand-blue)]" />
                    <h1 className="text-2xl font-bold text-gray-900">Certifications</h1>
                </div>
                <button onClick={() => { setEditing(null); setForm({ title: "", issuingBody: "", description: "", imageUrl: "", dateIssued: "", isActive: true }); setShowModal(true); }} className="px-4 py-2 bg-[var(--brand-blue)] text-white rounded-md text-sm font-medium flex items-center gap-2 hover:bg-[#0D2847]"><Plus className="w-4 h-4" /> Add</button>
            </div>
            <div className="relative mb-4"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="text" placeholder="Search certifications..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-md text-sm" /></div>
            <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
                <table className="w-full text-sm">
                    <thead><tr className="bg-gray-50 border-b"><th className="p-3 text-left font-semibold">Title</th><th className="p-3 text-left font-semibold">Issuing Body</th><th className="p-3 text-left font-semibold">Date Issued</th><th className="p-3 text-left font-semibold">Status</th><th className="p-3 text-right font-semibold">Actions</th></tr></thead>
                    <tbody>{filtered.map(c => (
                        <tr key={c.id} className="border-b hover:bg-gray-50">
                            <td className="p-3 font-medium">{c.title}</td>
                            <td className="p-3 text-gray-500">{c.issuingBody}</td>
                            <td className="p-3 text-gray-500">{c.dateIssued ? new Date(c.dateIssued).toLocaleDateString() : "—"}</td>
                            <td className="p-3"><span className={`text-xs px-2 py-1 rounded-full font-medium ${c.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{c.isActive ? "Active" : "Inactive"}</span></td>
                            <td className="p-3 text-right">
                                <button onClick={() => { setEditing(c); setForm({ title: c.title, issuingBody: c.issuingBody, description: c.description || "", imageUrl: c.imageUrl || "", dateIssued: c.dateIssued ? new Date(c.dateIssued).toISOString().split("T")[0] : "", isActive: c.isActive }); setShowModal(true); }} className="p-1.5 hover:bg-gray-100 rounded-md"><Pencil className="w-4 h-4 text-gray-500" /></button>
                                <button onClick={() => handleDelete(c.id)} className="p-1.5 hover:bg-red-50 rounded-md ml-1"><Trash2 className="w-4 h-4 text-red-500" /></button>
                            </td>
                        </tr>
                    ))}</tbody>
                </table>
                {filtered.length === 0 && <div className="p-8 text-center text-gray-400">No certifications found</div>}
            </div>
            {showModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"><div className="bg-white rounded-md p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between mb-4"><h2 className="text-lg font-bold">{editing ? "Edit" : "Add"} Certification</h2><button onClick={() => setShowModal(false)}><X className="w-5 h-5" /></button></div>
                    <div className="space-y-3">
                        <div><label className="text-sm font-medium">Title *</label><input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full mt-1 px-3 py-2 border rounded-md text-sm" placeholder="e.g., British Council Certified Agent" /></div>
                        <div><label className="text-sm font-medium">Issuing Body *</label><input type="text" value={form.issuingBody} onChange={e => setForm({ ...form, issuingBody: e.target.value })} className="w-full mt-1 px-3 py-2 border rounded-md text-sm" placeholder="e.g., British Council" /></div>
                        <div><label className="text-sm font-medium">Description *</label><textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} className="w-full mt-1 px-3 py-2 border rounded-md text-sm" /></div>
                        <div><label className="text-sm font-medium">Certificate Image URL *</label><input type="text" value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} className="w-full mt-1 px-3 py-2 border rounded-md text-sm" placeholder="https://..." /></div>
                        <div><label className="text-sm font-medium">Date Issued</label><input type="date" value={form.dateIssued} onChange={e => setForm({ ...form, dateIssued: e.target.value })} className="w-full mt-1 px-3 py-2 border rounded-md text-sm" /></div>
                        <div className="flex items-center gap-2"><input type="checkbox" checked={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.checked })} id="isActive" /><label htmlFor="isActive" className="text-sm font-medium">Active (visible on public site)</label></div>
                    </div>
                    <div className="flex justify-end gap-3 mt-6"><button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md">Cancel</button><button onClick={handleSave} className="px-4 py-2 text-sm bg-[var(--brand-blue)] text-white rounded-md hover:bg-[#0D2847]">Save</button></div>
                </div></div>
            )}
        </div>
    );
}
