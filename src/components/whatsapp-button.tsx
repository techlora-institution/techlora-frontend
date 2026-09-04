interface WhatsAppButtonProps {
  phoneNumber?: string | null;
}

export function WhatsAppButton({ phoneNumber }: WhatsAppButtonProps) {
  const number = (phoneNumber || "919962511805").replace(/[^\d]/g, "");

  return (
    <a
      href={`https://wa.me/${number}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.9C21.96 6.45 17.5 2 12.04 2Zm5.86 14.02c-.25.7-1.25 1.29-2.03 1.46-.55.12-1.26.21-3.65-.78-3.07-1.27-5.04-4.38-5.19-4.58-.15-.2-1.24-1.65-1.24-3.15s.77-2.23 1.05-2.54c.27-.3.6-.38.8-.38.2 0 .4 0 .58.01.19.01.44-.07.68.53.25.6.85 2.08.92 2.23.07.15.12.33.02.53-.1.2-.15.33-.3.5-.15.18-.31.4-.44.53-.15.15-.3.31-.13.6.17.3.76 1.26 1.64 2.04 1.12.99 2.07 1.3 2.37 1.45.3.15.47.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.24.66-.15.27.1 1.72.81 2.02.96.3.15.5.22.57.35.08.13.08.75-.17 1.45Z" />
      </svg>
    </a>
  );
}
