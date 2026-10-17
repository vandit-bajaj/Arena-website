'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trophy, Award, Sparkles, ZoomIn, ArrowRight, ShieldCheck } from 'lucide-react';
import { Lightbox } from './Lightbox';
import { GalleryItem } from '@/lib/schemas';

const TROPHY_PHOTOS: GalleryItem[] = [
  {
    filename: 'arena-2026-trophy-poster.jpg',
    caption: "Champion of Arena 2026 • Official Championship Tournament Poster",
    year: '2026',
  },
  {
    filename: 'arena-2026-trophy-photo.jpg',
    caption: "Official ARENA 2026 Winner Cup • Engraved: Delhi Technological University Winner",
    year: '2026',
  },
];

interface TrophyShowcaseProps {
  compact?: boolean;
}

export function TrophyShowcase({ compact = false }: TrophyShowcaseProps) {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  if (compact) {
    return (
      <>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 border border-blue-900/60 p-6 sm:p-8 text-white shadow-xl">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-60 h-60 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="relative group shrink-0 cursor-pointer" onClick={() => setSelectedItem(TROPHY_PHOTOS[1])}>
                <div className="relative w-20 h-28 sm:w-24 sm:h-32 rounded-2xl overflow-hidden border-2 border-amber-400/60 bg-slate-900 shadow-lg group-hover:scale-105 transition-transform">
                  <Image
                    src="/gallery/arena-2026-trophy-photo.jpg"
                    alt="ARENA 2026 Winner Trophy"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors flex items-center justify-center">
                    <ZoomIn className="w-5 h-5 text-amber-300 opacity-90 group-hover:scale-110 transition-transform" />
                  </div>
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-bold uppercase tracking-wider border border-amber-400/30">
                  <Trophy className="w-3.5 h-3.5" />
                  <span>The ARENA Cup 2026</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-black uppercase text-white tracking-wide">
                  The Ultimate Championship Prize
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                  Awarded to the overall champion department with the highest aggregate points across all 11 disciplines (Gold: 10 pts • Silver: 7 pts • Bronze: 5 pts).
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={() => setSelectedItem(TROPHY_PHOTOS[0])}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs tracking-wide border border-white/20 transition-all min-h-[44px]"
              >
                <ZoomIn className="w-4 h-4 text-sky-300" />
                <span>View Trophy Photos</span>
              </button>
            </div>
          </div>
        </div>

        <Lightbox item={selectedItem} onClose={() => setSelectedItem(null)} />
      </>
    );
  }

  return (
    <>
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 border border-blue-900/60 p-6 sm:p-10 lg:p-12 text-white shadow-2xl">
        {/* Glow ambient effects */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto space-y-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Official Tournament Trophy & Honors</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-display font-black uppercase text-white tracking-tight">
                The ARENA 2026 Cup
              </h2>
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl font-light">
                &ldquo;More Than a Game • It&apos;s a Battle of Spirit.&rdquo; The crowned centerpiece of DTU&apos;s annual athletic showcase, awarded to the #1 Department of Delhi Technological University.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/points"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md transition-colors min-h-[44px]"
              >
                <Trophy className="w-4 h-4" />
                <span>Points Table</span>
              </Link>
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs tracking-wider border border-white/20 transition-colors min-h-[44px]"
              >
                <span>Full Gallery</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* 2-Column Trophy Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Two Interactive Image Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Card 1: Official Poster */}
              <div
                onClick={() => setSelectedItem(TROPHY_PHOTOS[0])}
                className="group relative cursor-pointer rounded-2xl overflow-hidden bg-slate-900/90 border border-white/10 hover:border-amber-400/60 shadow-xl transition-all duration-300 hover:shadow-amber-500/10 hover:-translate-y-1"
              >
                <div className="relative aspect-[2/3] w-full bg-slate-950">
                  <Image
                    src="/gallery/arena-2026-trophy-poster.jpg"
                    alt="Champion of Arena 2026 Poster"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 380px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                  
                  {/* Top Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-amber-300 tracking-wider uppercase border border-amber-400/30 shadow-xs">
                      Official Poster
                    </span>
                  </div>

                  {/* Zoom Icon */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white/80 group-hover:text-amber-300 group-hover:scale-110 transition-all border border-white/20">
                    <ZoomIn className="w-4 h-4" />
                  </div>

                  {/* Bottom Text Overlay */}
                  <div className="absolute bottom-0 inset-x-0 p-4 space-y-1">
                    <p className="font-display font-black text-base uppercase text-white tracking-wide">
                      Champion of Arena 2026
                    </p>
                    <p className="text-[11px] text-sky-200 line-clamp-1">
                      Play • Compete • Conquer | DTU Sports Council
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2: Physical Trophy Cup */}
              <div
                onClick={() => setSelectedItem(TROPHY_PHOTOS[1])}
                className="group relative cursor-pointer rounded-2xl overflow-hidden bg-slate-900/90 border border-white/10 hover:border-amber-400/60 shadow-xl transition-all duration-300 hover:shadow-amber-500/10 hover:-translate-y-1"
              >
                <div className="relative aspect-[2/3] w-full bg-slate-950">
                  <Image
                    src="/gallery/arena-2026-trophy-photo.jpg"
                    alt="ARENA 2026 Winner Physical Trophy"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 380px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-sky-300 tracking-wider uppercase border border-sky-400/30 shadow-xs">
                      Official Trophy
                    </span>
                  </div>

                  {/* Zoom Icon */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white/80 group-hover:text-amber-300 group-hover:scale-110 transition-all border border-white/20">
                    <ZoomIn className="w-4 h-4" />
                  </div>

                  {/* Bottom Text Overlay */}
                  <div className="absolute bottom-0 inset-x-0 p-4 space-y-1">
                    <p className="font-display font-black text-base uppercase text-white tracking-wide">
                      Winner Cup (Physical)
                    </p>
                    <p className="text-[11px] text-amber-300 line-clamp-1">
                      Engraved Plaque: ARENA 2026 • WINNER
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Trophy Details & Points Mechanics */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                  <Award className="w-4 h-4" />
                  <span>Rulebook Section 12 & 13</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-black uppercase text-white tracking-wide">
                  How The Champion is Decided
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed font-light">
                  The coveted <strong>ARENA Cup</strong> is not given for a single victory. It represents departmental excellence across all 11 sanctioned athletic disciplines.
                </p>
              </div>

              {/* Points Podium Cards */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-amber-400/10 border border-amber-400/30 text-center space-y-1">
                  <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-400 text-slate-950 font-black text-xs">
                    🥇
                  </div>
                  <div className="text-xl font-display font-black text-amber-300">10 Pts</div>
                  <div className="text-[10px] font-bold uppercase text-slate-300 tracking-wider">1st (Gold)</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-300/10 border border-slate-300/30 text-center space-y-1">
                  <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-300 text-slate-950 font-black text-xs">
                    🥈
                  </div>
                  <div className="text-xl font-display font-black text-slate-200">7 Pts</div>
                  <div className="text-[10px] font-bold uppercase text-slate-300 tracking-wider">2nd (Silver)</div>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-700/15 border border-amber-700/30 text-center space-y-1">
                  <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-700 text-white font-black text-xs">
                    🥉
                  </div>
                  <div className="text-xl font-display font-black text-amber-400">5 Pts</div>
                  <div className="text-[10px] font-bold uppercase text-slate-300 tracking-wider">3rd (Bronze)</div>
                </div>
              </div>

              {/* Key Features List */}
              <div className="space-y-3 pt-2 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Cumulative Grand Tally:</strong> Total points accrued from Cricket, Football, Basketball, Volleyball, Kabaddi, Athletics, Badminton, Tennis, Table Tennis, Chess, and Carom.</span>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Official DTU Sports Council Plaque:</strong> The winning department name and department council will be permanently commemorated on the ARENA rolling mantle.</span>
                </div>
              </div>

              {/* Bottom CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href="/rules"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-sky-300 hover:text-sky-200 transition-colors"
                >
                  <span>Read General Rules & Guidelines</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox for Zoom */}
      <Lightbox item={selectedItem} onClose={() => setSelectedItem(null)} />
    </>
  );
}
