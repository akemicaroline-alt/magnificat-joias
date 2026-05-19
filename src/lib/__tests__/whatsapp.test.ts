import { describe, expect, it } from "vitest";

import {
  buildCollectionMessage,
  buildContactMessage,
  buildWhatsappUrl,
} from "@/lib/whatsapp";

describe("buildWhatsappUrl", () => {
  it("gera URL com wa.me e número limpo", () => {
    const url = buildWhatsappUrl({
      numero: "+55 (11) 99915-6462",
      mensagem: "Olá!",
    });
    expect(url.startsWith("https://wa.me/5511999156462")).toBe(true);
  });

  it("url-encoda a mensagem com caracteres especiais", () => {
    const url = buildWhatsappUrl({
      numero: "5511999156462",
      mensagem: "Olá! Tudo bem? Tenho dúvidas sobre alianças & terços.",
    });
    expect(url).toContain(
      encodeURIComponent("Olá! Tudo bem? Tenho dúvidas sobre alianças & terços."),
    );
    expect(url).not.toContain(" ");
  });

  it("usa apenas dígitos no número (remove formatação)", () => {
    const url = buildWhatsappUrl({
      numero: "(11) 99915-6462",
      mensagem: "oi",
    });
    expect(url).toMatch(/^https:\/\/wa\.me\/11999156462\?text=oi$/);
  });
});

describe("buildContactMessage", () => {
  it("formata template em português com nome, e-mail e mensagem", () => {
    const out = buildContactMessage({
      nome: "Beatriz",
      email: "bea@example.com",
      mensagem: "Quero o terço da minha mãe.",
    });
    expect(out).toContain("Olá, Magnificat Joias!");
    expect(out).toContain("Nome: Beatriz");
    expect(out).toContain("E-mail: bea@example.com");
    expect(out).toContain("Quero o terço da minha mãe.");
  });
});

describe("buildCollectionMessage", () => {
  it("inclui o nome da coleção pedida", () => {
    expect(buildCollectionMessage("Terços")).toContain('"Terços"');
  });
});
