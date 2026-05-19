"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { Logo } from "@/components/Logo";
import { cn } from "@/lib/cn";

type NavItem = { href: string; label: string };

const NAV: NavItem[] = [
  { href: "#inicio", label: "Início" },
  { href: "#sobre", label: "Sobre" },
  { href: "#colecoes", label: "Coleções" },
  { href: "#contato", label: "Contato" },
];

function NavLink({
  href,
  children,
  onClick,
  className,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group relative inline-flex items-center gap-2 font-sans text-[11px] font-light uppercase tracking-[0.2em] text-text-muted transition-colors duration-500 hover:text-gold",
        className,
      )}
    >
      <span className="relative">
        {children}
        <span className="pointer-events-none absolute -bottom-1 left-0 h-[1px] w-0 bg-gold transition-all duration-500 ease-out group-hover:w-full" />
      </span>
    </Link>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 h-20 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          scrolled
            ? "bg-bg-deep/80 backdrop-blur-lg border-b border-border"
            : "bg-transparent",
        )}
      >
        <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-6 md:px-12">
          <Link href="#inicio" aria-label="Magnificat Joias — Início" className="relative">
            <Logo variant="light" size="md" priority />
          </Link>

          <nav aria-label="Navegação principal" className="hidden md:block">
            <ul className="flex items-center gap-10">
              {NAV.map((item) => (
                <li key={item.href}>
                  <NavLink href={item.href}>{item.label}</NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-gold transition-colors duration-300 hover:border-gold md:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            key="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col bg-bg-deep noise-overlay md:hidden"
          >
            <div className="h-20" />
            <nav aria-label="Navegação mobile" className="flex flex-1 flex-col justify-center px-8">
              <ul className="flex flex-col gap-8">
                {NAV.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.15 + i * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="display-m text-text transition-colors duration-300 hover:text-gold"
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-16 flex items-center gap-3">
                <span className="divider-gold" />
                <span className="eyebrow">2025 · São Paulo</span>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
