"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { Container } from "@/components/Container";
import { HeroConstellation } from "@/components/HeroConstellation";
import { env } from "@/lib/env";
import { buildWhatsappUrl } from "@/lib/whatsapp";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease, delay },
  }),
};

export function Hero() {
  const whatsappHref = buildWhatsappUrl({
    numero: env.whatsappNumber,
    mensagem:
      "Olá, Magnificat Joias! Vim pelo site e gostaria de conhecer as coleções.",
  });

  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden noise-overlay"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_rgba(29,24,19,0.95)_0%,_rgba(10,8,7,1)_70%)]"
      />
      <HeroConstellation />

      <motion.div
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease }}
        className="pointer-events-none absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2"
      >
        <Image
          src="/hero-guadalupe.png"
          alt="Nossa Senhora de Guadalupe, padroeira da coleção 2026"
          width={450}
          height={1062}
          priority
          draggable={false}
          sizes="(max-width: 768px) 60vw, 35vw"
          className="h-[72vh] max-h-[920px] w-auto max-w-[92vw] object-contain opacity-[0.25] md:h-[85vh] md:opacity-[0.42]"
        />
      </motion.div>

      <Container className="relative z-10 flex flex-col items-center py-32 text-center">
        <motion.span
          custom={0}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="eyebrow text-gold [text-shadow:0_2px_18px_rgba(0,0,0,0.85)]"
        >
          Coleção 2026 · Guadalupe
        </motion.span>

        <motion.h1
          id="hero-title"
          custom={0.15}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="display-xl mt-8 text-text text-balance [text-shadow:0_4px_24px_rgba(0,0,0,0.9)]"
        >
          Joias que celebram <em className="italic text-gold/95">a fé</em>
        </motion.h1>

        <motion.p
          custom={0.4}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mt-10 max-w-xl font-display text-xl italic font-light text-text/85 text-pretty [text-shadow:0_2px_14px_rgba(0,0,0,0.85)]"
        >
          Peças exclusivas em ouro 18k, criadas com devoção.
        </motion.p>

        <motion.div
          custom={0.55}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mt-14 flex flex-col items-center gap-4 sm:flex-row sm:gap-6"
        >
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="hero-cta-primary"
            className="group inline-flex items-center justify-center gap-3 bg-gold px-8 py-4 text-[13px] font-normal uppercase tracking-[0.22em] text-bg-deep transition-all duration-500 hover:bg-gold-light"
          >
            <span>Falar no WhatsApp</span>
            <span aria-hidden className="block h-px w-6 bg-bg-deep transition-all duration-500 group-hover:w-10" />
          </a>
          <Link
            href="#colecoes"
            data-testid="hero-cta-secondary"
            className="group inline-flex items-center justify-center gap-3 border border-gold/70 px-8 py-4 text-[13px] font-normal uppercase tracking-[0.22em] text-gold transition-all duration-500 hover:border-gold hover:text-gold-light"
          >
            <span>Explorar coleções</span>
            <span aria-hidden className="block h-px w-6 bg-gold transition-all duration-500 group-hover:w-10" />
          </Link>
        </motion.div>
      </Container>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 1.1, ease }}
        className="absolute inset-x-0 bottom-10 z-10 flex flex-col items-center gap-3"
        aria-hidden
      >
        <span className="relative block h-20 w-px overflow-hidden bg-gold/15">
          <span className="anim-scroll-dot absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-gold to-transparent" />
        </span>
        <span className="eyebrow text-text-faded [text-shadow:0_2px_12px_rgba(0,0,0,0.85)]">role para descobrir</span>
      </motion.div>
    </section>
  );
}
