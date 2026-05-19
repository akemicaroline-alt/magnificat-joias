import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { Contato } from "@/components/sections/Contato";

describe("Contato", () => {
  it("renderiza os quatro blocos de contato com valores corretos", () => {
    render(<Contato />);
    expect(screen.getByText("E-mail")).toBeInTheDocument();
    expect(screen.getByText("akemicaroline@magnificatjoias.com.br")).toBeInTheDocument();

    expect(screen.getByText("WhatsApp")).toBeInTheDocument();
    expect(screen.getByText("+55 (11) 99915-6462")).toBeInTheDocument();

    expect(screen.getByText("Horário")).toBeInTheDocument();
    expect(screen.getByText("Seg–Sáb, 9h às 18h")).toBeInTheDocument();

    expect(screen.getByText("Atendimento")).toBeInTheDocument();
    expect(screen.getByText("Atendemos todo o Brasil")).toBeInTheDocument();
  });

  it("e-mail tem href mailto:", () => {
    render(<Contato />);
    const mailto = screen
      .getByText("akemicaroline@magnificatjoias.com.br")
      .closest("a");
    expect(mailto).not.toBeNull();
    expect(mailto!.getAttribute("href")).toBe(
      "mailto:akemicaroline@magnificatjoias.com.br",
    );
  });

  it("CTA 'Falar no WhatsApp' tem href correto via wa.me", () => {
    render(<Contato />);
    const cta = screen.getByTestId("contato-cta-whatsapp");
    const href = cta.getAttribute("href") ?? "";
    expect(href).toMatch(/^https:\/\/wa\.me\/5511999156462\?text=/);
    expect(href).toContain(
      encodeURIComponent("Olá! Gostaria de conhecer as joias da Magnificat."),
    );
    expect(cta.getAttribute("target")).toBe("_blank");
    expect(cta.getAttribute("rel")).toBe("noopener noreferrer");
  });

  it("não renderiza mais o formulário antigo (nome/email/mensagem)", () => {
    render(<Contato />);
    expect(screen.queryByLabelText(/nome/i)).toBeNull();
    expect(screen.queryByRole("textbox")).toBeNull();
    expect(screen.queryByRole("button", { name: /enviar via whatsapp/i })).toBeNull();
  });
});
