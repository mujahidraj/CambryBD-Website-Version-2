import { Globe, GraduationCap } from "lucide-react";
import Image from "next/image";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0A1628] overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[128px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--brand-yellow)] rounded-full blur-[128px] animate-pulse delay-1000" />
            </div>

            <div className="relative z-10 flex flex-col items-center">
                {/* Logo / Animation container */}
                <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
                    {/* Outer spinning rings */}
                    <div className="absolute inset-0 border-4 border-[var(--brand-blue)]/30 rounded-full animate-[spin_3s_linear_infinite]" />
                    <div className="absolute inset-2 border-4 border-t-[var(--brand-yellow)] border-r-transparent border-b-[var(--brand-yellow)] border-l-transparent rounded-full animate-[spin_2s_linear_infinite_reverse]" />
                    <div className="absolute inset-4 border-4 border-t-white border-r-transparent border-b-transparent border-l-transparent rounded-full animate-[spin_1.5s_linear_infinite]" />

                    {/* Logo Image in center */}
                    <div className="absolute inset-0 flex items-center justify-center animate-pulse">
                        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 flex items-center justify-center border border-white/10 shadow-xl shadow-var(--brand-yellow)-500/10">
                            <Image
                                src="https://i.postimg.cc/DyrWZMyx/cambry-logo.png"
                                alt="Cambry Logo"
                                width={60}
                                height={60}
                                className="w-16 h-16 object-contain"
                                priority
                            />
                        </div>
                    </div>
                </div>

                {/* Text animation */}
                <div className="flex flex-col items-center gap-1">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-wider flex items-center gap-1 leading-none mt-2">
                        CAMBRY
                    </h2>
                    <p className="text-white/80 font-bold tracking-[0.2em] text-[10px] uppercase mb-4 leading-none">
                        International Admission Centre
                    </p>
                    <p className="text-[var(--brand-yellow)] font-bold tracking-widest text-sm uppercase">
                        Loading Your Future...
                    </p>
                </div>

                {/* Bottom Progress Bar */}
                <div className="w-64 h-1 bg-[var(--brand-blue)] rounded-full mt-8 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[var(--brand-yellow)] to-yellow-500 w-full rounded-full animate-[slide-in-right_1.5s_ease-in-out_infinite]" style={{ transformOrigin: "left" }} />
                </div>
            </div>
        </div>
    );
}
