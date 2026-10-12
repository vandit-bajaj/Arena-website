'use client';

import { useState, useMemo } from 'react';
import { Department, Match, Sport } from '@/lib/schemas';
import { calculateDepartmentStandings } from '@/lib/points';
import { Trophy, Shield, Search, TrendingUp, Award, Activity } from 'lucide-react';

interface PointsTableViewProps {
  departments: Department[];
  matches: Match[];
  sports: Sport[];
}

export function PointsTableView({
  departments,
  matches,
  sports,
}: PointsTableViewProps) {
  const [selectedSport, setSelectedSport] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Calculate standings based on selected sport
  const standings = useMemo(() => {
    return calculateDepartmentStandings(departments, matches, {
      sportId: selectedSport,
      pointsPerWin: 2,
      pointsPerDraw: 1,
    });
  }, [departments, matches, selectedSport]);

  // Filter by search query
  const filteredStandings = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return standings;
    return standings.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.short_name.toLowerCase().includes(q) ||
        s.dept_id.toLowerCase().includes(q)
    );
  }, [standings, searchQuery]);

  // Total completed matches for the selected filter
  const completedMatchCount = useMemo(() => {
    let list = matches.filter((m) => m.status === 'Completed' && m.winner);
    if (selectedSport !== 'all') {
      list = list.filter((m) => m.sport_id.toLowerCase() === selectedSport.toLowerCase());
    }
    return list.length;
  }, [matches, selectedSport]);

  // Top team
  const leader = standings.length > 0 && standings[0].points > 0 ? standings[0] : null;

  return (
    <div className="space-y-8">
      {/* 1. Quick Stats Header Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Leader Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-900 to-indigo-950 text-white shadow-sm border border-blue-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-sky-300 uppercase tracking-wider">
              {selectedSport === 'all' ? 'Overall Leader' : 'Discipline Leader'}
            </span>
            <div className="text-2xl font-display font-black uppercase mt-1">
              {leader ? leader.name : 'TBD'}
            </div>
            <p className="text-xs text-blue-200 mt-0.5">
              {leader ? `${leader.points} Points (${leader.won} Wins)` : 'Matches in progress'}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0 border border-amber-400/30">
            <Trophy className="w-6 h-6" />
          </div>
        </div>

        {/* Matches Completed */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Matches Decided
            </span>
            <div className="text-2xl font-display font-black text-slate-900 mt-1">
              {completedMatchCount}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Live from arena score sheets
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
            <Activity className="w-6 h-6" />
          </div>
        </div>

        {/* Scoring System Info */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Points System
            </span>
            <div className="text-lg font-display font-black text-slate-900 mt-1">
              Win: 2 pts • Draw: 1 pt
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Loss: 0 pts • Tie-breaker: Wins, Loss diff
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
            <Award className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* 2. Controls: Sport Filter & Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Sport Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-thin">
          <button
            onClick={() => setSelectedSport('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide shrink-0 transition-all min-h-[42px] border ${
              selectedSport === 'all'
                ? 'bg-blue-900 text-white border-blue-900 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            Overall Trophy
          </button>
          {sports.map((sport) => {
            const isSelected = selectedSport.toLowerCase() === sport.sport_id.toLowerCase();
            return (
              <button
                key={sport.sport_id}
                onClick={() => setSelectedSport(sport.sport_id)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide shrink-0 transition-all min-h-[42px] border ${
                  isSelected
                    ? 'bg-blue-900 text-white border-blue-900 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {sport.name}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search department..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-blue-600 shadow-2xs"
          />
        </div>
      </div>

      {/* 3. The Standings Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-display uppercase tracking-wider text-[11px] sm:text-xs">
                <th className="py-3.5 px-3 sm:px-4 text-center w-12 sm:w-16">Rank</th>
                <th className="py-3.5 px-4 font-bold">Department</th>
                <th className="py-3.5 px-3 text-center">Played</th>
                <th className="py-3.5 px-3 text-center text-emerald-700 font-bold">Won</th>
                <th className="py-3.5 px-3 text-center text-rose-700 font-bold">Lost</th>
                <th className="py-3.5 px-3 text-center text-slate-600 font-bold">Draw</th>
                <th className="py-3.5 px-4 text-center text-blue-950 font-black text-sm sm:text-base bg-blue-50/50">
                  Points
                </th>
                <th className="py-3.5 px-3 text-center hidden md:table-cell">Win %</th>
                <th className="py-3.5 px-4 text-center hidden lg:table-cell">Recent Form</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStandings.map((item) => {
                const isTop1 = item.rank === 1 && item.points > 0;
                const isTop2 = item.rank === 2 && item.points > 0;
                const isTop3 = item.rank === 3 && item.points > 0;

                return (
                  <tr
                    key={item.dept_id}
                    className="hover:bg-blue-50/40 transition-colors"
                  >
                    {/* Rank */}
                    <td className="py-3.5 px-3 sm:px-4 text-center font-display font-black text-sm sm:text-base">
                      {isTop1 ? (
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-400 text-slate-950 shadow-xs font-bold text-xs sm:text-sm">
                          1
                        </span>
                      ) : isTop2 ? (
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-300 text-slate-900 shadow-xs font-bold text-xs sm:text-sm">
                          2
                        </span>
                      ) : isTop3 ? (
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-600/30 text-amber-900 shadow-xs font-bold text-xs sm:text-sm">
                          3
                        </span>
                      ) : (
                        <span className="text-slate-500 font-semibold">{item.rank}</span>
                      )}
                    </td>

                    {/* Department Name */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 border border-blue-100 flex items-center justify-center font-display font-black text-xs shrink-0">
                          {item.short_name.slice(0, 3)}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 leading-tight">
                            {item.name}
                          </div>
                          <span className="text-[11px] font-mono text-slate-400">
                            {item.dept_id}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Played */}
                    <td className="py-3.5 px-3 text-center font-medium text-slate-700">
                      {item.played}
                    </td>

                    {/* Won */}
                    <td className="py-3.5 px-3 text-center font-bold text-emerald-600">
                      {item.won}
                    </td>

                    {/* Lost */}
                    <td className="py-3.5 px-3 text-center font-medium text-rose-600">
                      {item.lost}
                    </td>

                    {/* Drawn */}
                    <td className="py-3.5 px-3 text-center font-medium text-slate-500">
                      {item.drawn}
                    </td>

                    {/* Points */}
                    <td className="py-3.5 px-4 text-center font-display font-black text-base sm:text-lg text-blue-900 bg-blue-50/40">
                      {item.points}
                    </td>

                    {/* Win % */}
                    <td className="py-3.5 px-3 text-center font-mono text-xs text-slate-600 hidden md:table-cell">
                      {item.played > 0 ? `${item.win_rate}%` : '-'}
                    </td>

                    {/* Form */}
                    <td className="py-3.5 px-4 text-center hidden lg:table-cell">
                      {item.form.length > 0 ? (
                        <div className="flex items-center justify-center gap-1">
                          {item.form.map((outcome, idx) => (
                            <span
                              key={idx}
                              className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black uppercase text-white shadow-2xs ${
                                outcome === 'W'
                                  ? 'bg-emerald-600'
                                  : outcome === 'L'
                                  ? 'bg-rose-500'
                                  : 'bg-slate-400'
                              }`}
                            >
                              {outcome}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-slate-300 text-xs">-</span>
                      )}
                    </td>
                  </tr>
                );
              })}

              {filteredStandings.length === 0 && (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400">
                    No departments match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Note */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2">
          <span>
            Rankings update automatically within 60 seconds as scores are entered in the Matches sheet.
          </span>
          <span className="font-semibold text-slate-700">
            2 Pts / Win • 1 Pt / Draw • 0 Pt / Loss
          </span>
        </div>
      </div>
    </div>
  );
}
