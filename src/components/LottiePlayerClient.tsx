"use client";

import { Player } from "@lottiefiles/react-lottie-player";
import { useEffect, useState } from "react";

export default function LottiePlayerClient() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <Player
            autoplay
            loop
            src="https://lottie.host/28f913ab-dd87-4aa7-a841-3da658602b1f/yV9n84Q4Fj.json"
            className="w-full h-full object-contain scale-125 hover:scale-150 transition-transform duration-700 cursor-pointer"
        />
    );
}
