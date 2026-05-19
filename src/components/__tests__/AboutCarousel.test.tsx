import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { AboutCarousel } from "@/components/AboutCarousel";

describe("AboutCarousel", () => {
  it("renderiza a primeira imagem por padrão", () => {
    render(<AboutCarousel />);
    expect(
      screen.getByAltText(
        /Ourives examinando peça com lupa de joalheiro no ateliê Magnificat/i,
      ),
    ).toBeInTheDocument();
  });

  it("renderiza 5 dots de paginação com aria-label específico", () => {
    render(<AboutCarousel />);
    const tablist = screen.getByRole("tablist", {
      name: /selecionar slide do carrossel/i,
    });
    const tabs = within(tablist).getAllByRole("tab");
    expect(tabs).toHaveLength(5);
    for (let i = 0; i < 5; i++) {
      expect(tabs[i].getAttribute("aria-label")).toBe(`Ir para slide ${i + 1}`);
    }
  });

  it("clique no dot do slide 3 muda a imagem visível para a terceira", async () => {
    const user = userEvent.setup();
    render(<AboutCarousel />);
    const dot3 = screen.getByRole("tab", { name: /ir para slide 3/i });
    await user.click(dot3);
    expect(dot3.getAttribute("aria-current")).toBe("true");
    expect(
      await screen.findByAltText(/Aliança em fase de acabamento no ateliê/i),
    ).toBeInTheDocument();
  });

  it("clique no dot do slide 5 mostra a aliança em ouro 18k com gravação personalizada", async () => {
    const user = userEvent.setup();
    render(<AboutCarousel />);
    const dot5 = screen.getByRole("tab", { name: /ir para slide 5/i });
    await user.click(dot5);
    expect(dot5.getAttribute("aria-current")).toBe("true");
    expect(
      await screen.findByAltText(
        /Par de alianças em ouro 18k com gravação personalizada finalizado para entrega/i,
      ),
    ).toBeInTheDocument();
  });

  it("aplica aria-roledescription='carousel' no container", () => {
    render(<AboutCarousel />);
    const root = screen
      .getByAltText(
        /Ourives examinando peça com lupa de joalheiro no ateliê Magnificat/i,
      )
      .closest('[aria-roledescription="carousel"]');
    expect(root).not.toBeNull();
    expect(root!.getAttribute("aria-label")).toBe("Fotos do ateliê Magnificat");
  });

  it("imagens são marcadas como não-arrastáveis (draggable=false)", () => {
    render(<AboutCarousel />);
    const img = screen.getByAltText(
      /Ourives examinando peça com lupa de joalheiro no ateliê Magnificat/i,
    ) as HTMLImageElement;
    expect(img.getAttribute("draggable")).toBe("false");
  });
});
