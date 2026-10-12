import { Metadata } from 'next';
import { getDepartments, getSports, getPlayers } from '@/lib/sheets';
import { TeamsView } from './TeamsView';

export const metadata: Metadata = {
  title: 'Teams & Rosters | Arena 2026',
  description:
    'Explore department sports teams, rosters, and player lists for Arena 2026 at Delhi Technological University.',
};

export default async function TeamsPage() {
  const [departments, sports, players] = await Promise.all([
    getDepartments(),
    getSports(),
    getPlayers(),
  ]);

  return (
    <div className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="mb-8 text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl sm:text-5xl font-display font-black uppercase text-blue-950 tracking-tight">
          Department Teams
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Official rosters representing every engineering discipline and academic department at DTU.
        </p>
      </div>

      <TeamsView
        departments={departments}
        sports={sports}
        players={players}
      />
    </div>
  );
}
