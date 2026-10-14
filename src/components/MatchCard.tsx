import { Match, Department, Sport } from '@/lib/schemas';
import { Trophy, Clock, MapPin, Calendar } from 'lucide-react';
import { formatShortDate } from '@/lib/utils';

interface MatchCardProps {
  match: Match;
  departments?: Department[];
  sports?: Sport[];
}

export function MatchCard({ match, departments = [], sports = [] }: MatchCardProps) {
  const sportName = sports.find((s) => s.sport_id === match.sport_id)?.name || match.sport_id;
  const deptAName =
    departments.find((d) => d.dept_id.toLowerCase() === match.team_a.toLowerCase())?.name ||
    match.team_a;
  const deptBName = match.team_b
    ? departments.find((d) => d.dept_id.toLowerCase() === match.team_b.toLowerCase())?.name ||
      match.team_b
    : '';

  const isCompleted = match.status === 'Completed';
  const isWinnerA = match.winner === 'A';
  const isWinnerB = match.winner === 'B';
  const isDraw = match.winner === 'Draw';
  const isNoResult = match.winner === 'No result';

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-shadow overflow-hidden">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 bg-slate-50 border-b border-slate-100 text-xs text-slate-600">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-display font-bold uppercase text-blue-900 tracking-wider">
            {sportName}
          </span>
          {match.category && (
            <span className="px-2 py-0.5 rounded-full bg-blue-100/70 text-blue-700 font-medium text-[11px]">
              {match.category}
            </span>
          )}
          {match.round && (
            <span className="text-slate-400 font-medium hidden sm:inline">• {match.round}</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isCompleted ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold uppercase tracking-wider">
              Completed
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[11px] font-semibold tracking-wider">
              Scheduled
            </span>
          )}
        </div>
      </div>

      {/* Main Match Fixture & Scores */}
      <div className="p-4 sm:p-5">
        {!match.team_b ? (
          <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-sm sm:text-base font-bold text-slate-900">{deptAName}</span>
              <span className="text-xs text-slate-500 font-medium">(All Departments)</span>
            </div>
            {match.result_note && (
              <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                {match.result_note}
              </span>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
            {/* Team A */}
            <div
              className={`p-3 rounded-xl border transition-all ${
                isWinnerA
                  ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 font-bold shadow-2xs'
                  : 'bg-slate-50/70 border-slate-200/80 text-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  {isWinnerA && <Trophy className="w-4 h-4 text-emerald-600 shrink-0" />}
                  <span className="text-sm sm:text-base font-semibold truncate">{deptAName}</span>
                </div>
                {match.score_a && (
                  <span className="ml-2 font-display text-base font-black text-slate-900 shrink-0">
                    {match.score_a}
                  </span>
                )}
              </div>
              {isWinnerA && (
                <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider block mt-1">
                  Winner
                </span>
              )}
            </div>

            {/* Team B */}
            <div
              className={`p-3 rounded-xl border transition-all ${
                isWinnerB
                  ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 font-bold shadow-2xs'
                  : 'bg-slate-50/70 border-slate-200/80 text-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  {isWinnerB && <Trophy className="w-4 h-4 text-emerald-600 shrink-0" />}
                  <span className="text-sm sm:text-base font-semibold truncate">{deptBName}</span>
                </div>
                {match.score_b && (
                  <span className="ml-2 font-display text-base font-black text-slate-900 shrink-0">
                    {match.score_b}
                  </span>
                )}
              </div>
              {isWinnerB && (
                <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider block mt-1">
                  Winner
                </span>
              )}
            </div>
          </div>
        )}

        {/* Draw or No Result status banner */}
        {(isDraw || isNoResult) && (
          <div className="mt-3 p-2 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold text-center uppercase tracking-wider">
            {isDraw ? 'Match Ended in a Draw' : 'Match Ended with No Result'}
          </div>
        )}

        {/* Note if any */}
        {match.result_note && (
          <p className="mt-2.5 text-xs text-slate-500 italic bg-slate-50/50 p-2 rounded-lg border border-slate-100">
            Note: {match.result_note}
          </p>
        )}

        {/* Match Meta: Date, Time, Ground */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
          <div className="flex items-center gap-3 flex-wrap">
            {match.date && (
              <span className="inline-flex items-center gap-1 font-semibold text-slate-700 bg-slate-100/80 px-2 py-0.5 rounded-md border border-slate-200/60">
                <Calendar className="w-3 h-3 text-blue-600" />
                <span>{formatShortDate(match.date)}</span>
              </span>
            )}
            {match.time && (
              <span className="inline-flex items-center gap-1 text-slate-600">
                <Clock className="w-3.5 h-3.5 text-blue-500" />
                {match.time}
              </span>
            )}
            {match.venue_ground && (
              <span className="inline-flex items-center gap-1 text-slate-600">
                <MapPin className="w-3.5 h-3.5 text-red-400" />
                {match.venue_ground}
              </span>
            )}
          </div>

          <span className="text-[11px] text-slate-400 font-mono">#{match.match_id}</span>
        </div>
      </div>
    </div>
  );
}
