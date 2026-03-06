import { Trash2, X } from "lucide-react";

interface DeleteConfirmModalProps {
    isOpen: boolean;
    itemName: string;
    onConfirm: () => void;
    onCancel: () => void;
    isLoading?: boolean;
}

export default function DeleteConfirmModal({
    isOpen,
    itemName,
    onConfirm,
    onCancel,
    isLoading = false
}: DeleteConfirmModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
            <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-xl animate-scale-in">
                <div className="p-6 text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Trash2 className="w-8 h-8 text-red-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Item</h3>
                    <p className="text-gray-500 mb-6">
                        Are you sure you want to delete <span className="font-semibold text-gray-800">"{itemName}"</span>? This action cannot be undone.
                    </p>
                    <div className="flex gap-3">
                        <button 
                            onClick={onCancel} 
                            disabled={isLoading}
                            className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={onConfirm}
                            disabled={isLoading}
                            className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium disabled:opacity-50"
                        >
                            {isLoading ? "Deleting..." : "Delete"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
