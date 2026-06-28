import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { Footer } from "@/components/Footer";

describe("Footer", () => {
  it("renderiza sem erros e contém a tagline atualizada", () => {
    render(<Footer />);
    expect(
      screen.getByText(/joias que celebram a fé desde 2025/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/peças exclusivas em ouro 18k/i),
    ).toBeInTheDocument();
  });

  it("não menciona mais 'prata' em lugar nenhum do footer", () => {
    render(<Footer />);
    expect(screen.queryByText(/prata/i)).toBeNull();
  });

  it("exibe o e-mail e oculta o telefone (SHOW_WHATSAPP=false)", () => {
    render(<Footer />);
    expect(
      screen.getByText(/akemicaroline@magnificatjoias\.com\.br/i),
    ).toBeInTheDocument();
    // SHOW_WHATSAPP=false: telefone oculto. Reverter ao reabilitar.
    expect(screen.queryByText(/99915.?6462/)).toBeNull();
  });

  it("link do Instagram aponta para @magnificat_joias com target _blank", () => {
    render(<Footer />);
    const insta = screen.getByLabelText(/instagram da magnificat joias/i);
    expect(insta.getAttribute("href")).toBe(
      "https://www.instagram.com/magnificat_joias",
    );
    expect(insta.getAttribute("target")).toBe("_blank");
    expect(insta.getAttribute("rel")).toBe("noopener noreferrer");
  });
});
