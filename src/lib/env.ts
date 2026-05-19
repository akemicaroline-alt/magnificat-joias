type EnvShape = {
  whatsappNumber: string;
  contactEmail: string;
  siteUrl: string;
};

function readEnv(name: string, fallback?: string): string {
  const value = process.env[name];
  if (value && value.length > 0) {
    return value;
  }
  if (fallback !== undefined) {
    return fallback;
  }
  throw new Error(
    `[env] Variável de ambiente obrigatória ausente: ${name}. Defina em .env.local.`,
  );
}

const isTest = process.env.NODE_ENV === "test";

export const env: EnvShape = {
  whatsappNumber: readEnv(
    "NEXT_PUBLIC_WHATSAPP_NUMBER",
    isTest ? "5511999156462" : undefined,
  ),
  contactEmail: readEnv(
    "NEXT_PUBLIC_CONTACT_EMAIL",
    isTest ? "akemicaroline@magnificatjoias.com.br" : undefined,
  ),
  siteUrl: readEnv(
    "NEXT_PUBLIC_SITE_URL",
    isTest ? "https://magnificatjoias.com.br" : undefined,
  ),
};
