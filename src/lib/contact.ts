export const WHATSAPP_NUMBER = "5543999863177";

export function buildWhatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
