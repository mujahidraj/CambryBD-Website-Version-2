import { Globe, GraduationCap } from "lucide-react";
import Image from "next/image";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0A1628] overflow-hidden">
            {/* Ambient background */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-blue-500/8 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-amber-500/6 rounded-full blur-[150px] animate-pulse [animation-delay:1s]" />
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
                {/* Logo container with elegant rings */}
                <div className="relative w-40 h-40 mb-10 flex items-center justify-center">
                    {/* Outer ring - slow spin */}
                    <div className="absolute inset-0 rounded-full border-2 border-white/[0.06] animate-[spin_6s_linear_infinite]" />
                    {/* Middle ring - counter spin with gradient */}
                    <div className="absolute inset-3 rounded-full border-2 border-t-amber-400/40 border-r-transparent border-b-amber-400/20 border-l-transparent animate-[spin_3s_linear_infinite_reverse]" />
                    {/* Inner ring */}
                    <div className="absolute inset-6 rounded-full border-2 border-t-white/30 border-r-transparent border-b-transparent border-l-transparent animate-[spin_2s_linear_infinite]" />

                    {/* Logo */}
                    <div className="relative flex items-center justify-center">
                        <div className="bg-white/[0.04] backdrop-blur-xl rounded-2xl p-5 border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
                            <Image
                                src="https://i.postimg.cc/DyrWZMyx/cambry-logo.png"
                                alt="Cambry Logo"
                                width={56}
                                height={56}
                                className="w-14 h-14 object-contain"
                                priority
                            />
                        </div>
                    </div>
                </div>

                {/* Text */}
                <div className="flex flex-col items-center gap-2">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-[0.15em] leading-none">
                        CAMBRY
                    </h2>
                    <p className="text-white/40 font-bold tracking-[0.25em] text-[10px] uppercase leading-none">
                        International Admission Centre
                    </p>
                    <p className="text-amber-400/80 font-bold tracking-[0.2em] text-xs uppercase mt-3">
                        Loading Your Future...
                    </p>
                </div>

                {/* Progress bar */}
                <div className="w-56 h-[3px] bg-white/[0.06] rounded-full mt-8 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-400 to-orange-400 w-full rounded-full animate-[slide-in-right_1.5s_ease-in-out_infinite]" style={{ transformOrigin: "left" }} />
                </div>
            </div>
        </div>
    );
}
