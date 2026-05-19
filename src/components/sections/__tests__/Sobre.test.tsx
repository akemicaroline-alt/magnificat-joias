import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { Sobre } from "@/components/sections/Sobre";

describe("Sobre", () => {
  it("mantém o título principal e remove o eyebrow 'Nossa história'", () => {
    render(<Sobre />);
    expect(
      screen.getByRole("heading", { level: 2, name: /tradição em cada detalhe/i }),
    ).toBeInTheDocument();
    expect(screen.queryByText(/nossa história/i)).toBeNull();
  });

  it("usa o novo copy em primeira pessoa", () => {
    render(<Sobre />);
    expect(
      screen.getByText(/ourivesaria que me foi transmitida/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/ouro 750\/18k certificado/i)).toBeInTheDocument();
    expect(screen.getByText(/ateliê em São Paulo/i)).toBeInTheDocument();
  });

  it("não exibe mais o copy antigo nem menciona prata 950", () => {
    render(<Sobre />);
    expect(screen.queryByText(/sempre acompanhada do terço/i)).toBeNull();
    expect(screen.queryByText(/prata 950/i)).toBeNull();
  });

  it("assinatura é '— Akemi' e não mais 'Magnificat Joias'", () => {
    render(<Sobre />);
    const assinatura = screen.getByTestId("sobre-assinatura");
    expect(assinatura.textContent).toMatch(/—\s*Akemi/);
    expect(assinatura.textContent).not.toMatch(/magnificat joias/i);
  });

  it("renderiza o carrossel com a primeira imagem do ateliê", () => {
    render(<Sobre />);
    expect(
      screen.getByAltText(
        /Ourives examinando peça com lupa de joalheiro no ateliê Magnificat/i,
      ),
    ).toBeInTheDocument();
  });
});
