import { Announcement } from '@/lib/schemas';
import { Bell } from 'lucide-react';

interface AnnouncementBannerProps {
  announcements: Announcement[];
}

export function AnnouncementBanner({ announcements }: AnnouncementBannerProps) {
  if (!announcements || announcements.length === 0) return null;

  // Newest announcement
  const latest = announcements[announcements.length - 1];

  return (
    <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white px-4 py-2.5 shadow-sm border-b border-blue-700/50">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-center">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-500/30 text-sky-200 text-[11px] font-bold uppercase tracking-wider shrink-0 border border-sky-400/30">
          <Bell className="w-3 h-3 text-sky-300 animate-pulse" />
          Update
        </span>
        <span className="truncate">{latest.text}</span>
        {latest.date_time && (
          <span className="text-[11px] text-blue-300 shrink-0 hidden md:inline">
            ({latest.date_time})
          </span>
        )}
      </div>
    </div>
  );
}
