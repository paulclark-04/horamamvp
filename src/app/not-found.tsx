"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "@/components/icons";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="not-found-page min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center"
      >
        <p className="text-2xl md:text-3xl font-semibold text-white mb-8">
          Oupsss, il y a un problème de lien !
        </p>

        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:scale-[1.02]"
        >
          <ArrowRightIcon className="w-4 h-4 rotate-180" />
          Retour
        </button>
      </motion.div>
    </div>
  );
}
