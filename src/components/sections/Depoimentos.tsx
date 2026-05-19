"use client";

import { useRef, useState } from "react";
import { Quote } from "lucide-react";
import { motion } from "framer-motion";

import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { cn } from "@/lib/cn";

type Depoimento = {
  texto: string;
  nome: string;
  cidade: string;
};

const DEPOIMENTOS: Depoimento[] = [
  {
    texto:
      "Encomendei o terço da minha mãe para o aniversário de oitenta anos. Quando ela abriu a caixa, chorou. Sentiu, antes mesmo de tocar, o cuidado de quem fez.",
    nome: "Mariana A.",
    cidade: "São Paulo · SP",
  },
  {
    texto:
      "A medalha de Nossa Senhora chegou em embalagem digna de um pequeno relicário. É uma joia que se sente abençoada no peito todos os dias.",
    nome: "Lúcia C.",
    cidade: "Belo Horizonte · MG",
  },
  {
    texto:
      "Atendimento impecável do começo ao fim. Receber a peça abençoada foi o detalhe que tornou tudo inesquecível.",
    nome: "Beatriz R.",
    cidade: "Curitiba · PR",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function Depoimentos() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  const goTo = (i: number) => {
    const node = scrollerRef.current?.children[i] as HTMLElement | undefined;
    node?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    setActive(i);
  };

  return (
    <section
      aria-labelledby="depoimentos-title"
      className="relative py-32 md:py-40 overflow-hidden"
    >
      <Container>
        <SectionHeader
          roman="IV"
          eyebrow="Devotas"
          title="Histórias de fé"
        />
      </Container>

      <div
        ref={scrollerRef}
        onScroll={(e) => {
          const el = e.currentTarget;
          const center = el.scrollLeft + el.clientWidth / 2;
          let bestIdx = 0;
          let bestDist = Infinity;
          Array.from(el.children).forEach((child, i) => {
            const c = child as HTMLElement;
            const cCenter = c.offsetLeft + c.clientWidth / 2;
            const dist = Math.abs(center - cCenter);
            if (dist < bestDist) {
              bestDist = dist;
              bestIdx = i;
            }
          });
          setActive(bestIdx);
        }}
        className="mt-20 flex gap-6 overflow-x-auto scroll-snap-x px-6 md:px-12 pb-2"
        aria-label="Carrossel de depoimentos"
      >
        {DEPOIMENTOS.map((d, i) => (
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease, delay: i * 0.1 }}
            className="scroll-snap-center relative flex w-[88vw] max-w-[480px] shrink-0 flex-col gap-8 border border-border bg-bg-elevated p-10"
          >
            <Quote size={36} strokeWidth={1} className="text-gold" aria-hidden />
            <blockquote className="font-display text-2xl italic font-light leading-snug text-text text-pretty">
              {d.texto}
            </blockquote>
            <span className="h-px w-12 bg-gold/40" />
            <figcaption className="eyebrow text-text-muted">
              {d.nome} · <span className="text-text-faded">{d.cidade}</span>
            </figcaption>
          </motion.figure>
        ))}
      </div>

      <Container>
        <div className="mt-10 flex flex-col items-center gap-4">
          <div className="flex items-center gap-3" role="tablist" aria-label="Selecionar depoimento">
            {DEPOIMENTOS.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={active === i}
                aria-label={`Ir para depoimento ${i + 1}`}
                onClick={() => goTo(i)}
                className={cn(
                  "h-1.5 w-1.5 rounded-full transition-all duration-500",
                  active === i ? "bg-gold w-8" : "bg-gold/30",
                )}
              />
            ))}
          </div>
          {/* Depoimentos ilustrativos para fins de demonstração visual. */}
          <p className="text-[10px] uppercase tracking-[0.35em] text-text-faded">
            Exemplos ilustrativos
          </p>
        </div>
      </Container>
    </section>
  );
}
