import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { Hero } from "@/components/sections/Hero";

describe("Hero", () => {
  it("renderiza headline, subheadline e CTAs", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /joias que celebram/i,
    );
    expect(screen.getByText(/prata 950 e ouro 18k/i)).toBeInTheDocument();
    expect(screen.getByTestId("hero-cta-primary")).toBeInTheDocument();
    expect(screen.getByTestId("hero-cta-secondary")).toBeInTheDocument();
  });

  it("CTA primário aponta para wa.me com número configurado", () => {
    render(<Hero />);
    const cta = screen.getByTestId("hero-cta-primary");
    expect(cta.getAttribute("href")).toMatch(/^https:\/\/wa\.me\/5511999156462/);
    expect(cta.getAttribute("target")).toBe("_blank");
    expect(cta.getAttribute("rel")).toBe("noopener noreferrer");
  });

  it("CTA secundário tem href #colecoes", () => {
    render(<Hero />);
    const cta = screen.getByTestId("hero-cta-secondary");
    expect(cta.getAttribute("href")).toBe("#colecoes");
  });
});
