'use client';

import { useState, useMemo } from 'react';
import { Department, Sport, Player } from '@/lib/schemas';
import { Search, Users, AlertCircle, Shield } from 'lucide-react';
import { EmptyState } from '@/components/EmptyState';

interface TeamsViewProps {
  departments: Department[];
  sports: Sport[];
  players: Player[];
}

export function TeamsView({ departments, sports, players }: TeamsViewProps) {
  const [selectedDeptId, setSelectedDeptId] = useState<string>(
    departments[0]?.dept_id || ''
  );
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Search results across all departments & players
  const matchingPlayers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return null;
    return players.filter(
      (p) =>
        p.player_name.toLowerCase().includes(q) ||
        p.roll_no.toLowerCase().includes(q) ||
        p.dept_id.toLowerCase().includes(q)
    );
  }, [players, searchQuery]);

  // Current department
  const currentDept = departments.find(
    (d) => d.dept_id.toLowerCase() === selectedDeptId.toLowerCase()
  );

  // Group players of current dept by sport and category
  const deptPlayers = useMemo(() => {
    return players.filter(
      (p) => p.dept_id.toLowerCase() === selectedDeptId.toLowerCase()
    );
  }, [players, selectedDeptId]);

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <div className="relative max-w-xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by player name or roll number..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 text-sm sm:text-base focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-blue-600 shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-md"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* If Searching: Show Global Search Results */}
      {searchQuery.trim() !== '' ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-display font-bold uppercase text-slate-800 tracking-wide">
              Search Results ({matchingPlayers?.length || 0})
            </h2>
            <span className="text-xs text-slate-500">
              Query: &ldquo;{searchQuery}&rdquo;
            </span>
          </div>

          {matchingPlayers && matchingPlayers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {matchingPlayers.map((player, idx) => {
                const sportName =
                  sports.find((s) => s.sport_id === player.sport_id)?.name || player.sport_id;
                const deptName =
                  departments.find(
                    (d) => d.dept_id.toLowerCase() === player.dept_id.toLowerCase()
                  )?.name || player.dept_id;

                return (
                  <div
                    key={`${player.roll_no}-${idx}`}
                    className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                        <span className="font-semibold text-blue-700">{deptName}</span>
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-medium">
                          {player.category}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-base">
                        {player.player_name}
                      </h4>
                      {player.roll_no && (
                        <p className="text-xs font-mono text-slate-500 mt-0.5">
                          Roll: {player.roll_no}
                        </p>
                      )}
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-100 text-xs font-display font-semibold text-slate-600 uppercase">
                      Sport: {sportName}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState
              title="No Players Found"
              message={`No player registered with name or roll number matching "${searchQuery}".`}
            />
          )}
        </div>
      ) : (
        /* Regular Department View */
        <div className="space-y-8">
          {departments.length === 0 ? (
            <EmptyState
              title="Department Rosters to be announced"
              message="No department lists or rosters have been announced yet. Please check back soon."
            />
          ) : (
            <>
              {/* Department Selector Pills */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Select Department
                </label>
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
                  {departments.map((dept) => {
                    const isSelected =
                      dept.dept_id.toLowerCase() === selectedDeptId.toLowerCase();
                    return (
                      <button
                        key={dept.dept_id}
                        onClick={() => setSelectedDeptId(dept.dept_id)}
                        className={`px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm tracking-wide shrink-0 transition-all min-h-[44px] flex items-center gap-2 border ${
                          isSelected
                            ? 'bg-blue-900 text-white border-blue-900 shadow-sm'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <Shield className="w-3.5 h-3.5 opacity-80" />
                        <span>{dept.short_name || dept.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selected Department Header */}
              {currentDept && (
                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                      Department Roster
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900 uppercase">
                      {currentDept.name}
                    </h2>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 text-xs font-semibold w-fit">
                    <Users className="w-4 h-4" />
                    <span>{deptPlayers.length} Total Players</span>
                  </div>
                </div>
              )}

              {/* Sports Grouping for Selected Department */}
              <div className="space-y-6">
                {sports.map((sport) => {
                  const boysTeam = deptPlayers.filter(
                    (p) =>
                      p.sport_id === sport.sport_id &&
                      p.category.toLowerCase() === 'boys'
                  );
                  const girlsTeam = deptPlayers.filter(
                    (p) =>
                      p.sport_id === sport.sport_id &&
                      p.category.toLowerCase() === 'girls'
                  );
                  const otherTeam = deptPlayers.filter(
                    (p) =>
                      p.sport_id === sport.sport_id &&
                      !['boys', 'girls'].includes(p.category.toLowerCase())
                  );

                  return (
                    <div
                      key={sport.sport_id}
                      className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden"
                    >
                      {/* Sport Header */}
                      <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <h3 className="font-display text-lg sm:text-xl font-bold uppercase text-blue-950 tracking-wide">
                            {sport.name}
                          </h3>
                          {sport.nos_of_players && (
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 border border-blue-200">
                              {sport.nos_of_players}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-slate-500 font-medium">
                          {boysTeam.length + girlsTeam.length + otherTeam.length} Players
                        </span>
                      </div>

                      {/* Boys & Girls Rosters */}
                      <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Boys Category */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-blue-800">
                              Boys Team
                            </h4>
                            <span className="text-xs font-semibold text-slate-400">
                              {boysTeam.length > 0 ? `${boysTeam.length} members` : 'Unannounced'}
                            </span>
                          </div>

                          {boysTeam.length > 0 ? (
                            <ul className="divide-y divide-slate-100 text-sm">
                              {boysTeam.map((p, i) => (
                                <li
                                  key={i}
                                  className="py-2 flex items-center justify-between"
                                >
                                  <span className="font-medium text-slate-800">
                                    {p.player_name}
                                  </span>
                                  {p.roll_no && (
                                    <span className="font-mono text-xs text-slate-400">
                                      {p.roll_no}
                                    </span>
                                  )}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <div className="p-4 rounded-xl bg-slate-50 text-slate-400 text-xs italic text-center border border-dashed border-slate-200">
                              Team to be announced
                            </div>
                          )}
                        </div>

                        {/* Girls Category */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-pink-700">
                              Girls Team
                            </h4>
                            <span className="text-xs font-semibold text-slate-400">
                              {girlsTeam.length > 0 ? `${girlsTeam.length} members` : 'Unannounced'}
                            </span>
                          </div>

                          {girlsTeam.length > 0 ? (
                            <ul className="divide-y divide-slate-100 text-sm">
                              {girlsTeam.map((p, i) => (
                                <li
                                  key={i}
                                  className="py-2 flex items-center justify-between"
                                >
                                  <span className="font-medium text-slate-800">
                                    {p.player_name}
                                  </span>
                                  {p.roll_no && (
                                    <span className="font-mono text-xs text-slate-400">
                                      {p.roll_no}
                                    </span>
                                  )}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <div className="p-4 rounded-xl bg-slate-50 text-slate-400 text-xs italic text-center border border-dashed border-slate-200">
                              Team to be announced
                            </div>
                          )}
                        </div>

                        {/* Other Category if applicable */}
                        {otherTeam.length > 0 && (
                          <div className="md:col-span-2 space-y-3 pt-2">
                            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-slate-700 border-b border-slate-100 pb-2">
                              Open / Mixed Team
                            </h4>
                            <ul className="divide-y divide-slate-100 text-sm">
                              {otherTeam.map((p, i) => (
                                <li
                                  key={i}
                                  className="py-2 flex items-center justify-between"
                                >
                                  <span className="font-medium text-slate-800">
                                    {p.player_name}
                                  </span>
                                  {p.roll_no && (
                                    <span className="font-mono text-xs text-slate-400">
                                      {p.roll_no}
                                    </span>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
