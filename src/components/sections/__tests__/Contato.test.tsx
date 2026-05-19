import { describe, expect, it, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Contato } from "@/components/sections/Contato";

const openSpy = vi.fn();

vi.stubGlobal("open", openSpy);

afterEach(() => {
  openSpy.mockClear();
});

describe("Contato", () => {
  it("mostra erros ao submeter com campos vazios", async () => {
    const user = userEvent.setup();
    render(<Contato />);
    await user.click(screen.getByRole("button", { name: /enviar via whatsapp/i }));
    expect(screen.getByText("Informe seu nome.")).toBeInTheDocument();
    expect(screen.getByText("Informe seu e-mail.")).toBeInTheDocument();
    expect(screen.getByText("Escreva uma mensagem.")).toBeInTheDocument();
    expect(openSpy).not.toHaveBeenCalled();
  });

  it("mostra erro com e-mail inválido", async () => {
    const user = userEvent.setup();
    render(<Contato />);
    await user.type(screen.getByLabelText(/nome/i), "Beatriz");
    await user.type(screen.getByLabelText(/e-mail/i), "nao-eh-email");
    await user.type(screen.getByLabelText(/mensagem/i), "Tenho dúvidas.");
    await user.click(screen.getByRole("button", { name: /enviar via whatsapp/i }));
    expect(screen.getByText("E-mail inválido.")).toBeInTheDocument();
    expect(openSpy).not.toHaveBeenCalled();
  });

  it("chama window.open com URL wa.me contendo nome+email+mensagem url-encoded", async () => {
    const user = userEvent.setup();
    render(<Contato />);
    await user.type(screen.getByLabelText(/nome/i), "Beatriz");
    await user.type(screen.getByLabelText(/e-mail/i), "bea@example.com");
    await user.type(screen.getByLabelText(/mensagem/i), "Quero o terço da minha mãe.");
    await user.click(screen.getByRole("button", { name: /enviar via whatsapp/i }));

    expect(openSpy).toHaveBeenCalledTimes(1);
    const [url, target, features] = openSpy.mock.calls[0];
    expect(typeof url).toBe("string");
    expect(url as string).toMatch(/^https:\/\/wa\.me\/5511999156462\?text=/);
    expect(url as string).toContain(encodeURIComponent("Beatriz"));
    expect(url as string).toContain(encodeURIComponent("bea@example.com"));
    expect(url as string).toContain(encodeURIComponent("Quero o terço da minha mãe."));
    expect(target).toBe("_blank");
    expect(features).toBe("noopener,noreferrer");
  });
});
