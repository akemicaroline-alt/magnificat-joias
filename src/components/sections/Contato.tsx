"use client";

import { Clock, Mail, MapPin, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { env } from "@/lib/env";
import { buildWhatsappUrl } from "@/lib/whatsapp";

const CTA_MENSAGEM = "Olá! Gostaria de conhecer as joias da Magnificat.";

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 13) {
    return `+${digits.slice(0, 2)} (${digits.slice(2, 4)}) ${digits.slice(4, 9)}-${digits.slice(9)}`;
  }
  if (digits.length === 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }
  return raw;
}

type ContactItem = {
  icon: LucideIcon;
  eyebrow: string;
  value: string;
  href?: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function Contato() {
  const ctaHref = buildWhatsappUrl({
    numero: env.whatsappNumber,
    mensagem: CTA_MENSAGEM,
  });

  const items: ContactItem[] = [
    {
      icon: Mail,
      eyebrow: "E-mail",
      value: env.contactEmail,
      href: `mailto:${env.contactEmail}`,
    },
    {
      icon: Phone,
      eyebrow: "WhatsApp",
      value: formatPhone(env.whatsappNumber),
    },
    {
      icon: Clock,
      eyebrow: "Horário",
      value: "Seg–Sáb, 9h às 18h",
    },
    {
      icon: MapPin,
      eyebrow: "Atendimento",
      value: "Atendemos todo o Brasil",
    },
  ];

  return (
    <section
      id="contato"
      aria-labelledby="contato-title"
      className="relative py-32 md:py-40"
    >
      <Container className="flex flex-col items-center gap-20">
        <SectionHeader
          align="center"
          roman="V"
          eyebrow="Contato"
          title="Vamos conversar"
          description="Estamos disponíveis para encomendas, prazos, bênção e personalizações. Cada peça é única — seu pedido também."
        />

        <ul
          aria-label="Canais de atendimento"
          className="grid w-full gap-12 sm:grid-cols-2 lg:grid-cols-4"
        >
          {items.map((item, index) => {
            const Icon = item.icon;
            const content = (
              <>
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/35 text-gold transition-colors duration-500 group-hover:border-gold">
                  <Icon size={20} strokeWidth={1.3} />
                </span>
                <span className="h-px w-8 bg-gold/40" />
                <span className="eyebrow text-text-faded">{item.eyebrow}</span>
                <span className="body text-text text-pretty">{item.value}</span>
              </>
            );

            return (
              <motion.li
                key={item.eyebrow}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, ease, delay: index * 0.08 }}
                data-testid={`contato-item-${item.eyebrow.toLowerCase()}`}
              >
                {item.href ? (
                  <a
                    href={item.href}
                    className="group flex flex-col items-center text-center gap-3 transition-colors duration-300 hover:text-gold"
                  >
                    {content}
                  </a>
                ) : (
                  <div className="group flex flex-col items-center text-center gap-3">
                    {content}
                  </div>
                )}
              </motion.li>
            );
          })}
        </ul>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease }}
          className="flex flex-col items-center gap-6"
        >
          <span className="divider-gold" />
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="contato-cta-whatsapp"
            className="group inline-flex items-center justify-center gap-3 bg-gold px-10 py-5 text-[13px] font-normal uppercase tracking-[0.22em] text-bg-deep transition-all duration-500 hover:bg-gold-light"
          >
            <span>Falar no WhatsApp</span>
            <span
              aria-hidden
              className="block h-px w-8 bg-bg-deep transition-all duration-500 group-hover:w-14"
            />
          </a>
          <p className="text-[10px] uppercase tracking-[0.3em] text-text-faded">
            Atendimento direto, sem formulário
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
