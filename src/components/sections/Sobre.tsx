"use client";

import { motion } from "framer-motion";

import { AboutCarousel } from "@/components/AboutCarousel";
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
          <AboutCarousel />
        </motion.div>

        <div className="md:col-span-7 flex flex-col gap-8">
          <SectionHeader align="left" title="Tradição em cada detalhe" />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease, delay: 0.15 }}
            className="flex flex-col gap-6"
            data-testid="sobre-conteudo"
          >
            <p className="body-l text-text-muted text-pretty">
              A Magnificat nasceu de uma herança familiar: a ourivesaria que
              me foi transmitida de geração em geração, sempre guiada pela
              criatividade que floresce na oração. Cada peça que assino
              carrega o gesto silencioso de quem trabalha com devoção.
            </p>
            <p className="body-l text-text-muted text-pretty">
              Trabalho exclusivamente com metais nobres, como ouro 750/18k
              certificado — materiais que honram a importância dos símbolos
              que representam. Da escolha das gemas ao acabamento final,
              cada etapa é realizada à mão, com cuidado, em meu ateliê em
              São Paulo.
            </p>
            <p className="body-l text-text-muted text-pretty">
              Meu compromisso é criar joias que ultrapassem gerações —
              objetos de fé que se tornam herança. Peças feitas para serem
              guardadas, lembradas e transmitidas com a mesma devoção com
              que foram concebidas.
            </p>

            <div className="mt-6 flex items-center gap-4">
              <span className="divider-gold" />
              <span
                data-testid="sobre-assinatura"
                className="font-display italic text-gold text-xl"
              >
                — Akemi
              </span>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
