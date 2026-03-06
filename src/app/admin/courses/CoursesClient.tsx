"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import toast from "react-hot-toast";
import { createCourse, updateCourse, deleteCourse } from "@/actions/courses";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";
import ImportExportButtons from "@/components/admin/ImportExportButtons";

type University = { id: string; name: string; country: { name: string } };
type Course = {
    id: string;
    title: string;
    level: string;
    duration: string;
    description: string;
    universityId: string;
    university: University;
};

export default function CoursesClient({
    courses,
    universities,
}: {
    courses: Course[];
    universities: University[];
}) {
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<Course | null>(null);
    const [form, setForm] = useState({
        title: "",
        level: "BACHELORS" as "BACHELORS" | "MASTERS" | "PHD",
        duration: "",
        description: "",
        universityId: "",
    });
    const [loading, setLoading] = useState(false);
    const [deleteItem, setDeleteItem] = useState<{id: string, name: string} | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const resetForm = () => {
        setForm({ title: "", level: "BACHELORS", duration: "", description: "", universityId: "" });
        setEditing(null);
        setShowModal(false);
    };

    const openCreate = () => { resetForm(); setShowModal(true); };

    const openEdit = (c: Course) => {
        setEditing(c);
        setForm({
            title: c.title,
            level: c.level as "BACHELORS" | "MASTERS" | "PHD",
            duration: c.duration,
            description: c.description,
            universityId: c.universityId,
        });
        setShowModal(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.title || !form.universityId) {
            toast.error("Please fill in all required fields");
            return;
        }
        setLoading(true);
        try {
            if (editing) {
                await updateCourse(editing.id, form);
                toast.success("Course updated");
            } else {
                await createCourse(form);
                toast.success("Course created");
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
            await deleteCourse(deleteItem.id);
            toast.success("Course deleted");
            window.location.reload();
        } catch {
            toast.error("Failed to delete");
        } finally {
            setIsDeleting(false);
            setDeleteItem(null);
        }
    };

    const levelBadge = (level: string) => {
        const colors: Record<string, string> = {
            BACHELORS: "bg-green-50 text-green-700",
            MASTERS: "bg-blue-50 text-blue-700",
            PHD: "bg-purple-50 text-purple-700",
        };
        return colors[level] || "bg-gray-50 text-gray-700";
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Courses & Programs</h1>
                    <p className="text-gray-500 mt-1">Manage university courses</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <ImportExportButtons model="course" data={courses} />
                    <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium">
                        <Plus className="w-5 h-5" /> Add Course
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Course</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">University</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Level</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Duration</th>
                                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {courses.map((c) => (
                                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">{c.title}</td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="text-sm text-gray-700">{c.university.name}</p>
                                            <p className="text-xs text-gray-400">{c.university.country.name}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${levelBadge(c.level)}`}>
                                            {c.level}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{c.duration}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <button onClick={() => openEdit(c)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Pencil className="w-4 h-4" /></button>
                                            <button onClick={() => setDeleteItem({id: c.id, name: c.title})} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {courses.length === 0 && (
                                <tr><td colSpan={5} className="text-center py-12 text-gray-400">No courses yet.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900">{editing ? "Edit Course" : "Add Course"}</h2>
                            <button onClick={resetForm} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700 block mb-1.5">Title *</label>
                                <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Computer Science" />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700 block mb-1.5">University *</label>
                                <select value={form.universityId} onChange={(e) => setForm({ ...form, universityId: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="">Select university...</option>
                                    {universities.map((u) => (<option key={u.id} value={u.id}>{u.name} ({u.country.name})</option>))}
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 block mb-1.5">Level *</label>
                                    <select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value as "BACHELORS" | "MASTERS" | "PHD" })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option value="BACHELORS">Bachelors</option>
                                        <option value="MASTERS">Masters</option>
                                        <option value="PHD">PhD</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700 block mb-1.5">Duration</label>
                                    <input type="text" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. 4 years" />
                                </div>
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
            <DeleteConfirmModal isOpen={!!deleteItem} itemName={deleteItem?.name || ""} onConfirm={confirmDelete} onCancel={() => setDeleteItem(null)} isLoading={isDeleting} />
        </div>
    );
}
