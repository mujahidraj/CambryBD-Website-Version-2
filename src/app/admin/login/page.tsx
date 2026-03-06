"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAdmin } from "@/actions/auth";
import { GraduationCap, Eye, EyeOff } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error("Please fill in all fields");
            return;
        }
        setLoading(true);
        try {
            const result = await loginAdmin(email, password);
            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success(`Welcome back, ${result.name}!`);
                router.push("/admin");
                router.refresh();
            }
        } catch {
            toast.error("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0A1628] via-[#1a2744] to-[#0A1628] flex items-center justify-center p-4">
            <Toaster position="top-right" />
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-blue-600/30">
                        <GraduationCap className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
                    <p className="text-gray-400 mt-2">Sign in to manage your platform</p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/10"
                >
                    <div className="space-y-5">
                        <div>
                            <label className="text-sm font-medium text-gray-300 block mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="admin@cambrybd.com"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-300 block mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent transition-all disabled:opacity-50 shadow-lg shadow-blue-600/30"
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </div>
                </form>

                <p className="text-center text-gray-500 text-sm mt-6">
                    Cambry Admin Panel — Authorized personnel only
                </p>
            </div>
        </div>
    );
}
