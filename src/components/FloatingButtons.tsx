import { Phone, MessageCircle } from "lucide-react";
import { COMPANY_PHONE_TEL, COMPANY_PHONE_WHATSAPP } from "@/lib/contact";

const FloatingButtons = () => {
  return (
    <div className="floating-buttons fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <a
        href={COMPANY_PHONE_WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 text-primary-foreground" />
      </a>
      <a
        href={COMPANY_PHONE_TEL}
        className="w-14 h-14 rounded-full bg-trust flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
        aria-label="Call us"
      >
        <Phone className="w-6 h-6 text-accent-foreground" />
      </a>
    </div>
  );
};

export default FloatingButtons;
