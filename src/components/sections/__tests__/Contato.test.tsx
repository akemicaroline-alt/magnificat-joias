import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { Contato } from "@/components/sections/Contato";

describe("Contato", () => {
  it("renderiza title e description atualizada (sem eyebrow nem numeral romano)", () => {
    render(<Contato />);
    expect(
      screen.getByRole("heading", { level: 2, name: /vamos conversar/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /encomendas, joias personalizadas e criação de peças exclusivas/i,
      ),
    ).toBeInTheDocument();

    expect(screen.queryByText("Contato")).toBeNull();
    expect(screen.queryByText("V")).toBeNull();
  });

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

  it("link do Instagram aponta para @magnificat_joias", () => {
    render(<Contato />);
    const insta = screen.getByTestId("contato-instagram");
    expect(insta.getAttribute("href")).toBe(
      "https://www.instagram.com/magnificat_joias",
    );
    expect(insta.getAttribute("target")).toBe("_blank");
    expect(insta.getAttribute("rel")).toBe("noopener noreferrer");
    expect(insta.getAttribute("aria-label")).toBe(
      "Seguir @magnificat_joias no Instagram",
    );
    expect(screen.getByText("@magnificat_joias")).toBeInTheDocument();
  });

  it("não exibe o CTA 'Falar no WhatsApp' enquanto SHOW_WHATSAPP=false", () => {
    render(<Contato />);
    // SHOW_WHATSAPP=false: botão oculto. Reverter ao reabilitar.
    expect(screen.queryByTestId("contato-cta-whatsapp")).toBeNull();
    expect(screen.queryByText(/falar no whatsapp/i)).toBeNull();
  });

  it("não renderiza mais o formulário antigo, nem o texto auxiliar 'atendimento direto'", () => {
    render(<Contato />);
    expect(screen.queryByLabelText(/nome/i)).toBeNull();
    expect(screen.queryByRole("textbox")).toBeNull();
    expect(screen.queryByRole("button", { name: /enviar via whatsapp/i })).toBeNull();
    expect(screen.queryByText(/atendimento direto/i)).toBeNull();
  });
});
