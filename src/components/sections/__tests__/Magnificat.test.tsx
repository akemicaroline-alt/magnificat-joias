import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import { Magnificat } from "@/components/sections/Magnificat";

const originalMatchMedia = window.matchMedia;

afterEach(() => {
  window.matchMedia = originalMatchMedia;
});

function makeMatchMedia(matchReduced: boolean): typeof window.matchMedia {
  return ((query: string) => ({
    matches: matchReduced && query.includes("reduce"),
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(() => false),
  })) as typeof window.matchMedia;
}

describe("Magnificat", () => {
  it("renderiza heading 'Magnificat' (level 2)", () => {
    render(<Magnificat />);
    expect(
      screen.getByRole("heading", { level: 2, name: /^magnificat$/i }),
    ).toBeInTheDocument();
  });

  it("expõe o texto completo do cântico via aria-label do parágrafo", () => {
    render(<Magnificat />);
    const p = screen.getByTestId("magnificat-canto");
    const label = p.getAttribute("aria-label") ?? "";
    expect(label).toContain("Magnificat anima mea Dominum");
    expect(label).toContain("in saecula");
  });

  it("aplica id='magnificat' na section para deep-linking", () => {
    const { container } = render(<Magnificat />);
    expect(container.querySelector("section#magnificat")).not.toBeNull();
  });

  it("o textContent do parágrafo contém o início do cântico mesmo sem scroll", () => {
    render(<Magnificat />);
    const p = screen.getByTestId("magnificat-canto");
    expect(p.textContent).toContain("Magnificat anima mea Dominum");
  });

  it("com prefers-reduced-motion, todo o cântico aparece de uma vez na camada visível", () => {
    window.matchMedia = makeMatchMedia(true);
    render(<Magnificat />);
    const visibleSpan = screen.getByTestId("magnificat-visible");
    expect(visibleSpan.textContent).toContain("Magnificat anima mea Dominum");
    expect(visibleSpan.textContent).toContain("in saecula");
  });
});
