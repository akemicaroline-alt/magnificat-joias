"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

export type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
};

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  const isCenter = align === "center";
  return (
    <motion.header
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      className={cn(
        "flex w-full flex-col gap-6",
        isCenter ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? (
        <motion.span variants={fade} className="eyebrow text-gold">
          {eyebrow}
        </motion.span>
      ) : null}
      <motion.h2
        variants={fade}
        className={cn(
          "display-l text-text text-balance",
          isCenter ? "max-w-3xl" : "max-w-2xl",
        )}
      >
        {title}
      </motion.h2>
      <motion.span
        variants={fade}
        className={cn("divider-gold", isCenter ? "mx-auto" : "")}
      />
      {description ? (
        <motion.p
          variants={fade}
          className={cn(
            "body-l text-text-muted text-pretty",
            isCenter ? "max-w-2xl" : "max-w-xl",
          )}
        >
          {description}
        </motion.p>
      ) : null}
    </motion.header>
  );
}
