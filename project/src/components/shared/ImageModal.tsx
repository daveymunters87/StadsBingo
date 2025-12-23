"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

interface ImageModalProps {
  imageUrl: string;
  onClose: () => void;
  title?: string;
}

export default function ImageModal({
  imageUrl,
  onClose,
  title,
}: ImageModalProps) {
  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";

    // Handle escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-7xl max-h-[90vh] w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors shadow-lg"
          aria-label="Sluiten"
        >
          <X className="h-6 w-6 text-[#2C2C2C]" />
        </button>

        {/* Title */}
        {title && (
          <div className="absolute -top-12 left-0 bg-white rounded-lg px-4 py-2 shadow-lg">
            <p className="text-sm font-medium text-[#2C2C2C]">{title}</p>
          </div>
        )}

        {/* Image */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
          <img
            src={imageUrl}
            alt="Afbeelding preview"
            className="w-full h-full object-contain max-h-[85vh]"
          />
        </div>

        {/* Helper text */}
        <p className="text-center text-white text-sm mt-4">
          Klik buiten de afbeelding of druk op ESC om te sluiten
        </p>
      </div>
    </div>
  );
}
