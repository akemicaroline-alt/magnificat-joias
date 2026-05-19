import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
  vi.restoreAllMocks();
});

async function loadEnv() {
  const mod = await import("@/lib/env");
  return mod.env;
}

describe("env", () => {
  it("retorna valor de process.env quando definido", async () => {
    vi.stubEnv("NEXT_PUBLIC_WHATSAPP_NUMBER", "5511988887777");
    vi.stubEnv("NEXT_PUBLIC_CONTACT_EMAIL", "outro@magnificatjoias.com.br");
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://staging.magnificatjoias.com.br");

    const env = await loadEnv();
    expect(env.whatsappNumber).toBe("5511988887777");
    expect(env.contactEmail).toBe("outro@magnificatjoias.com.br");
    expect(env.siteUrl).toBe("https://staging.magnificatjoias.com.br");
  });

  it("retorna fallback quando process.env é undefined", async () => {
    vi.stubEnv("NEXT_PUBLIC_WHATSAPP_NUMBER", undefined);
    vi.stubEnv("NEXT_PUBLIC_CONTACT_EMAIL", undefined);
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", undefined);
    vi.spyOn(console, "warn").mockImplementation(() => {});

    const env = await loadEnv();
    expect(env.whatsappNumber).toBe("5511999156462");
    expect(env.contactEmail).toBe("akemicaroline@magnificatjoias.com.br");
    expect(env.siteUrl).toBe("https://magnificatjoias.com.br");
  });

  it("retorna fallback quando process.env é string vazia", async () => {
    vi.stubEnv("NEXT_PUBLIC_WHATSAPP_NUMBER", "");
    vi.stubEnv("NEXT_PUBLIC_CONTACT_EMAIL", "");
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    vi.spyOn(console, "warn").mockImplementation(() => {});

    const env = await loadEnv();
    expect(env.whatsappNumber).toBe("5511999156462");
    expect(env.contactEmail).toBe("akemicaroline@magnificatjoias.com.br");
    expect(env.siteUrl).toBe("https://magnificatjoias.com.br");
  });

  it("NUNCA joga erro mesmo sem env definida", async () => {
    vi.stubEnv("NEXT_PUBLIC_WHATSAPP_NUMBER", undefined);
    vi.stubEnv("NEXT_PUBLIC_CONTACT_EMAIL", undefined);
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", undefined);
    vi.spyOn(console, "warn").mockImplementation(() => {});

    await expect(loadEnv()).resolves.toBeDefined();
  });
});
