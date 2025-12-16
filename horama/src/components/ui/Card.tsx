"use client";

import { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    className?: string;
}

export function Card({ children, className = "" }: CardProps) {
    return (
        <div
            className={`
        rounded-2xl
        bg-white/80 dark:bg-zinc-900/80
        backdrop-blur-xl
        border border-zinc-200/50 dark:border-zinc-700/50
        shadow-xl shadow-zinc-900/5 dark:shadow-black/20
        p-8
        transition-all duration-300
        ${className}
      `}
        >
            {children}
        </div>
    );
}
