import React from 'react';
import { CalendarClock } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
}

export function EmptyState({
  title = 'To be announced',
  message = 'Details will be updated here as soon as they are announced by the organizers.',
  icon,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-white rounded-2xl border border-slate-200 shadow-xs my-4">
      <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
        {icon || <CalendarClock className="w-6 h-6" />}
      </div>
      <h3 className="text-lg sm:text-xl font-display font-bold text-slate-800 tracking-wide uppercase">
        {title}
      </h3>
      <p className="mt-1 text-sm text-slate-500 max-w-md">{message}</p>
    </div>
  );
}
