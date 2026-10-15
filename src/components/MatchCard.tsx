import { Match, Department, Sport } from '@/lib/schemas';
import { Trophy, Clock, MapPin, Calendar, CheckCircle2, Award, Dumbbell } from 'lucide-react';
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

  // High-visibility Category badge styling
  const getCategoryBadgeClass = (cat: string) => {
    const c = cat.toLowerCase();
    if (c.includes('girl') || c.includes('women')) {
      return 'bg-pink-600 text-white font-bold shadow-2xs';
    }
    if (c.includes('boy') || c.includes('men') && !c.includes('women')) {
      return 'bg-blue-600 text-white font-bold shadow-2xs';
    }
    if (c.includes('mix') || c.includes('all')) {
      return 'bg-purple-600 text-white font-bold shadow-2xs';
    }
    return 'bg-indigo-600 text-white font-bold shadow-2xs';
  };

  // High-visibility Round badge styling
  const getRoundBadgeClass = (round: string) => {
    const r = round.toLowerCase();
    if (r.includes('final') && !r.includes('semi') && !r.includes('quarter')) {
      return 'bg-amber-400 text-amber-950 font-black ring-1 ring-amber-500 shadow-xs';
    }
    if (r.includes('semi')) {
      return 'bg-indigo-600 text-white font-bold shadow-2xs';
    }
    if (r.includes('quarter') || r.includes('round 2')) {
      return 'bg-blue-100 text-blue-900 border border-blue-300 font-bold';
    }
    if (r.includes('third')) {
      return 'bg-orange-100 text-orange-900 border border-orange-300 font-bold';
    }
    return 'bg-slate-100 text-slate-800 border border-slate-300 font-bold';
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-300 transition-all overflow-hidden flex flex-col justify-between">
      {/* Top Header Bar with High-Visibility Badges */}
      <div className="flex items-center justify-between px-4 sm:px-5 py-3 bg-slate-50 border-b border-slate-200/80 gap-2 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Sport Badge */}
          <span className="font-display font-black text-xs uppercase tracking-wider px-2.5 py-1 rounded-lg bg-blue-950 text-white shadow-2xs">
            {sportName}
          </span>

          {/* Category Badge */}
          {match.category && (
            <span
              className={`px-2.5 py-1 rounded-lg text-xs uppercase tracking-wider ${getCategoryBadgeClass(
                match.category
              )}`}
            >
              {match.category}
            </span>
          )}

          {/* Round Badge */}
          {match.round && (
            <span
              className={`px-2.5 py-1 rounded-lg text-xs uppercase tracking-wider ${getRoundBadgeClass(
                match.round
              )}`}
            >
              {match.round}
            </span>
          )}
        </div>

        {/* Status Badge */}
        <div>
          {isCompleted ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider shadow-xs ring-1 ring-emerald-500">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Completed</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-900 border border-sky-300 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-sky-600 animate-pulse" />
              <span>Scheduled</span>
            </span>
          )}
        </div>
      </div>

      {/* Main Match Fixture & Scores */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        {!match.team_b ? (
          /* Single Event Banner (Powerlifting, Athletics, etc.) */
          <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                {match.sport_id === 'powerlifting' ? (
                  <Dumbbell className="w-4 h-4" />
                ) : (
                  <Award className="w-4 h-4" />
                )}
              </div>
              <div>
                <span className="text-base sm:text-lg font-display font-black uppercase text-blue-950 tracking-wide block">
                  {deptAName}
                </span>
                <span className="text-xs text-slate-500 font-semibold">
                  {match.sport_id === 'powerlifting'
                    ? 'Powerlifting Competition • DTU Gymnasium'
                    : 'Track & Field Event • All Departments'}
                </span>
              </div>
            </div>
            {match.result_note && (
              <span className="inline-flex self-start sm:self-auto px-3 py-1 rounded-lg bg-blue-600 text-white text-xs font-bold uppercase tracking-wider shadow-2xs">
                {match.result_note}
              </span>
            )}
          </div>
        ) : (
          /* Head-to-Head Teams Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
            {/* Team A Card */}
            <div
              className={`p-3.5 rounded-xl border-2 transition-all ${
                isWinnerA
                  ? 'bg-emerald-50/80 border-emerald-400 text-emerald-950 font-bold shadow-2xs'
                  : 'bg-slate-50/80 border-slate-200 text-slate-800'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  {isWinnerA && <Trophy className="w-4 h-4 text-emerald-600 shrink-0" />}
                  <span className="text-sm sm:text-base font-bold truncate">{deptAName}</span>
                </div>
                {match.score_a && (
                  <span className="ml-2 font-display text-base sm:text-lg font-black text-slate-900 shrink-0">
                    {match.score_a}
                  </span>
                )}
              </div>
              {isWinnerA && (
                <div className="mt-1.5 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider shadow-2xs">
                    Winner
                  </span>
                </div>
              )}
            </div>

            {/* Team B Card */}
            <div
              className={`p-3.5 rounded-xl border-2 transition-all ${
                isWinnerB
                  ? 'bg-emerald-50/80 border-emerald-400 text-emerald-950 font-bold shadow-2xs'
                  : 'bg-slate-50/80 border-slate-200 text-slate-800'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  {isWinnerB && <Trophy className="w-4 h-4 text-emerald-600 shrink-0" />}
                  <span className="text-sm sm:text-base font-bold truncate">{deptBName}</span>
                </div>
                {match.score_b && (
                  <span className="ml-2 font-display text-base sm:text-lg font-black text-slate-900 shrink-0">
                    {match.score_b}
                  </span>
                )}
              </div>
              {isWinnerB && (
                <div className="mt-1.5 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider shadow-2xs">
                    Winner
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Draw or No Result status banner */}
        {(isDraw || isNoResult) && (
          <div className="mt-3 p-2 rounded-xl bg-amber-100 text-amber-950 border border-amber-300 text-xs font-bold text-center uppercase tracking-wider shadow-2xs">
            {isDraw ? 'Match Ended in a Draw' : 'Match Ended with No Result'}
          </div>
        )}

        {/* Result Note */}
        {match.result_note && match.team_b && (
          <p className="mt-2.5 text-xs text-blue-950 font-medium bg-blue-50/70 p-2 rounded-lg border border-blue-200/70">
            <strong>Outcome:</strong> {match.result_note}
          </p>
        )}

        {/* Match Meta: Date, Time, Ground, Match ID Badges */}
        <div className="mt-4 pt-3 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Highlighted Date Badge */}
            {match.date && (
              <span className="inline-flex items-center gap-1.5 font-bold bg-amber-100/90 text-amber-950 px-2.5 py-1 rounded-lg border border-amber-300 text-xs shadow-2xs">
                <Calendar className="w-3.5 h-3.5 text-amber-700" />
                <span>{formatShortDate(match.date)}</span>
              </span>
            )}

            {/* Highlighted Time Badge */}
            {match.time && (
              <span className="inline-flex items-center gap-1.5 font-bold text-blue-950 bg-blue-100/90 px-2.5 py-1 rounded-lg border border-blue-300 text-xs shadow-2xs">
                <Clock className="w-3.5 h-3.5 text-blue-700" />
                <span>{match.time}</span>
              </span>
            )}

            {/* Highlighted Venue Badge */}
            {match.venue_ground && (
              <span className="inline-flex items-center gap-1.5 font-semibold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-300 text-xs shadow-2xs">
                <MapPin className="w-3.5 h-3.5 text-rose-600" />
                <span>{match.venue_ground}</span>
              </span>
            )}
          </div>

          {/* Highlighted Match ID Tag */}
          <span className="inline-flex items-center font-mono font-bold text-xs px-2.5 py-1 rounded-lg bg-slate-800 text-slate-100 border border-slate-700 shadow-2xs">
            #{match.match_id}
          </span>
        </div>
      </div>
    </div>
  );
}
