import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Header } from "@/components/Header";

describe("Header", () => {
  it("renderiza todos os links de âncora da navegação principal", () => {
    render(<Header />);
    expect(screen.getAllByRole("link", { name: /início/i }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole("link", { name: /sobre/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /coleções/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /contato/i })).toBeInTheDocument();
  });

  it("alterna aria-expanded ao clicar no botão hambúrguer", async () => {
    const user = userEvent.setup();
    render(<Header />);
    const button = screen.getByRole("button", { name: /abrir menu/i });
    expect(button.getAttribute("aria-expanded")).toBe("false");

    await user.click(button);
    const close = screen.getByRole("button", { name: /fechar menu/i });
    expect(close.getAttribute("aria-expanded")).toBe("true");

    await user.click(close);
    expect(
      screen.getByRole("button", { name: /abrir menu/i }).getAttribute("aria-expanded"),
    ).toBe("false");
  });
});
