"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCountry, updateCountry, deleteCountry } from "@/actions/countries";
import { Search, Plus, Pencil, Trash2, X, Globe } from "lucide-react";
import toast from "react-hot-toast";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";
import ImportExportButtons from "@/components/admin/ImportExportButtons";

export default function CountriesClient({ countries }: { countries: any[] }) {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<any>(null);
    const [form, setForm] = useState({ name: "", slug: "", description: "", imageUrl: "", currency: "", language: "", capitalCity: "", visaRequirements: "" });
    const [deleteItem, setDeleteItem] = useState<{id: string, name: string} | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const filtered = countries.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

    const handleSave = async () => {
        try {
            if (editing) { await updateCountry(editing.id, form); toast.success("Updated"); }
            else { await createCountry(form); toast.success("Created"); }
            setShowModal(false); setEditing(null); router.refresh();
        } catch { toast.error("Error"); }
    };
    const confirmDelete = async () => {
        if (!deleteItem) return;
        setIsDeleting(true);
        try { await deleteCountry(deleteItem.id); toast.success("Deleted"); router.refresh(); } 
        catch { toast.error("Error"); }
        finally { setIsDeleting(false); setDeleteItem(null); }
    };

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Countries</h1>
                <div className="flex flex-wrap items-center gap-3">
                    <ImportExportButtons model="country" data={countries} />
                    <button onClick={() => { setEditing(null); setForm({ name: "", slug: "", description: "", imageUrl: "", currency: "", language: "", capitalCity: "", visaRequirements: "" }); setShowModal(true); }} className="px-4 py-2 bg-[var(--brand-blue)] text-white rounded-md text-sm font-medium flex items-center gap-2 hover:bg-[#0D2847]"><Plus className="w-4 h-4" /> Add Country</button>
                </div>
            </div>
            <div className="relative mb-4"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-md text-sm" /></div>
            <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
                <table className="w-full text-sm">
                    <thead><tr className="bg-gray-50 border-b"><th className="p-3 text-left font-semibold">Country</th><th className="p-3 text-left font-semibold">Capital</th><th className="p-3 text-left font-semibold">Currency</th><th className="p-3 text-left font-semibold">Universities</th><th className="p-3 text-right font-semibold">Actions</th></tr></thead>
                    <tbody>{filtered.map(c => (
                        <tr key={c.id} className="border-b hover:bg-gray-50">
                            <td className="p-3"><div className="flex items-center gap-2"><Globe className="w-4 h-4 text-[var(--brand-blue)]" /><span className="font-medium">{c.name}</span></div></td>
                            <td className="p-3 text-gray-500">{c.capitalCity || "—"}</td>
                            <td className="p-3"><span className="px-2 py-0.5 bg-blue-50 text-[var(--brand-blue)] text-xs rounded-sm">{c.currency || "—"}</span></td>
                            <td className="p-3 text-gray-500">{c.universities?.length || 0}</td>
                            <td className="p-3 text-right">
                                <button onClick={() => { setEditing(c); setForm({ name: c.name, slug: c.slug, description: c.description || "", imageUrl: c.imageUrl || "", currency: c.currency || "", language: c.language || "", capitalCity: c.capitalCity || "", visaRequirements: c.visaRequirements || "" }); setShowModal(true); }} className="p-1.5 hover:bg-gray-100 rounded-md"><Pencil className="w-4 h-4 text-gray-500" /></button>
                                <button onClick={() => setDeleteItem({id: c.id, name: c.name})} className="p-1.5 hover:bg-red-50 rounded-md ml-1"><Trash2 className="w-4 h-4 text-red-500" /></button>
                            </td>
                        </tr>
                    ))}</tbody>
                </table>
                {filtered.length === 0 && <div className="p-8 text-center text-gray-400">No countries</div>}
            </div>
            {showModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"><div className="bg-white rounded-md p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between mb-4"><h2 className="text-lg font-bold">{editing ? "Edit" : "Add"} Country</h2><button onClick={() => setShowModal(false)}><X className="w-5 h-5" /></button></div>
                    <div className="space-y-3">
                        <div><label className="text-sm font-medium">Name</label><input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full mt-1 px-3 py-2 border rounded-md text-sm" /></div>
                        <div><label className="text-sm font-medium">Slug</label><input type="text" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} className="w-full mt-1 px-3 py-2 border rounded-md text-sm" /></div>
                        <div><label className="text-sm font-medium">Description</label><textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} className="w-full mt-1 px-3 py-2 border rounded-md text-sm" /></div>
                        <div><label className="text-sm font-medium">Image URL</label><input type="text" value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} className="w-full mt-1 px-3 py-2 border rounded-md text-sm" /></div>
                        <div className="grid grid-cols-2 gap-3">
                            <div><label className="text-sm font-medium">Currency</label><input type="text" value={form.currency} onChange={e => setForm({ ...form, currency: e.target.value })} className="w-full mt-1 px-3 py-2 border rounded-md text-sm" /></div>
                            <div><label className="text-sm font-medium">Capital City</label><input type="text" value={form.capitalCity} onChange={e => setForm({ ...form, capitalCity: e.target.value })} className="w-full mt-1 px-3 py-2 border rounded-md text-sm" /></div>
                        </div>
                        <div><label className="text-sm font-medium">Language</label><input type="text" value={form.language} onChange={e => setForm({ ...form, language: e.target.value })} className="w-full mt-1 px-3 py-2 border rounded-md text-sm" /></div>
                        <div><label className="text-sm font-medium">Visa Requirements</label><textarea value={form.visaRequirements} onChange={e => setForm({ ...form, visaRequirements: e.target.value })} rows={4} className="w-full mt-1 px-3 py-2 border rounded-md text-sm" /></div>
                    </div>
                    <div className="flex justify-end gap-3 mt-6"><button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md">Cancel</button><button onClick={handleSave} className="px-4 py-2 text-sm bg-[var(--brand-blue)] text-white rounded-md hover:bg-[#0D2847]">Save</button></div>
                </div></div>
            )}
            <DeleteConfirmModal isOpen={!!deleteItem} itemName={deleteItem?.name || ""} onConfirm={confirmDelete} onCancel={() => setDeleteItem(null)} isLoading={isDeleting} />
        </div>
    );
}
