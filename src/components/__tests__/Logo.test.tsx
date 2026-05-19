import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { Logo } from "@/components/Logo";

describe("Logo", () => {
  it("renderiza imagem principal /logo.png por padrão", () => {
    render(<Logo />);
    const img = screen.getByAltText("Magnificat Joias") as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.getAttribute("src")).toBe("/logo.png");
  });

  it("cai para /logo-fallback.svg quando onError dispara", () => {
    render(<Logo />);
    const img = screen.getByAltText("Magnificat Joias") as HTMLImageElement;
    fireEvent.error(img);
    expect(
      (screen.getByAltText("Magnificat Joias") as HTMLImageElement).getAttribute("src"),
    ).toBe("/logo-fallback.svg");
  });

  it("aplica variant dark via data attribute para inverter cores", () => {
    render(<Logo variant="dark" />);
    const root = screen.getByTestId("logo-root");
    expect(root.getAttribute("data-variant")).toBe("dark");
  });

  it("aplica tamanho lg respeitando o aspect ratio natural (~2.92:1)", () => {
    render(<Logo size="lg" />);
    const img = screen.getByAltText("Magnificat Joias") as HTMLImageElement;
    expect(img.getAttribute("height")).toBe("48");
    expect(img.getAttribute("width")).toBe("140");
  });

  it("aceita prop height para override e mantém o aspect ratio", () => {
    render(<Logo height={36} />);
    const img = screen.getByAltText("Magnificat Joias") as HTMLImageElement;
    expect(img.getAttribute("height")).toBe("36");
    expect(img.getAttribute("width")).toBe("105");
  });
});
