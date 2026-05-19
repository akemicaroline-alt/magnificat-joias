export type BuildWhatsappUrlInput = {
  numero: string;
  mensagem: string;
};

export type BuildContactMessageInput = {
  nome: string;
  email: string;
  mensagem: string;
};

export function buildWhatsappUrl({ numero, mensagem }: BuildWhatsappUrlInput): string {
  const numeroLimpo = numero.replace(/\D+/g, "");
  const texto = encodeURIComponent(mensagem.trim());
  return `https://wa.me/${numeroLimpo}?text=${texto}`;
}

export function buildContactMessage({
  nome,
  email,
  mensagem,
}: BuildContactMessageInput): string {
  return [
    "Olá, Magnificat Joias!",
    "",
    `Nome: ${nome}`,
    `E-mail: ${email}`,
    "",
    "Mensagem:",
    mensagem,
  ].join("\n");
}

export function buildCollectionMessage(colecao: string): string {
  return `Olá, Magnificat Joias! Gostaria de receber informações sobre a coleção "${colecao}".`;
}
