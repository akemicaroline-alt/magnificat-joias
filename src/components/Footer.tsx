import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { Container } from "@/components/Container";
import { Logo } from "@/components/Logo";
import { Facebook } from "@/components/icons/Facebook";
import { Instagram } from "@/components/icons/Instagram";
import { env } from "@/lib/env";
import { SHOW_WHATSAPP } from "@/lib/features";

const navColumns = [
  { href: "#inicio", label: "Início" },
  { href: "#sobre", label: "Sobre" },
  { href: "#colecoes", label: "Coleções" },
  { href: "#contato", label: "Contato" },
];

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

export function Footer() {
  return (
    <footer className="relative bg-bg-elevated noise-overlay">
      <Container as="div" className="py-24">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-4 flex flex-col gap-6">
            <Logo variant="light" size="lg" />
            <p className="body text-text-muted max-w-xs text-pretty">
              Joias que celebram a fé desde 2025. Peças exclusivas em ouro 18k,
              criadas com devoção em São Paulo.
            </p>
            <span className="divider-gold" />
          </div>

          <nav aria-label="Mapa do site" className="md:col-span-2">
            <p className="eyebrow text-gold mb-6">Navegação</p>
            <ul className="flex flex-col gap-3">
              {navColumns.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-sans text-sm font-light text-text-muted transition-colors duration-300 hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="eyebrow text-gold mb-6">Contato</p>
            <ul className="flex flex-col gap-4 text-sm font-light text-text-muted">
              <li className="flex items-start gap-3">
                <Mail size={16} className="mt-1 text-gold-dark" aria-hidden />
                <a
                  href={`mailto:${env.contactEmail}`}
                  className="transition-colors hover:text-gold"
                >
                  {env.contactEmail}
                </a>
              </li>
              {SHOW_WHATSAPP && (
                <li className="flex items-start gap-3">
                  <Phone size={16} className="mt-1 text-gold-dark" aria-hidden />
                  <span>{formatPhone(env.whatsappNumber)}</span>
                </li>
              )}
              <li className="flex items-start gap-3">
                <Clock size={16} className="mt-1 text-gold-dark" aria-hidden />
                <span>Atendimento Seg–Sáb, 9h às 18h</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-1 text-gold-dark" aria-hidden />
                <span>São Paulo · entrega para todo o Brasil</span>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow text-gold mb-6">Redes</p>
            <ul className="flex items-center gap-4">
              <li>
                <a
                  href="https://www.instagram.com/magnificat_joias"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram da Magnificat Joias"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-gold transition-all duration-300 hover:border-gold hover:text-gold-light"
                >
                  <Instagram size={18} />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  aria-label="Facebook da Magnificat Joias"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-gold transition-all duration-300 hover:border-gold hover:text-gold-light"
                >
                  <Facebook size={18} />
                </a>
              </li>
            </ul>
            <p className="mt-8 font-display italic text-text-muted text-sm">
              “Magnificat anima mea Dominum.”
            </p>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center gap-6">
          <span className="h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="ornament text-gold-dark text-[10px] uppercase tracking-[0.5em]">
              Joias com fé
            </span>
            <p className="text-xs font-light text-text-faded">
              © 2025 Magnificat Joias. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
