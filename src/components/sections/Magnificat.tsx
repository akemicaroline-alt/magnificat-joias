"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";

import { Container } from "@/components/Container";
import { MagnificatDust } from "@/components/MagnificatDust";

const CANTO =
  "Magnificat anima mea Dominum, et exsultavit spiritus meus in Deo salvatore meo, quia respexit humilitatem ancillae suae. Ecce enim ex hoc beatam me dicent omnes generationes, quia fecit mihi magna, qui potens est, et sanctum nomen eius, et misericordia eius in progenies et progenies timentibus eum. Fecit potentiam in brachio suo, dispersit superbos mente cordis sui; deposuit potentes de sede et exaltavit humiles. Esurientes implevit bonis et divites dimisit inanes. Suscepit Israel puerum suum, recordatus misericordiae, sicut locutus est ad patres nostros, Abraham et semini eius in saecula.";

function subscribeReducedMotion(callback: () => void): () => void {
  if (typeof window === "undefined") return () => undefined;
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Magnificat() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    () => false,
  );
  const [chars, setChars] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.95", "end 0.7"],
  });
  const charsMV = useTransform(
    scrollYProgress,
    [0.0, 0.8],
    [0, CANTO.length],
  );
  useMotionValueEvent(charsMV, "change", (latest) => {
    const next = Math.max(0, Math.min(CANTO.length, Math.round(latest)));
    setChars((prev) => (prev !== next ? next : prev));
  });

  const visibleCount = reduced ? CANTO.length : chars;
  const visibleText = CANTO.substring(0, visibleCount);
  const hiddenText = CANTO.substring(visibleCount);

  return (
    <section
      ref={sectionRef}
      id="magnificat"
      aria-labelledby="magnificat-title"
      className="relative overflow-hidden bg-bg-deep py-10 md:py-16"
    >
      <MagnificatDust />
      <div
        aria-hidden
        className="absolute inset-0 [background:radial-gradient(ellipse_at_center,_rgba(20,17,14,0.6)_0%,_transparent_70%)]"
      />

      <Container className="relative">
        <motion.h2
          id="magnificat-title"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="display-l text-center italic text-gold [text-shadow:0_0_24px_rgba(200,169,110,0.25)]"
        >
          Magnificat
        </motion.h2>

        <span
          aria-hidden
          className="mx-auto mt-8 block h-px w-6 bg-gold/60"
        />

        <p
          data-testid="magnificat-canto"
          aria-label={CANTO}
          className="mx-auto mt-12 max-w-3xl text-center font-display italic leading-relaxed text-pretty text-xl md:text-2xl text-gold/85"
        >
          <span data-testid="magnificat-visible">{visibleText}</span>
          <span
            data-testid="magnificat-hidden"
            aria-hidden="true"
            className="text-transparent"
          >
            {hiddenText}
          </span>
        </p>
      </Container>
    </section>
  );
}
