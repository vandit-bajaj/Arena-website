'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { GalleryItem } from '@/lib/schemas';

interface LightboxProps {
  item: GalleryItem | null;
  onClose: () => void;
}

export function Lightbox({ item, onClose }: LightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  const imageSrc =
    item.filename.startsWith('http://') ||
    item.filename.startsWith('https://') ||
    item.filename.startsWith('/')
      ? item.filename
      : `/gallery/${item.filename}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors z-10"
        aria-label="Close image modal"
      >
        <X className="w-6 h-6" />
      </button>

      <div
        className="w-full max-w-4xl max-h-[92vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full max-w-2xl h-[65vh] sm:h-[78vh] rounded-2xl overflow-hidden bg-slate-950/90 border border-white/10 shadow-2xl flex items-center justify-center">
          <Image
            src={imageSrc}
            alt={item.caption || 'Arena Fest Photo'}
            fill
            className="object-contain p-2 sm:p-4"
            sizes="(max-width: 1024px) 100vw, 800px"
            priority
          />
        </div>
        {(item.caption || item.year) && (
          <div className="mt-3.5 text-center text-white space-y-1.5 px-4 max-w-xl">
            <p className="font-semibold text-sm sm:text-base leading-snug">{item.caption}</p>
            {item.year && (
              <span className="inline-block px-3 py-0.5 rounded-full bg-white/10 text-sky-300 text-xs font-mono tracking-wider border border-white/10">
                Arena {item.year}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
