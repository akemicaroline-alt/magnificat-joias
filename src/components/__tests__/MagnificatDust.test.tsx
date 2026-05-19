import { afterEach, describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";

import { MagnificatDust } from "@/components/MagnificatDust";

const originalMatchMedia = window.matchMedia;

afterEach(() => {
  window.matchMedia = originalMatchMedia;
});

describe("MagnificatDust", () => {
  it("renderiza um <canvas> aria-hidden e pointer-events-none", () => {
    const { container } = render(<MagnificatDust />);
    const canvas = container.querySelector("canvas");
    expect(canvas).not.toBeNull();
    expect(canvas!.getAttribute("aria-hidden")).toBe("true");
    expect(canvas!.className).toContain("pointer-events-none");
    expect(canvas!.className).toContain("absolute");
  });

  it("não crasha quando matchMedia indica reduced-motion", () => {
    window.matchMedia = ((query: string) => ({
      matches: query.includes("reduce"),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(() => false),
    })) as typeof window.matchMedia;

    expect(() => render(<MagnificatDust />)).not.toThrow();
  });
});
