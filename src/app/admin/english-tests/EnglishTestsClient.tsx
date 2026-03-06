"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createEnglishTest, updateEnglishTest, deleteEnglishTest } from "@/actions/englishTests";
import { Search, Plus, Pencil, Trash2, X, Languages, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function EnglishTestsClient({ tests, universities }: { tests: any[]; universities: any[] }) {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<any>(null);
    const [form, setForm] = useState({ testName: "", minimumScore: "", acceptsMOI: false, notes: "", universityId: "" });
    const filtered = tests.filter(t => t.testName.toLowerCase().includes(search.toLowerCase()) || t.university?.name?.toLowerCase().includes(search.toLowerCase()));

    const handleSave = async () => {
        if (!form.testName || !form.minimumScore || !form.universityId) {
            toast.error("Please fill all required fields");
            return;
        }
        try {
            if (editing) { await updateEnglishTest(editing.id, form); toast.success("Updated"); }
            else { await createEnglishTest(form); toast.success("Created"); }
            setShowModal(false); setEditing(null); router.refresh();
        } catch { toast.error("Error saving"); }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this test requirement?")) return;
        try { await deleteEnglishTest(id); toast.success("Deleted"); router.refresh(); } catch { toast.error("Error"); }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <Languages className="w-7 h-7 text-[var(--brand-blue)]" />
                    <h1 className="text-2xl font-bold text-gray-900">English Test Requirements</h1>
                </div>
                <button onClick={() => { setEditing(null); setForm({ testName: "", minimumScore: "", acceptsMOI: false, notes: "", universityId: "" }); setShowModal(true); }} className="px-4 py-2 bg-[var(--brand-blue)] text-white rounded-md text-sm font-medium flex items-center gap-2 hover:bg-[#0D2847]"><Plus className="w-4 h-4" /> Add</button>
            </div>
            <div className="relative mb-4"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="text" placeholder="Search by test name or university..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-md text-sm" /></div>
            <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
                <table className="w-full text-sm">
                    <thead><tr className="bg-gray-50 border-b"><th className="p-3 text-left font-semibold">Test</th><th className="p-3 text-left font-semibold">Min Score</th><th className="p-3 text-center font-semibold">Accepts MOI</th><th className="p-3 text-left font-semibold">University</th><th className="p-3 text-right font-semibold">Actions</th></tr></thead>
                    <tbody>{filtered.map(t => (
                        <tr key={t.id} className="border-b hover:bg-gray-50">
                            <td className="p-3 font-medium">{t.testName}</td>
                            <td className="p-3 text-gray-500">{t.minimumScore}</td>
                            <td className="p-3 text-center">{t.acceptsMOI ? <CheckCircle className="w-4 h-4 text-green-500 mx-auto" /> : "—"}</td>
                            <td className="p-3 text-gray-500">{t.university?.name || "—"}</td>
                            <td className="p-3 text-right">
                                <button onClick={() => { setEditing(t); setForm({ testName: t.testName, minimumScore: t.minimumScore, acceptsMOI: t.acceptsMOI, notes: t.notes || "", universityId: t.universityId }); setShowModal(true); }} className="p-1.5 hover:bg-gray-100 rounded-md"><Pencil className="w-4 h-4 text-gray-500" /></button>
                                <button onClick={() => handleDelete(t.id)} className="p-1.5 hover:bg-red-50 rounded-md ml-1"><Trash2 className="w-4 h-4 text-red-500" /></button>
                            </td>
                        </tr>
                    ))}</tbody>
                </table>
                {filtered.length === 0 && <div className="p-8 text-center text-gray-400">No test requirements found</div>}
            </div>
            {showModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"><div className="bg-white rounded-md p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between mb-4"><h2 className="text-lg font-bold">{editing ? "Edit" : "Add"} Test Requirement</h2><button onClick={() => setShowModal(false)}><X className="w-5 h-5" /></button></div>
                    <div className="space-y-3">
                        <div><label className="text-sm font-medium">Test Name *</label>
                            <select value={form.testName} onChange={e => setForm({ ...form, testName: e.target.value })} className="w-full mt-1 px-3 py-2 border rounded-md text-sm">
                                <option value="">Select test type...</option>
                                <option value="IELTS">IELTS</option>
                                <option value="TOEFL">TOEFL</option>
                                <option value="PTE">PTE</option>
                                <option value="Duolingo">Duolingo</option>
                                <option value="MOI">MOI (Medium of Instruction)</option>
                            </select>
                        </div>
                        <div><label className="text-sm font-medium">University *</label>
                            <select value={form.universityId} onChange={e => setForm({ ...form, universityId: e.target.value })} className="w-full mt-1 px-3 py-2 border rounded-md text-sm">
                                <option value="">Select university...</option>
                                {universities.map((u: any) => (<option key={u.id} value={u.id}>{u.name}</option>))}
                            </select>
                        </div>
                        <div><label className="text-sm font-medium">Minimum Score *</label><input type="text" value={form.minimumScore} onChange={e => setForm({ ...form, minimumScore: e.target.value })} className="w-full mt-1 px-3 py-2 border rounded-md text-sm" placeholder="e.g., 6.5 overall, no band less than 6.0" /></div>
                        <div className="flex items-center gap-2"><input type="checkbox" checked={form.acceptsMOI} onChange={e => setForm({ ...form, acceptsMOI: e.target.checked })} id="acceptsMOI" /><label htmlFor="acceptsMOI" className="text-sm font-medium">Accepts Medium of Instruction (MOI)</label></div>
                        <div><label className="text-sm font-medium">Notes</label><textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} rows={2} className="w-full mt-1 px-3 py-2 border rounded-md text-sm" placeholder="Additional notes..." /></div>
                    </div>
                    <div className="flex justify-end gap-3 mt-6"><button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md">Cancel</button><button onClick={handleSave} className="px-4 py-2 text-sm bg-[var(--brand-blue)] text-white rounded-md hover:bg-[#0D2847]">Save</button></div>
                </div></div>
            )}
        </div>
    );
}
