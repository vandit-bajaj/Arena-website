import { Metadata } from 'next';
import { getDepartments, getMatches, getSports } from '@/lib/sheets';
import { PointsTableView } from './PointsTableView';
import { Trophy } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Department Points Table & Leaderboard | Arena 2026',
  description:
    'Official department-wise points table, tournament rankings, wins, losses, and team standings for Arena 2026 at DTU.',
};

export default async function PointsPage() {
  const [departments, matches, sports] = await Promise.all([
    getDepartments(),
    getMatches(),
    getSports(),
  ]);

  return (
    <div className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="mb-10 text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
          <Trophy className="w-3.5 h-3.5 text-amber-500" />
          <span>Championship Standings</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-black uppercase text-blue-950 tracking-tight">
          Department Points Table
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Real-time tournament rankings, points, wins, and losses calculated automatically from match results across all disciplines.
        </p>
      </div>

      <PointsTableView
        departments={departments}
        matches={matches}
        sports={sports}
      />
    </div>
  );
}
