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

  it("cada card tem link para WhatsApp com mensagem específica daquela coleção", () => {
    render(<Colecoes />);
    for (const item of COLECOES) {
      const card = screen.getByTestId(`collection-card-${item.id}`);
      const link = card.querySelector("a");
      expect(link).not.toBeNull();
      const href = link!.getAttribute("href") ?? "";
      expect(href).toMatch(/^https:\/\/wa\.me\/5511999156462\?text=/);
      expect(href).toContain(encodeURIComponent(`"${item.title}"`));
      expect(link!.getAttribute("target")).toBe("_blank");
      expect(link!.getAttribute("rel")).toBe("noopener noreferrer");
    }
  });
});
