export function buildWhatsAppLink(
  phoneNumber: string | null | undefined,
  text?: string,
): string {
  const number = (phoneNumber || "919962511805").replace(/[^\d]/g, "");
  const query = text ? `?text=${encodeURIComponent(text)}` : "";
  return `https://wa.me/${number}${query}`;
}
