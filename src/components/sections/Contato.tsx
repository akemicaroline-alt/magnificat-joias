"use client";

import { useState, type FormEvent } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { env } from "@/lib/env";
import { buildContactMessage, buildWhatsappUrl } from "@/lib/whatsapp";

type FormState = {
  nome: string;
  email: string;
  mensagem: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

export function Contato() {
  const [values, setValues] = useState<FormState>({
    nome: "",
    email: "",
    mensagem: "",
  });
  const [errors, setErrors] = useState<Errors>({});

  function validate(): Errors {
    const next: Errors = {};
    if (!values.nome.trim()) next.nome = "Informe seu nome.";
    if (!values.email.trim()) next.email = "Informe seu e-mail.";
    else if (!EMAIL_RE.test(values.email.trim()))
      next.email = "E-mail inválido.";
    if (!values.mensagem.trim()) next.mensagem = "Escreva uma mensagem.";
    return next;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const mensagem = buildContactMessage(values);
    const url = buildWhatsappUrl({
      numero: env.whatsappNumber,
      mensagem,
    });
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <section
      id="contato"
      aria-labelledby="contato-title"
      className="relative py-32 md:py-40"
    >
      <Container className="grid gap-16 md:grid-cols-12 md:gap-20">
        <div className="md:col-span-5 flex flex-col gap-10">
          <SectionHeader
            align="left"
            roman="V"
            eyebrow="Contato"
            title="Vamos conversar"
            description="Estamos disponíveis para conversar sobre encomendas, prazos, bênção e personalizações. Cada peça é única — seu pedido também."
          />
          <ul className="flex flex-col gap-5">
            <li className="flex items-start gap-4">
              <Mail size={18} className="mt-1 text-gold" aria-hidden />
              <div>
                <p className="eyebrow text-text-faded mb-1">E-mail</p>
                <a
                  href={`mailto:${env.contactEmail}`}
                  className="body text-text transition-colors duration-300 hover:text-gold"
                >
                  {env.contactEmail}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <Phone size={18} className="mt-1 text-gold" aria-hidden />
              <div>
                <p className="eyebrow text-text-faded mb-1">WhatsApp</p>
                <p className="body text-text">
                  {formatPhone(env.whatsappNumber)}
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <Clock size={18} className="mt-1 text-gold" aria-hidden />
              <div>
                <p className="eyebrow text-text-faded mb-1">Horário</p>
                <p className="body text-text">Seg–Sex, 9h às 18h</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <MapPin size={18} className="mt-1 text-gold" aria-hidden />
              <div>
                <p className="eyebrow text-text-faded mb-1">Atendimento</p>
                <p className="body text-text">Atendemos todo o Brasil</p>
              </div>
            </li>
          </ul>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          aria-label="Formulário de contato Magnificat Joias"
          className="md:col-span-7 flex flex-col gap-10 border border-border bg-bg-elevated p-10 md:p-14 noise-overlay"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="nome" className="eyebrow text-gold">
              Nome
            </label>
            <input
              id="nome"
              name="nome"
              type="text"
              autoComplete="name"
              value={values.nome}
              onChange={(e) =>
                setValues((v) => ({ ...v, nome: e.target.value }))
              }
              aria-invalid={Boolean(errors.nome)}
              aria-describedby={errors.nome ? "nome-error" : undefined}
              className="border-b border-border bg-transparent py-3 font-display text-2xl font-light text-text outline-none transition-colors duration-300 focus:border-gold"
              placeholder="Como devemos chamá-la?"
            />
            {errors.nome ? (
              <span id="nome-error" role="alert" className="mt-2 text-xs text-red-400">
                {errors.nome}
              </span>
            ) : null}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="eyebrow text-gold">
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={(e) =>
                setValues((v) => ({ ...v, email: e.target.value }))
              }
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              className="border-b border-border bg-transparent py-3 font-display text-2xl font-light text-text outline-none transition-colors duration-300 focus:border-gold"
              placeholder="seu@email.com"
            />
            {errors.email ? (
              <span id="email-error" role="alert" className="mt-2 text-xs text-red-400">
                {errors.email}
              </span>
            ) : null}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="mensagem" className="eyebrow text-gold">
              Mensagem
            </label>
            <textarea
              id="mensagem"
              name="mensagem"
              rows={4}
              value={values.mensagem}
              onChange={(e) =>
                setValues((v) => ({ ...v, mensagem: e.target.value }))
              }
              aria-invalid={Boolean(errors.mensagem)}
              aria-describedby={
                errors.mensagem ? "mensagem-error" : undefined
              }
              className="resize-none border-b border-border bg-transparent py-3 font-sans text-base font-light text-text outline-none transition-colors duration-300 focus:border-gold"
              placeholder="Conte-nos sobre a peça que tem em mente..."
            />
            {errors.mensagem ? (
              <span
                id="mensagem-error"
                role="alert"
                className="mt-2 text-xs text-red-400"
              >
                {errors.mensagem}
              </span>
            ) : null}
          </div>

          <button
            type="submit"
            className="group inline-flex items-center justify-center gap-3 bg-gold px-8 py-4 text-[13px] font-normal uppercase tracking-[0.22em] text-bg-deep transition-all duration-500 hover:bg-gold-light"
          >
            <span>Enviar via WhatsApp</span>
            <span
              aria-hidden
              className="block h-px w-6 bg-bg-deep transition-all duration-500 group-hover:w-12"
            />
          </button>
          <p className="text-[10px] uppercase tracking-[0.3em] text-text-faded">
            Ao enviar, abriremos uma conversa direta no WhatsApp com os dados informados.
          </p>
        </form>
      </Container>
    </section>
  );
}
