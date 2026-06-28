import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { Hero } from "@/components/sections/Hero";

describe("Hero", () => {
  it("renderiza headline, descrição e o CTA de coleções (WhatsApp oculto)", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /joias que celebram/i,
    );
    expect(screen.getByText(/ouro 18k/i)).toBeInTheDocument();
    expect(screen.getByTestId("hero-cta-secondary")).toBeInTheDocument();
    // SHOW_WHATSAPP=false: CTA de WhatsApp ausente. Reverter ao reabilitar.
    expect(screen.queryByTestId("hero-cta-primary")).toBeNull();
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

  it("renderiza a imagem de Nossa Senhora de Guadalupe com alt descritivo e dimensões nativas 450×1062", () => {
    render(<Hero />);
    const img = screen.getByAltText(
      /Nossa Senhora de Guadalupe, padroeira da coleção 2026/i,
    ) as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.getAttribute("src")).toBe("/hero-guadalupe.png");
    expect(img.getAttribute("width")).toBe("450");
    expect(img.getAttribute("height")).toBe("1062");
  });

  it("não exibe o CTA do WhatsApp enquanto SHOW_WHATSAPP=false", () => {
    render(<Hero />);
    expect(screen.queryByTestId("hero-cta-primary")).toBeNull();
    expect(screen.queryByText(/falar no whatsapp/i)).toBeNull();
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
