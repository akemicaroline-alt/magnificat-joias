"use client";

import Image from "next/image";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import { cn } from "@/lib/cn";

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => undefined;
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type Slide = { src: string; alt: string };

const SLIDES: Slide[] = [
  {
    src: "/sobre-1.jpg",
    alt: "Ourives examinando peça com lupa de joalheiro no ateliê Magnificat",
  },
  {
    src: "/sobre-2.jpg",
    alt: "Polimento manual de joia com motor de precisão",
  },
  {
    src: "/sobre-3.jpg",
    alt: "Aliança em fase de acabamento no ateliê",
  },
  {
    src: "/sobre-4.jpg",
    alt: "Par de alianças em ouro 18k finalizadas",
  },
];

const AUTOPLAY_MS = 10000;
const INTERACTION_PAUSE_MS = 6000;
const ease = [0.22, 1, 0.36, 1] as const;

export function AboutCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    () => false,
  );
  const interactionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  useEffect(() => {
    if (reduced || paused) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [reduced, paused]);

  useEffect(() => {
    return () => {
      if (interactionTimerRef.current) {
        clearTimeout(interactionTimerRef.current);
      }
    };
  }, []);

  function pauseAfterInteraction() {
    setPaused(true);
    if (interactionTimerRef.current) clearTimeout(interactionTimerRef.current);
    interactionTimerRef.current = setTimeout(() => {
      interactionTimerRef.current = null;
      setPaused(false);
    }, INTERACTION_PAUSE_MS);
  }

  function goTo(target: number) {
    const next = ((target % SLIDES.length) + SLIDES.length) % SLIDES.length;
    setIndex(next);
    pauseAfterInteraction();
  }

  function handleDragEnd(
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) {
    if (info.offset.x < -50) goTo(index + 1);
    else if (info.offset.x > 50) goTo(index - 1);
  }

  function handleMouseEnter() {
    setPaused(true);
  }

  function handleMouseLeave() {
    if (!interactionTimerRef.current) setPaused(false);
  }

  const slide = SLIDES[index];

  return (
    <div
      aria-roledescription="carousel"
      aria-label="Fotos do ateliê Magnificat"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full"
    >
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        className="relative aspect-square w-full overflow-hidden rounded-sm ring-1 ring-gold/30 cursor-grab active:cursor-grabbing"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={
              reduced ? { duration: 0 } : { duration: 0.7, ease }
            }
            className="absolute inset-0"
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="(max-width: 768px) 90vw, 50vw"
              priority={index === 0}
              draggable={false}
              className="select-none object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <div
        role="tablist"
        aria-label="Selecionar slide do carrossel"
        className="mt-6 flex items-center justify-center gap-3"
      >
        {SLIDES.map((_, i) => {
          const active = i === index;
          return (
            <button
              key={i}
              type="button"
              role="tab"
              aria-label={`Ir para slide ${i + 1}`}
              aria-selected={active}
              aria-current={active ? "true" : undefined}
              onClick={() => goTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                active ? "w-8 bg-gold" : "w-1.5 bg-gold/30 hover:bg-gold/60",
              )}
            />
          );
        })}
      </div>
    </div>
  );
}
