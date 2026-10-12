'use client';

import { useState } from 'react';
import { Megaphone, X } from 'lucide-react';

interface AnnouncementRibbonProps {
  text?: string;
  dateTime?: string;
}

export function AnnouncementRibbon({ text, dateTime }: AnnouncementRibbonProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!text || !text.trim() || !isVisible) {
    return null;
  }

  return (
    <aside
      aria-label="Important Announcement"
      className="relative z-50 bg-gradient-to-r from-blue-950 via-indigo-900 to-blue-950 text-white border-b border-blue-700/60 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 flex items-center justify-between gap-3">
        {/* Main Ribbon Content */}
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1 justify-center sm:justify-start">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-display text-[11px] sm:text-xs font-black uppercase tracking-wider shrink-0 shadow-xs">
            <Megaphone className="w-3.5 h-3.5 text-slate-950 animate-bounce" />
            Announcement
          </span>

          <p className="text-xs sm:text-sm font-medium text-slate-100 line-clamp-2 sm:line-clamp-none">
            {text}
          </p>

          {dateTime && (
            <span className="text-[11px] font-mono text-sky-300 shrink-0 hidden md:inline bg-blue-900/60 px-2 py-0.5 rounded-md border border-blue-700/40">
              {dateTime}
            </span>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={() => setIsVisible(false)}
          className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors shrink-0 min-w-[32px] min-h-[32px] flex items-center justify-center focus:outline-hidden focus:ring-2 focus:ring-blue-400"
          aria-label="Dismiss announcement ribbon"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
