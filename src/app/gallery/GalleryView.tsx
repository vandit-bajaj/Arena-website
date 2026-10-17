'use client';

import { useState } from 'react';
import Image from 'next/image';
import { GalleryItem } from '@/lib/schemas';
import { Lightbox } from '@/components/Lightbox';
import { Trophy, ZoomIn, ExternalLink, Sparkles, Camera } from 'lucide-react';

interface GalleryViewProps {
  galleryItems: GalleryItem[];
  driveUrl?: string;
}

export function GalleryView({ galleryItems, driveUrl }: GalleryViewProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  const trophyItems = galleryItems.filter((item) =>
    item.filename.toLowerCase().includes('trophy')
  );
  const otherItems = galleryItems.filter(
    (item) => !item.filename.toLowerCase().includes('trophy')
  );

  const resolveImageSrc = (fn: string) => {
    if (fn.startsWith('http://') || fn.startsWith('https://') || fn.startsWith('/')) {
      return fn;
    }
    return `/gallery/${fn}`;
  };

  return (
    <div className="space-y-12">
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

      {/* 1. Official Championship Trophy & Poster Spotlight */}
      {trophyItems.length > 0 && (
        <section className="space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center">
                <Trophy className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-display font-black uppercase text-blue-950 tracking-wide">
                  Championship Trophy & Honors
                </h2>
                <p className="text-xs text-slate-500">Official tournament insignia and the ARENA 2026 physical rolling cup</p>
              </div>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-[11px] font-bold uppercase tracking-wider border border-blue-100">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Official DTU Assets</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {trophyItems.map((item, idx) => {
              const isPoster = item.filename.includes('poster');
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedPhoto(item)}
                  className="group relative cursor-pointer rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl hover:shadow-2xl hover:border-amber-400/60 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative aspect-[2/3] w-full bg-slate-950">
                    <Image
                      src={resolveImageSrc(item.filename)}
                      alt={item.caption || `Arena Trophy Photo ${idx + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, 420px"
                      priority={idx === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                    {/* Top Tag */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-bold text-amber-300 tracking-wider uppercase border border-amber-400/30 shadow-xs">
                        {isPoster ? 'Official Poster' : 'Winner Trophy (Physical)'}
                      </span>
                    </div>

                    {/* Zoom Icon Button */}
                    <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white/90 group-hover:text-amber-300 group-hover:scale-110 transition-all border border-white/20">
                      <ZoomIn className="w-4 h-4" />
                    </div>

                    {/* Bottom Caption Overlay */}
                    <div className="absolute bottom-0 inset-x-0 p-5 space-y-1 text-white">
                      <p className="font-display font-black text-lg uppercase tracking-wide">
                        {isPoster ? 'Champion of Arena 2026' : 'ARENA 2026 Winner Cup'}
                      </p>
                      <p className="text-xs text-slate-300 line-clamp-2">
                        {item.caption}
                      </p>
                      <div className="pt-2 flex items-center gap-2 text-[10px] text-amber-400 font-mono">
                        <span>Click to expand full resolution</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 2. General Photos Grid / Archived Photos */}
      <section className="space-y-5">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center">
            <Camera className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-display font-black uppercase text-blue-950 tracking-wide">
              Tournament Action & Memories
            </h2>
            <p className="text-xs text-slate-500">Live match coverage, athlete highlights, and ceremony photos</p>
          </div>
        </div>

        {otherItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {otherItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedPhoto(item)}
                className="group relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-2xs hover:shadow-md transition-all text-left focus:outline-hidden focus:ring-2 focus:ring-blue-600 min-h-[44px]"
              >
                <Image
                  src={resolveImageSrc(item.filename)}
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
        ) : (
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-50 border border-slate-200 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center mx-auto">
              <Camera className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 uppercase">
              Action Photos Being Captured Live
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              The media council and tournament photographers are shooting matches across all 11 disciplines. Action shots and podium celebrations will appear here as games conclude!
            </p>
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      <Lightbox item={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
    </div>
  );
}

