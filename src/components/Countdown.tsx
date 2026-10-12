'use client';

import { useState, useEffect } from 'react';
import { calculateCountdown, CountdownTime, EVENT_START_ISO } from '@/lib/utils';
import { Flame } from 'lucide-react';

interface CountdownProps {
  targetIso?: string;
}

export function Countdown({ targetIso = EVENT_START_ISO }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isStarted: false,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calculateCountdown(targetIso));

    const interval = setInterval(() => {
      setTimeLeft(calculateCountdown(targetIso));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetIso]);

  if (!mounted) {
    return (
      <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-lg mx-auto py-2">
        {['DAYS', 'HOURS', 'MINS', 'SECS'].map((unit) => (
          <div
            key={unit}
            className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl bg-white/90 border border-slate-200/80 shadow-xs"
          >
            <span className="text-2xl sm:text-4xl font-display font-black text-blue-900 tracking-tight">
              --
            </span>
            <span className="text-[10px] sm:text-xs font-semibold text-slate-500 tracking-wider">
              {unit}
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (timeLeft.isStarted) {
    return (
      <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-sm font-bold shadow-xs">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </span>
        <Flame className="w-4 h-4 text-emerald-600" />
        <span className="tracking-wide uppercase font-display text-base">Arena 2026 Is Live!</span>
      </div>
    );
  }

  const units = [
    { label: 'DAYS', val: timeLeft.days },
    { label: 'HOURS', val: String(timeLeft.hours).padStart(2, '0') },
    { label: 'MINS', val: String(timeLeft.minutes).padStart(2, '0') },
    { label: 'SECS', val: String(timeLeft.seconds).padStart(2, '0') },
  ];

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {units.map((unit) => (
          <div
            key={unit.label}
            className="flex flex-col items-center justify-center py-2.5 px-2 rounded-xl bg-white/95 border border-blue-200/70 shadow-sm backdrop-blur-xs"
          >
            <span className="text-2xl sm:text-4xl font-display font-black text-blue-950 tracking-tight leading-none">
              {unit.val}
            </span>
            <span className="mt-1 text-[10px] sm:text-xs font-semibold text-blue-600 tracking-widest">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
