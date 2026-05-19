"use client";

import { motion } from "framer-motion";

import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";

const ease = [0.22, 1, 0.36, 1] as const;

export function Sobre() {
  return (
    <section
      id="sobre"
      aria-labelledby="sobre-title"
      className="relative py-32 md:py-40"
    >
      <Container className="grid gap-16 md:grid-cols-12 md:gap-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease }}
          className="relative md:col-span-5"
        >
          <div className="relative aspect-[4/5] w-full">
            <span
              aria-hidden
              className="absolute inset-0 -translate-x-2 -translate-y-2 border border-gold/40"
            />
            <div
              role="img"
              aria-label="Detalhe ornamental de joia sacra"
              className="relative h-full w-full overflow-hidden noise-overlay bg-[linear-gradient(180deg,_#1d1813_0%,_#8a7448_45%,_#c8a96e_60%,_#1d1813_100%)]"
            >
              <svg
                viewBox="0 0 200 250"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
                className="absolute inset-0 h-full w-full opacity-25 mix-blend-screen"
              >
                <g fill="none" stroke="#f5f0e8" strokeWidth="0.5">
                  <circle cx="100" cy="80" r="32" />
                  <circle cx="100" cy="80" r="22" />
                  <line x1="100" y1="118" x2="100" y2="210" />
                  <line x1="78" y1="160" x2="122" y2="160" />
                </g>
              </svg>
            </div>
          </div>
        </motion.div>

        <div className="md:col-span-7 flex flex-col gap-8">
          <SectionHeader
            align="left"
            eyebrow="Nossa história"
            title="Tradição em cada detalhe"
          />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease, delay: 0.15 }}
            className="flex flex-col gap-6"
          >
            <p className="body-l text-text-muted text-pretty">
              A Magnificat nasce de uma herança familiar: a ourivesaria
              ensinada de geração em geração, sempre acompanhada do terço
              ao lado da bancada. Cada peça que assinamos carrega esse
              gesto silencioso de quem trabalha rezando.
            </p>
            <p className="body-l text-text-muted text-pretty">
              Trabalhamos exclusivamente com prata 950 e ouro 18k,
              materiais nobres que respeitam a importância dos símbolos
              que representam. Da escolha das pedras ao acabamento final,
              cada etapa é cuidada manualmente em nosso ateliê em
              São Paulo.
            </p>
            <p className="body-l text-text-muted text-pretty">
              Nosso compromisso é criar joias que ultrapassem gerações —
              objetos de fé que se tornam herança. Peças para serem
              guardadas, lembradas e transmitidas com a mesma devoção
              com que foram concebidas.
            </p>

            <div className="mt-6 flex items-center gap-4">
              <span className="divider-gold" />
              <span className="font-display italic text-gold text-xl">
                — Magnificat Joias
              </span>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
