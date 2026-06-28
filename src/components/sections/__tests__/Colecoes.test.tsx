import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { COLECOES, Colecoes } from "@/components/sections/Colecoes";

describe("Colecoes", () => {
  it("renderiza os 6 cards com títulos corretos", () => {
    render(<Colecoes />);
    expect(COLECOES).toHaveLength(6);
    for (const item of COLECOES) {
      expect(
        screen.getByRole("heading", { level: 3, name: item.title }),
      ).toBeInTheDocument();
    }
  });

  // SHOW_WHATSAPP=false: cards viram vitrine sem link. Reverter ao reabilitar o WhatsApp.
  it("com WhatsApp oculto, os cards não são links nem mencionam WhatsApp", () => {
    render(<Colecoes />);
    for (const item of COLECOES) {
      const card = screen.getByTestId(`collection-card-${item.id}`);
      expect(card.querySelector("a")).toBeNull();
    }
    expect(screen.queryByText(/solicitar via whatsapp/i)).toBeNull();
    expect(document.querySelector('a[href^="https://wa.me/"]')).toBeNull();
  });
});
