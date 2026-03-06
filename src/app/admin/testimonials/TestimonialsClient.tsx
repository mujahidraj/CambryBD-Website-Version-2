"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createTestimonial, updateTestimonial, deleteTestimonial } from "@/actions/testimonials";
import { Search, Plus, Pencil, Trash2, X, Star } from "lucide-react";
import toast from "react-hot-toast";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";
import ImportExportButtons from "@/components/admin/ImportExportButtons";

export default function TestimonialsClient({ testimonials }: { testimonials: any[] }) {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<any>(null);
    const [form, setForm] = useState({ studentName: "", studentCourse: "", universityName: "", targetCountry: "", quote: "", featured: false });
    const [deleteItem, setDeleteItem] = useState<{id: string, name: string} | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const filtered = testimonials.filter(t => t.studentName.toLowerCase().includes(search.toLowerCase()));

    const handleSave = async () => {
        try {
            if (editing) { await updateTestimonial(editing.id, form); toast.success("Updated"); }
            else { await createTestimonial(form); toast.success("Created"); }
            setShowModal(false); setEditing(null); router.refresh();
        } catch { toast.error("Error"); }
    };

    const confirmDelete = async () => {
        if (!deleteItem) return;
        setIsDeleting(true);
        try { await deleteTestimonial(deleteItem.id); toast.success("Deleted"); router.refresh(); } catch { toast.error("Error"); }
        finally { setIsDeleting(false); setDeleteItem(null); }
    };

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Testimonials</h1>
                <div className="flex flex-wrap items-center gap-3">
                    <ImportExportButtons model="testimonial" data={testimonials} />
                    <button onClick={() => { setEditing(null); setForm({ studentName: "", studentCourse: "", universityName: "", targetCountry: "", quote: "", featured: false }); setShowModal(true); }} className="px-4 py-2 bg-[var(--brand-blue)] text-white rounded-md text-sm font-medium flex items-center gap-2 hover:bg-[#0D2847]">
                        <Plus className="w-4 h-4" /> Add Testimonial
                    </button>
                </div>
            </div>
            <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-md text-sm" />
            </div>
            <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
                <table className="w-full text-sm">
                    <thead><tr className="bg-gray-50 border-b"><th className="p-3 text-left font-semibold">Student</th><th className="p-3 text-left font-semibold">University</th><th className="p-3 text-left font-semibold">Country</th><th className="p-3 text-center font-semibold">Featured</th><th className="p-3 text-right font-semibold">Actions</th></tr></thead>
                    <tbody>
                        {filtered.map(t => (
                            <tr key={t.id} className="border-b hover:bg-gray-50">
                                <td className="p-3 font-medium">{t.studentName}</td>
                                <td className="p-3 text-gray-500">{t.universityName}</td>
                                <td className="p-3"><span className="px-2 py-0.5 bg-blue-50 text-[var(--brand-blue)] text-xs rounded-sm">{t.targetCountry}</span></td>
                                <td className="p-3 text-center">{t.featured ? <Star className="w-4 h-4 text-yellow-500 mx-auto fill-yellow-500" /> : "—"}</td>
                                <td className="p-3 text-right">
                                    <button onClick={() => { setEditing(t); setForm({ studentName: t.studentName, studentCourse: t.studentCourse, universityName: t.universityName, targetCountry: t.targetCountry, quote: t.quote, featured: t.featured }); setShowModal(true); }} className="p-1.5 hover:bg-gray-100 rounded-md"><Pencil className="w-4 h-4 text-gray-500" /></button>
                                    <button onClick={() => setDeleteItem({id: t.id, name: t.studentName})} className="p-1.5 hover:bg-red-50 rounded-md ml-1"><Trash2 className="w-4 h-4 text-red-500" /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filtered.length === 0 && <div className="p-8 text-center text-gray-400">No testimonials found</div>}
            </div>
            {showModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-md p-6 w-full max-w-lg">
                        <div className="flex items-center justify-between mb-4"><h2 className="text-lg font-bold">{editing ? "Edit" : "Add"} Testimonial</h2><button onClick={() => setShowModal(false)}><X className="w-5 h-5" /></button></div>
                        <div className="space-y-3">
                            <div><label className="text-sm font-medium">Student Name</label><input type="text" value={form.studentName} onChange={e => setForm({ ...form, studentName: e.target.value })} className="w-full mt-1 px-3 py-2 border rounded-md text-sm" /></div>
                            <div><label className="text-sm font-medium">Course</label><input type="text" value={form.studentCourse} onChange={e => setForm({ ...form, studentCourse: e.target.value })} className="w-full mt-1 px-3 py-2 border rounded-md text-sm" /></div>
                            <div><label className="text-sm font-medium">University</label><input type="text" value={form.universityName} onChange={e => setForm({ ...form, universityName: e.target.value })} className="w-full mt-1 px-3 py-2 border rounded-md text-sm" /></div>
                            <div><label className="text-sm font-medium">Country</label><input type="text" value={form.targetCountry} onChange={e => setForm({ ...form, targetCountry: e.target.value })} className="w-full mt-1 px-3 py-2 border rounded-md text-sm" /></div>
                            <div><label className="text-sm font-medium">Quote</label><textarea value={form.quote} onChange={e => setForm({ ...form, quote: e.target.value })} rows={3} className="w-full mt-1 px-3 py-2 border rounded-md text-sm" /></div>
                            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} className="rounded" /><span className="text-sm">Featured</span></label>
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
