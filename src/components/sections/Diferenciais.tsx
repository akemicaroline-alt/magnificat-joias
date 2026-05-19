"use client";

import { Gem, Sparkles, Truck } from "lucide-react";
import { motion } from "framer-motion";
import type { ComponentType } from "react";

import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { Ingot } from "@/components/icons/Ingot";

type IconProps = { size?: number; className?: string; strokeWidth?: number };

type Item = {
  icon: ComponentType<IconProps>;
  title: string;
  description: string;
};

const ITEMS: Item[] = [
  {
    icon: Ingot,
    title: "Ouro 18k",
    description: "Ouro 18k certificado, com garantia de procedência em cada peça.",
  },
  {
    icon: Gem,
    title: "Gemas naturais",
    description: "Gemas naturais com lapidações exclusivas.",
  },
  {
    icon: Truck,
    title: "Entrega Brasil",
    description:
      "Embalagens premium e temáticas, conforme a coleção, com entrega para todo o Brasil.",
  },
  {
    icon: Sparkles,
    title: "Atendimento personalizado",
    description: "Consultoria direta via WhatsApp, do primeiro contato à entrega.",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function Diferenciais() {
  return (
    <section
      aria-labelledby="diferenciais-title"
      className="relative py-32 md:py-48 bg-bg-elevated noise-overlay"
    >
      <Container>
        <SectionHeader eyebrow="Diferenciais" title="Por que Magnificat" />

        <div className="mt-20 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.9, ease, delay: index * 0.1 }}
                className="flex flex-col items-center text-center gap-5"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/35 text-gold transition-colors duration-500 hover:border-gold">
                  <Icon size={26} strokeWidth={1.3} />
                </span>
                <span className="h-px w-10 bg-gold/40" />
                <h3 className="display-s text-text">{item.title}</h3>
                <p className="text-sm font-light leading-relaxed text-text-muted">
                  {item.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
