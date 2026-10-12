import { Metadata } from 'next';
import { getMatches, getSports, getDepartments } from '@/lib/sheets';
import { ScheduleView } from './ScheduleView';

export const metadata: Metadata = {
  title: 'Match Schedule & Order of Play | Arena 2026',
  description:
    'Complete day-wise schedule, court allocations, and fixture timings for Arena 2026 at DTU Sports Complex.',
};

export default async function SchedulePage() {
  const [matches, sports, departments] = await Promise.all([
    getMatches(),
    getSports(),
    getDepartments(),
  ]);

  return (
    <div className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="mb-8 text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl sm:text-5xl font-display font-black uppercase text-blue-950 tracking-tight">
          Match Schedule
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Day-wise schedule and court locations across 16, 17 and 18 October 2026 at DTU Sports Complex.
        </p>
      </div>

      <ScheduleView
        matches={matches}
        sports={sports}
        departments={departments}
      />
    </div>
  );
}
