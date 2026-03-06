"use client";

import { motion } from "framer-motion";

export const FadeIn = ({ children, className = "" }: { children: React.ReactNode, delay?: number, className?: string, direction?: "up" | "left" | "right" | "down" }) => {
    return (
        <div className={className}>
            {children}
        </div>
    );
};

export const StaggerContainer = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={className}>
            {children}
        </div>
    );
};

export const StaggerItem = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={className}>
            {children}
        </div>
    );
};

export const HoverCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={`transform-gpu will-change-transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl ${className}`}>
            {children}
        </div>
    );
};
