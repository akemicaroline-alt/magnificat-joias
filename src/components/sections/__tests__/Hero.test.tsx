import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { Hero } from "@/components/sections/Hero";

describe("Hero", () => {
  it("renderiza headline, descrição e CTAs", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /joias que celebram/i,
    );
    expect(screen.getByText(/ouro 18k/i)).toBeInTheDocument();
    expect(screen.getByTestId("hero-cta-primary")).toBeInTheDocument();
    expect(screen.getByTestId("hero-cta-secondary")).toBeInTheDocument();
  });

  it("eyebrow agora é 'Coleção 2026 · Guadalupe' (não mais 2025 · São Paulo)", () => {
    render(<Hero />);
    expect(screen.getByText(/coleção 2026 · guadalupe/i)).toBeInTheDocument();
    expect(screen.queryByText(/coleção 2025 · são paulo/i)).toBeNull();
  });

  it("não exibe mais 'ANNO DOMINI' nem 'prata 950'", () => {
    render(<Hero />);
    expect(screen.queryByText(/anno domini/i)).toBeNull();
    expect(screen.queryByText(/prata 950/i)).toBeNull();
  });

  it("renderiza a imagem de Nossa Senhora de Guadalupe com alt descritivo e dimensões nativas 636×1051", () => {
    render(<Hero />);
    const img = screen.getByAltText(
      /Nossa Senhora de Guadalupe, padroeira da coleção 2026/i,
    ) as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.getAttribute("src")).toBe("/hero-guadalupe.png");
    expect(img.getAttribute("width")).toBe("636");
    expect(img.getAttribute("height")).toBe("1051");
  });

  it("aplica mix-blend-lighten na imagem da Guadalupe para integrar com o fundo", () => {
    render(<Hero />);
    const img = screen.getByAltText(
      /Nossa Senhora de Guadalupe, padroeira da coleção 2026/i,
    ) as HTMLImageElement;
    expect(img.className).toContain("mix-blend-lighten");
  });

  it("CTA primário aponta para wa.me com número configurado", () => {
    render(<Hero />);
    const cta = screen.getByTestId("hero-cta-primary");
    expect(cta.getAttribute("href")).toMatch(/^https:\/\/wa\.me\/5511999156462/);
    expect(cta.getAttribute("target")).toBe("_blank");
    expect(cta.getAttribute("rel")).toBe("noopener noreferrer");
  });

  it("CTA secundário tem href #colecoes", () => {
    render(<Hero />);
    const cta = screen.getByTestId("hero-cta-secondary");
    expect(cta.getAttribute("href")).toBe("#colecoes");
  });

  it("mantém o indicador 'role para descobrir'", () => {
    render(<Hero />);
    expect(screen.getByText(/role para descobrir/i)).toBeInTheDocument();
  });
});
