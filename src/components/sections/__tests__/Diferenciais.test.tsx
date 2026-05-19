import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { Diferenciais } from "@/components/sections/Diferenciais";

describe("Diferenciais", () => {
  it("renderiza os quatro cards com os títulos atualizados", () => {
    render(<Diferenciais />);
    expect(
      screen.getByRole("heading", { level: 3, name: /^ouro 18k$/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: /^gemas naturais$/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: /^entrega brasil$/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: /atendimento personalizado/i }),
    ).toBeInTheDocument();
  });

  it("usa o copy novo de Ouro 18k e Gemas naturais com lapidações exclusivas", () => {
    render(<Diferenciais />);
    expect(
      screen.getByText(/ouro 18k certificado, com garantia de procedência/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/gemas naturais com lapidações exclusivas/i),
    ).toBeInTheDocument();
  });

  it("entrega Brasil agora cita embalagens temáticas conforme a coleção", () => {
    render(<Diferenciais />);
    expect(
      screen.getByText(/temáticas, conforme a coleção/i),
    ).toBeInTheDocument();
  });

  it("não mostra mais 'Prata 950', 'Bênção', 'abençoada' nem 'Materiais nobres'", () => {
    render(<Diferenciais />);
    expect(screen.queryByText(/prata 950/i)).toBeNull();
    expect(screen.queryByText(/bênção/i)).toBeNull();
    expect(screen.queryByText(/abençoada/i)).toBeNull();
    expect(screen.queryByText(/materiais nobres/i)).toBeNull();
  });

  it("não exibe o numeral romano 'III' como rótulo da seção", () => {
    render(<Diferenciais />);
    expect(screen.queryByText(/^III$/)).toBeNull();
  });
});
