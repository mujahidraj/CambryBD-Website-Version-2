"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import toast from "react-hot-toast";
import {
    createUniversity,
    updateUniversity,
    deleteUniversity,
} from "@/actions/universities";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";
import ImportExportButtons from "@/components/admin/ImportExportButtons";

type Country = { id: string; name: string };
type University = {
    id: string;
    name: string;
    slug: string;
    location: string;
    ranking: string | null;
    website: string | null;
    tuitionEstimate: string;
    imageUrl: string;
    description: string;
    countryId: string;
    country: Country;
    courses: { id: string }[];
};

export default function UniversitiesClient({
    universities,
    countries,
}: {
    universities: University[];
    countries: Country[];
}) {
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<University | null>(null);
    const [form, setForm] = useState({
        name: "",
        slug: "",
        location: "",
        ranking: "",
        website: "",
        tuitionEstimate: "",
        imageUrl: "",
        description: "",
        countryId: "",
    });
    const [loading, setLoading] = useState(false);
    const [deleteItem, setDeleteItem] = useState<{id: string, name: string} | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const resetForm = () => {
        setForm({ name: "", slug: "", location: "", ranking: "", website: "", tuitionEstimate: "", imageUrl: "", description: "", countryId: "" });
        setEditing(null);
        setShowModal(false);
    };

    const openCreate = () => { resetForm(); setShowModal(true); };

    const openEdit = (u: University) => {
        setEditing(u);
        setForm({
            name: u.name,
            slug: u.slug,
            location: u.location,
            ranking: u.ranking?.toString() || "",
            website: u.website || "",
            tuitionEstimate: u.tuitionEstimate,
            imageUrl: u.imageUrl,
            description: u.description,
            countryId: u.countryId,
        });
        setShowModal(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || !form.slug || !form.countryId) {
            toast.error("Please fill in all required fields");
            return;
        }
        setLoading(true);
        try {
            const data = {
                name: form.name,
                slug: form.slug,
                location: form.location,
                ranking: form.ranking || undefined,
                website: form.website || undefined,
                tuitionEstimate: form.tuitionEstimate,
                imageUrl: form.imageUrl,
                description: form.description,
                countryId: form.countryId,
            };
            if (editing) {
                await updateUniversity(editing.id, data);
                toast.success("University updated");
            } else {
                await createUniversity(data);
                toast.success("University created");
            }
            resetForm();
            window.location.reload();
        } catch {
            toast.error("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const confirmDelete = async () => {
        if (!deleteItem) return;
        setIsDeleting(true);
        try {
            await deleteUniversity(deleteItem.id);
            toast.success("University deleted");
            window.location.reload();
        } catch {
            toast.error("Failed to delete");
        } finally {
            setIsDeleting(false);
            setDeleteItem(null);
        }
    };

    const generateSlug = (name: string) =>
        name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Universities</h1>
                    <p className="text-gray-500 mt-1">Manage partner universities</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <ImportExportButtons model="university" data={universities} />
                    <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium">
                        <Plus className="w-4 h-4" /> Add University
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">University</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Country</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Ranking</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Courses</th>
                                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {universities.map((u) => (
                                <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img src={u.imageUrl} alt={u.name} className="w-10 h-10 rounded-lg object-cover" />
                                            <div>
                                                <p className="font-medium text-gray-900">{u.name}</p>
                                                <p className="text-sm text-gray-500">{u.location}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 text-sm">{u.country.name}</td>
                                    <td className="px-6 py-4">
                                        {u.ranking ? (
                                            <span className="bg-amber-50 text-amber-700 text-sm px-2.5 py-1 rounded-full font-medium">#{u.ranking}</span>
                                        ) : (
                                            <span className="text-gray-400 text-sm">N/A</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="bg-blue-50 text-blue-700 text-sm px-2.5 py-1 rounded-full font-medium">{u.courses?.length ?? 0}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <button onClick={() => openEdit(u)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => setDeleteItem({ id: u.id, name: u.name })} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {universities.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="text-center py-12 text-gray-400">No universities yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900">{editing ? "Edit University" : "Add University"}</h2>
                            <button onClick={resetForm} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700 block mb-1.5">Name *</label>
                                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value, slug: editing ? form.slug : generateSlug(e.target.value) })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. University of Oxford" />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700 block mb-1.5">Slug *</label>
                                <input type="text" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700 block mb-1.5">Country *</label>
                                <select value={form.countryId} onChange={(e) => setForm({ ...form, countryId: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="">Select country...</option>
                                    {countries.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))}
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 block mb-1.5">Location</label>
                                    <input type="text" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="City, State" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700 block mb-1.5">Ranking</label>
                                    <input type="text" value={form.ranking} onChange={(e) => setForm({ ...form, ranking: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Top 100" />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700 block mb-1.5">Official Website URL</label>
                                <input type="url" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="https://..." />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700 block mb-1.5">Tuition Estimate</label>
                                <input type="text" value={form.tuitionEstimate} onChange={(e) => setForm({ ...form, tuitionEstimate: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. $45,000/year" />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700 block mb-1.5">Image URL</label>
                                <input type="text" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="https://..." />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700 block mb-1.5">Description</label>
                                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={resetForm} className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium">Cancel</button>
                                <button type="submit" disabled={loading} className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 font-medium">{loading ? "Saving..." : editing ? "Update" : "Create"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <DeleteConfirmModal 
                isOpen={!!deleteItem} 
                itemName={deleteItem?.name || ""} 
                onConfirm={confirmDelete} 
                onCancel={() => setDeleteItem(null)} 
                isLoading={isDeleting} 
            />
        </div>
    );
}
