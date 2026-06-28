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

  // SHOW_WHATSAPP=false: o FAB não deve aparecer, mesmo com scroll suficiente.
  // Reverter este teste ao reabilitar o WhatsApp.
  it("não renderiza o FAB enquanto SHOW_WHATSAPP=false, mesmo após scroll", async () => {
    await act(async () => {
      render(<WhatsappButton />);
    });
    expect(screen.queryByTestId("whatsapp-fab")).toBeNull();
    expect(screen.queryByLabelText(/falar no whatsapp/i)).toBeNull();
    expect(screen.queryByText(/falar no whatsapp/i)).toBeNull();
  });
});
