type EnvShape = {
  whatsappNumber: string;
  contactEmail: string;
  siteUrl: string;
};

const FALLBACKS = {
  NEXT_PUBLIC_WHATSAPP_NUMBER: "5511999156462",
  NEXT_PUBLIC_CONTACT_EMAIL: "akemicaroline@magnificatjoias.com.br",
  NEXT_PUBLIC_SITE_URL: "https://magnificatjoias.com.br",
} as const;

type EnvKey = keyof typeof FALLBACKS;

function readEnv(name: EnvKey): string {
  const value = process.env[name];
  if (value && value.length > 0) {
    return value;
  }
  if (typeof window === "undefined") {
    console.warn(`[env] ${name} ausente, usando fallback`);
  }
  return FALLBACKS[name];
}

export const env: EnvShape = {
  whatsappNumber: readEnv("NEXT_PUBLIC_WHATSAPP_NUMBER"),
  contactEmail: readEnv("NEXT_PUBLIC_CONTACT_EMAIL"),
  siteUrl: readEnv("NEXT_PUBLIC_SITE_URL"),
};
