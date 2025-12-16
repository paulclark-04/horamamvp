"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRightIcon } from "@/components/icons";

interface AnnouncementBannerProps {
  text: string;
  linkText?: string;
  href?: string;
  badge?: string;
  dismissible?: boolean;
}

export function AnnouncementBanner({
  text = "Sélectionné pour le CES 2026 Las Vegas",
  linkText = "En savoir plus",
  href = "/site_vitrine/actualites",
  badge = "Nouveau",
  dismissible = true,
}: AnnouncementBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-[60] isolate flex items-center gap-x-6 overflow-hidden bg-gradient-to-r from-primary-950 via-primary-900 to-secondary-950 px-6 py-2.5 sm:px-3.5"
    >
      {/* Background animated gradient */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-r from-primary-500/20 via-secondary-500/20 to-primary-500/20 bg-[length:200%_100%]"
        />
      </div>

      {/* Decorative elements */}
      <div className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl">
        <div className="aspect-[577/310] w-[36rem] bg-gradient-to-r from-primary-500/30 to-secondary-500/30 opacity-30" />
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 w-full justify-center">
        <div className="flex items-center gap-x-3">
          {badge && (
            <motion.span
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center gap-1 rounded-full bg-primary-500/20 px-3 py-1 text-xs font-semibold text-primary-300 ring-1 ring-inset ring-primary-500/30"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500" />
              </span>
              {badge}
            </motion.span>
          )}
          <p className="text-sm leading-6 text-white/90">
            <strong className="font-semibold">🏆 CES 2026</strong>
            <svg viewBox="0 0 2 2" className="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true">
              <circle cx={1} cy={1} r={1} />
            </svg>
            {text}
          </p>
        </div>

        {href && linkText && (
          <Link
            href={href}
            className="group flex items-center gap-x-1 rounded-full bg-white/10 px-3.5 py-1 text-sm font-semibold text-white hover:bg-white/20 transition-all duration-300"
          >
            {linkText}
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>

      {dismissible && (
        <button
          type="button"
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-white/60 hover:text-white transition-colors"
        >
          <span className="sr-only">Fermer</span>
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
      )}
    </motion.div>
  );
}
