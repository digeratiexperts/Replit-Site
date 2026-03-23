import { useEffect, useRef } from "react";
import { X, Calendar, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBooking, ZOHO_BOOKING_URL } from "@/contexts/BookingContext";
import { motion, AnimatePresence } from "framer-motion";

export function BookingModal() {
  const { isOpen, closeBooking } = useBooking();
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeBooking();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
      return () => window.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, closeBooking]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
          onClick={(e) => {
            if (e.target === overlayRef.current) closeBooking();
          }}
          data-testid="booking-modal-overlay"
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-4xl h-[85vh] bg-[#0d0d1a] rounded-2xl overflow-hidden border border-violet-500/20 shadow-2xl shadow-violet-500/10 flex flex-col"
            data-testid="booking-modal"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-violet-500/20 bg-gradient-to-r from-violet-900/40 to-purple-900/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white font-['Space_Grotesk']">
                    Schedule Your Free Consultation
                  </h2>
                  <p className="text-sm text-gray-400">
                    Pick a time that works for you
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="/book"
                  className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1 mr-2 transition-colors"
                  onClick={closeBooking}
                  data-testid="link-open-booking-page"
                >
                  <ExternalLink className="w-3 h-3" />
                  Full page
                </a>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeBooking}
                  className="text-gray-400 hover:text-white hover:bg-white/10 rounded-xl"
                  data-testid="button-close-booking"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="flex-1 bg-white">
              <iframe
                src={ZOHO_BOOKING_URL}
                title="Schedule a consultation with Digerati Experts"
                className="w-full h-full border-0"
                allow="payment"
                data-testid="booking-iframe"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
