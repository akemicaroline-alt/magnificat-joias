"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { env } from "@/lib/env";
import { SHOW_WHATSAPP } from "@/lib/features";
import { buildCollectionMessage, buildWhatsappUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

export type CollectionItem = {
  id: string;
  roman: string;
  title: string;
  description: string;
  gradient: string;
  ornament: "rosary" | "cross" | "medal" | "ring" | "angel" | "custom";
};

type Props = {
  item: CollectionItem;
  index: number;
};

const ease = [0.22, 1, 0.36, 1] as const;

function Ornament({ kind }: { kind: CollectionItem["ornament"] }) {
  const stroke = "#f5f0e8";
  const common = "opacity-35 mix-blend-screen";

  switch (kind) {
    case "rosary":
      return (
        <svg
          viewBox="0 0 200 240"
          aria-hidden
          className={cn("h-full w-full", common)}
        >
          <g fill="none" stroke={stroke} strokeWidth="0.6">
            <ellipse cx="100" cy="100" rx="56" ry="58" />
            {Array.from({ length: 18 }).map((_, i) => {
              const angle = (i / 18) * Math.PI * 2;
              const x = 100 + Math.cos(angle) * 56;
              const y = 100 + Math.sin(angle) * 58;
              return <circle key={i} cx={x} cy={y} r="2.2" fill={stroke} />;
            })}
            <line x1="100" y1="158" x2="100" y2="212" />
            <line x1="86" y1="195" x2="114" y2="195" />
          </g>
        </svg>
      );
    case "cross":
      return (
        <svg
          viewBox="0 0 200 240"
          aria-hidden
          className={cn("h-full w-full", common)}
        >
          <g fill="none" stroke={stroke} strokeWidth="0.7">
            <line x1="100" y1="40" x2="100" y2="200" />
            <line x1="60" y1="100" x2="140" y2="100" />
            <circle cx="100" cy="100" r="9" />
            <circle cx="100" cy="40" r="3" fill={stroke} />
            <circle cx="100" cy="200" r="3" fill={stroke} />
          </g>
        </svg>
      );
    case "medal":
      return (
        <svg
          viewBox="0 0 200 240"
          aria-hidden
          className={cn("h-full w-full", common)}
        >
          <g fill="none" stroke={stroke} strokeWidth="0.6">
            <circle cx="100" cy="110" r="52" />
            <circle cx="100" cy="110" r="42" />
            <circle cx="100" cy="110" r="6" fill={stroke} />
            <path d="M70 80 Q100 60 130 80" />
            <line x1="100" y1="58" x2="100" y2="34" />
          </g>
        </svg>
      );
    case "ring":
      return (
        <svg
          viewBox="0 0 200 240"
          aria-hidden
          className={cn("h-full w-full", common)}
        >
          <g fill="none" stroke={stroke} strokeWidth="0.7">
            <ellipse cx="80" cy="130" rx="40" ry="38" />
            <ellipse cx="120" cy="130" rx="40" ry="38" />
            <path d="M100 92 L105 100 L100 108 L95 100 Z" fill={stroke} />
          </g>
        </svg>
      );
    case "angel":
      return (
        <svg
          viewBox="0 0 200 240"
          aria-hidden
          className={cn("h-full w-full", common)}
        >
          <g fill="none" stroke={stroke} strokeWidth="0.6">
            <circle cx="100" cy="90" r="14" />
            <path d="M100 104 Q60 124 50 170 Q100 150 150 170 Q140 124 100 104" />
            <path d="M62 132 Q40 110 28 90" />
            <path d="M138 132 Q160 110 172 90" />
          </g>
        </svg>
      );
    case "custom":
      return (
        <svg
          viewBox="0 0 200 240"
          aria-hidden
          className={cn("h-full w-full", common)}
        >
          <g fill="none" stroke={stroke} strokeWidth="0.6">
            <path d="M100 60 L160 110 L100 200 L40 110 Z" />
            <path d="M70 110 L100 88 L130 110 L100 132 Z" />
            <circle cx="100" cy="110" r="3" fill={stroke} />
          </g>
        </svg>
      );
  }
}

export function CollectionCard({ item, index }: Props) {
  const href = buildWhatsappUrl({
    numero: env.whatsappNumber,
    mensagem: buildCollectionMessage(item.title),
  });

  const conteudo = (
    <>
      <div
        className={cn(
          "relative aspect-[4/5] overflow-hidden noise-overlay",
          item.gradient,
        )}
      >
        <div className="absolute inset-0 flex items-center justify-center p-12 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105">
          <Ornament kind={item.ornament} />
        </div>
        <div className="absolute inset-x-6 bottom-6 flex items-center justify-between">
          <span className="eyebrow text-gold/80">{item.roman}</span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-text-muted">
            edição 2025
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-5 p-8">
        <h3 className="display-s text-text">{item.title}</h3>
        <p className="text-sm font-light leading-relaxed text-text-muted">
          {item.description}
        </p>
        <span className="divider-gold" />
        {SHOW_WHATSAPP && (
          <span className="mt-auto inline-flex items-center gap-2 text-[12px] font-normal uppercase tracking-[0.2em] text-gold transition-colors duration-300 group-hover:text-gold-light">
            Solicitar via WhatsApp
            <ArrowUpRight
              size={14}
              className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </span>
        )}
      </div>
    </>
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease, delay: index * 0.08 }}
      data-testid={`collection-card-${item.id}`}
      className="group relative flex flex-col border border-border bg-bg-elevated transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-gold hover:shadow-[0_30px_60px_-30px_rgba(200,169,110,0.35)]"
    >
      {SHOW_WHATSAPP ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Solicitar informações sobre ${item.title} via WhatsApp`}
          className="flex h-full flex-col"
        >
          {conteudo}
        </a>
      ) : (
        <div className="flex h-full flex-col">{conteudo}</div>
      )}
    </motion.article>
  );
}
