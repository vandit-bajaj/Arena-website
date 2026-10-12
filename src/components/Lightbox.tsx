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

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors"
        aria-label="Close image modal"
      >
        <X className="w-6 h-6" />
      </button>

      <div
        className="max-w-4xl max-h-[85vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full max-w-3xl aspect-4/3 rounded-2xl overflow-hidden bg-slate-900 border border-white/10 shadow-2xl">
          <Image
            src={`/gallery/${item.filename}`}
            alt={item.caption || 'Arena Fest Photo'}
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 800px"
          />
        </div>
        {(item.caption || item.year) && (
          <div className="mt-4 text-center text-white space-y-1">
            <p className="font-medium text-sm sm:text-base">{item.caption}</p>
            {item.year && (
              <span className="text-xs text-slate-400 font-mono tracking-wider">
                Arena {item.year}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
