"use client";

import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { env } from "@/lib/env";
import { buildWhatsappUrl } from "@/lib/whatsapp";

const DEFAULT_MESSAGE =
  "Olá, Magnificat Joias! Gostaria de conhecer melhor as coleções.";

export function WhatsappButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY >= 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const href = buildWhatsappUrl({
    numero: env.whatsappNumber,
    mensagem: DEFAULT_MESSAGE,
  });

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="whatsapp-fab"
          initial={{ opacity: 0, scale: 0.85, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 16 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 z-40"
        >
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar no WhatsApp"
            data-testid="whatsapp-fab"
            className="group relative inline-flex h-16 w-16 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_18px_60px_-12px_rgba(37,211,102,0.55)] transition-transform duration-300 hover:scale-[1.08] hover:shadow-[0_22px_72px_-12px_rgba(37,211,102,0.65)]"
          >
            <span
              aria-hidden
              className="anim-pulse-ring absolute inset-0 rounded-full border-2 border-whatsapp/70"
            />
            <MessageCircle size={28} strokeWidth={1.6} />
          </a>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
