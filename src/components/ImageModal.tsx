'use client';

import { useEffect, useState, useCallback } from 'react';

interface ImageModalProps {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageModal({ src, alt, isOpen, onClose }: ImageModalProps) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      document.body.style.overflow = 'hidden';
    } else {
      setShouldRender(false);
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, handleClose]);

  if (!shouldRender) return null;

  return (
    <div
      className="image-modal-overlay"
      onClick={handleClose}
    >
      <div
        className="image-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {src && src.trim() !== '' && (
          <img
            src={src}
            alt={alt}
            className="image-modal-image"
          />
        )}
        <button
          className="image-modal-close"
          onClick={handleClose}
          aria-label="Close"
        >
          <img src="/icons/x.svg" alt="Close" />
        </button>
      </div>
    </div>
  );
}
