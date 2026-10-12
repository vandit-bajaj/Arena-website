'use client';

import { useState } from 'react';
import Image from 'next/image';
import { GalleryItem } from '@/lib/schemas';
import { Lightbox } from '@/components/Lightbox';
import { EmptyState } from '@/components/EmptyState';
import { Images, ExternalLink } from 'lucide-react';

interface GalleryViewProps {
  galleryItems: GalleryItem[];
  driveUrl?: string;
}

export function GalleryView({ galleryItems, driveUrl }: GalleryViewProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  return (
    <div className="space-y-8">
      {/* Google Drive Link if provided */}
      {driveUrl && (
        <div className="flex justify-center">
          <a
            href={driveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-50 text-blue-800 border border-blue-200 text-xs sm:text-sm font-semibold hover:bg-blue-100 transition-colors min-h-[44px]"
          >
            <span>View Full Resolution Gallery on Google Drive</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      )}

      {/* Photo Grid or Empty State */}
      {galleryItems.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedPhoto(item)}
                className="group relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-2xs hover:shadow-md transition-all text-left focus:outline-hidden focus:ring-2 focus:ring-blue-600 min-h-[44px]"
              >
                <Image
                  src={`/gallery/${item.filename}`}
                  alt={item.caption || `Arena Photo ${idx + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                  {item.caption && (
                    <p className="text-white text-xs font-semibold truncate">{item.caption}</p>
                  )}
                  {item.year && (
                    <span className="text-sky-300 text-[10px] font-mono">Edition {item.year}</span>
                  )}
                </div>
              </button>
            ))}
          </div>

          <Lightbox item={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
        </>
      ) : (
        <EmptyState
          icon={<Images className="w-6 h-6" />}
          title="Photos from past editions coming soon"
          message="High-definition memories from past Arena championships will be displayed here as soon as the media team finishes archiving."
        />
      )}
    </div>
  );
}
