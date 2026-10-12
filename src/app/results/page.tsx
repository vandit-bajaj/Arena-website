import { Metadata } from 'next';
import { getMatches, getSports, getDepartments } from '@/lib/sheets';
import { ResultsView } from './ResultsView';

export const metadata: Metadata = {
  title: 'Match Results & Scores | Arena 2026',
  description:
    'Live match results, scores, winners, and fixture outcomes from Arena 2026 at Delhi Technological University.',
};

export default async function ResultsPage() {
  const [matches, sports, departments] = await Promise.all([
    getMatches(),
    getSports(),
    getDepartments(),
  ]);

  return (
    <div className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="mb-8 text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl sm:text-5xl font-display font-black uppercase text-blue-950 tracking-tight">
          Match Results
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Official scores and match winners updated continuously directly from the arena coordinators.
        </p>
      </div>

      <ResultsView
        matches={matches}
        sports={sports}
        departments={departments}
      />
    </div>
  );
}
