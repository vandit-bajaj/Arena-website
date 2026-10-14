/**
 * Utility functions for Arena 2026
 * Master rule: All times are in IST (Asia/Kolkata, UTC+05:30)
 */

/**
 * Parses an ISO date string or date time in IST
 */
export function formatISTDate(dateStr: string): string {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(d);
  } catch {
    return dateStr;
  }
}

/**
 * Formats time in IST
 */
export function formatISTTime(dateStr: string): string {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(d);
  } catch {
    return dateStr;
  }
}

/**
 * Target fest start datetime in IST (16 October 2026, 08:30 AM IST)
 */
export const EVENT_START_ISO = '2026-10-16T08:30:00+05:30';

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isStarted: boolean;
}

export function calculateCountdown(targetIso: string = EVENT_START_ISO): CountdownTime {
  const target = new Date(targetIso).getTime();
  const now = new Date().getTime();
  const diff = target - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isStarted: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, isStarted: false };
}

/**
 * Standard CSS class joining helper
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Normalizes date strings (e.g. '2026-10-16', '16 Oct 2026', 'Friday', '16-10-2026') to a standard 'YYYY-MM-DD' key
 */
export function normalizeDateKey(dateStr?: string): string {
  if (!dateStr) return '';
  const d = dateStr.trim().toLowerCase();
  if (d.includes('16') || d.includes('friday') || d.includes('day 1') || d.includes('day1')) {
    return '2026-10-16';
  }
  if (d.includes('17') || d.includes('saturday') || d.includes('day 2') || d.includes('day2')) {
    return '2026-10-17';
  }
  if (d.includes('18') || d.includes('sunday') || d.includes('day 3') || d.includes('day3')) {
    return '2026-10-18';
  }
  return dateStr.trim();
}

/**
 * Returns human-readable label: 'Day 1 • Friday, 16 Oct 2026'
 */
export function formatFriendlyDate(dateStr?: string): string {
  if (!dateStr) return 'Date TBA';
  const key = normalizeDateKey(dateStr);
  if (key === '2026-10-16') return 'Day 1 • Friday, 16 Oct 2026';
  if (key === '2026-10-17') return 'Day 2 • Saturday, 17 Oct 2026';
  if (key === '2026-10-18') return 'Day 3 • Sunday, 18 Oct 2026';
  return dateStr;
}

/**
 * Returns short badge label: 'Fri, 16 Oct'
 */
export function formatShortDate(dateStr?: string): string {
  if (!dateStr) return '';
  const key = normalizeDateKey(dateStr);
  if (key === '2026-10-16') return 'Fri, 16 Oct';
  if (key === '2026-10-17') return 'Sat, 17 Oct';
  if (key === '2026-10-18') return 'Sun, 18 Oct';
  return dateStr;
}

/**
 * Parses times like '08:00-09:00 AM', '11:45-12:45 PM', '01:00-02:30 PM', '10:30 AM', '5:00 PM' to minutes from midnight (0..1440)
 */
export function parseTimeToMinutes(tStr?: string): number {
  if (!tStr) return 9999;
  const str = tStr.trim();
  const m = str.match(/(\d{1,2}):(\d{2})/);
  if (!m) {
    const m2 = str.match(/(\d{1,2})\s*(am|pm)/i);
    if (m2) {
      let hh = parseInt(m2[1], 10);
      const isPm = m2[2].toLowerCase() === 'pm';
      if (isPm && hh < 12) hh += 12;
      if (!isPm && hh === 12) hh = 0;
      return hh * 60;
    }
    return 9999;
  }
  let hh = parseInt(m[1], 10);
  const mm = parseInt(m[2], 10);
  const isPm = /pm/i.test(str);
  if (hh === 11 && isPm && (str.includes('-') || str.includes('to'))) {
    // 11:xx is morning in 11:00-12:30 PM
  } else if (hh === 12 && isPm) {
    // 12 PM noon
  } else if (hh < 12 && isPm) {
    hh += 12;
  } else if (hh === 12 && !isPm) {
    hh = 0;
  }
  return hh * 60 + mm;
}
