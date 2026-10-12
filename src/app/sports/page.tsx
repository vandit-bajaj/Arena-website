import { Metadata } from 'next';
import Link from 'next/link';
import { getSports, getMatches } from '@/lib/sheets';
import { ArrowRight, Trophy, Calendar, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tournament Sports | Arena 2026',
  description:
    'Explore the 11 sanctioned sports featured in Arena 2026: Cricket, Football, Basketball, Volleyball, Kabaddi, Lawn Tennis, Athletics, Badminton, Chess, Table Tennis, and Carom (Mixed).',
};

export default async function SportsPage() {
  const [sports, matches] = await Promise.all([
    getSports(),
    getMatches(),
  ]);

  return (
    <div className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="mb-10 text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl sm:text-5xl font-display font-black uppercase text-blue-950 tracking-tight">
          Tournament Sports
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Eleven sanctioned events scheduled across the DTU Sports Complex during the 3-day sports fest.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {sports.map((sport) => {
          const sportMatches = matches.filter((m) => m.sport_id === sport.sport_id);
          const completedCount = sportMatches.filter((m) => m.status === 'Completed').length;
          const scheduledCount = sportMatches.filter((m) => m.status === 'Scheduled').length;

          return (
            <Link
              key={sport.sport_id}
              href={`/sports/${sport.sport_id}`}
              className="group p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md hover:border-blue-400 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-2xl font-bold uppercase text-slate-900 group-hover:text-blue-700 transition-colors tracking-wide">
                    {sport.name}
                  </h2>
                  <div className="w-8 h-8 rounded-full bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 flex items-center justify-center transition-colors">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>

                {sport.nos_of_players && (
                  <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-blue-900 text-xs font-semibold border border-blue-100">
                    <Users className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>Squad: {sport.nos_of_players}</span>
                  </div>
                )}

                <div className="flex items-center gap-2 mt-3 text-xs font-semibold">
                  {sport.has_boys === true && (
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      Men
                    </span>
                  )}
                  {sport.has_girls === true && (
                    <span className="px-2.5 py-0.5 rounded-full bg-pink-50 text-pink-700 border border-pink-100">
                      Women
                    </span>
                  )}
                  {sport.has_boys === null && sport.has_girls === null && (
                    <span className="text-slate-400 italic font-normal text-xs">
                      Categories TBA
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-blue-500" />
                  {scheduledCount} Upcoming Fixtures
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-emerald-500" />
                  {completedCount} Completed
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
