import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { act, render, screen } from "@testing-library/react";

import { WhatsappButton } from "@/components/WhatsappButton";

describe("WhatsappButton", () => {
  beforeEach(() => {
    window.scrollY = 200;
  });

  afterEach(() => {
    window.scrollY = 0;
  });

  it("renderiza link com número e mensagem URL-encoded", async () => {
    await act(async () => {
      render(<WhatsappButton />);
    });
    const link = await screen.findByTestId("whatsapp-fab");
    const href = link.getAttribute("href");
    expect(href).toMatch(/^https:\/\/wa\.me\/5511999156462\?text=/);
    expect(href).toContain(encodeURIComponent("Magnificat Joias"));
  });

  it("aplica aria-label adequado e target _blank com rel correto", async () => {
    await act(async () => {
      render(<WhatsappButton />);
    });
    const link = await screen.findByTestId("whatsapp-fab");
    expect(link.getAttribute("aria-label")).toBe("Falar no WhatsApp");
    expect(link.getAttribute("target")).toBe("_blank");
    expect(link.getAttribute("rel")).toBe("noopener noreferrer");
  });
});
