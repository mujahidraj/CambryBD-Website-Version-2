"use client";

import { useState, useRef } from "react";
import { Download, Upload, FileJson, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface ImportExportProps {
    model: "country" | "university" | "course" | "lead" | "testimonial";
    data: any[];
}

export default function ImportExportButtons({ model, data }: ImportExportProps) {
    const [isImporting, setIsImporting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleExport = () => {
        try {
            // Create a sanitized copy of data for export (stripping heavy relational nesting if needed, or just raw)
            const jsonData = JSON.stringify(data, null, 2);
            const blob = new Blob([jsonData], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `cambry_${model}_export_${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            toast.success(`Exported ${data.length} records successfully.`);
        } catch (error) {
            toast.error("Failed to export data.");
        }
    };

    const handleImportClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsImporting(true);
        const reader = new FileReader();

        reader.onload = async (event) => {
            try {
                const result = event.target?.result;
                if (typeof result !== "string") throw new Error("Invalid file content");

                const parsedData = JSON.parse(result);
                if (!Array.isArray(parsedData)) throw new Error("Import data must be a JSON array");

                // Send to API
                const res = await fetch("/api/admin/import", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ model, payload: parsedData }),
                });

                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.error || "Failed to import");
                }

                toast.success(`Successfully imported data!`);
                window.location.reload(); // Refresh to see new data
            } catch (error: any) {
                console.error("Import Error:", error);
                toast.error(`Import failed: ${error.message}`);
            } finally {
                setIsImporting(false);
                if (fileInputRef.current) fileInputRef.current.value = ""; // Reset input
            }
        };

        reader.onerror = () => {
            toast.error("Failed to read the file.");
            setIsImporting(false);
        };

        reader.readAsText(file);
    };

    return (
        <div className="flex items-center gap-2">
            <input
                type="file"
                accept=".json"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
            />
            
            <button
                onClick={handleImportClick}
                disabled={isImporting}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 hover:border-blue-300 transition-colors shadow-sm disabled:opacity-50"
            >
                {isImporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                Import JSON
            </button>
            
            <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 hover:border-green-300 transition-colors shadow-sm"
            >
                <Download className="w-4 h-4" />
                Export JSON
            </button>
        </div>
    );
}
