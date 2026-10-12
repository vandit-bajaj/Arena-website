'use client';

import { useState, useMemo } from 'react';
import { Sport, Match, Player, Department } from '@/lib/schemas';
import { MatchCard } from '@/components/MatchCard';
import { EmptyState } from '@/components/EmptyState';
import { Trophy, Calendar, Users, Shield } from 'lucide-react';

interface SportDetailViewProps {
  sport: Sport;
  matches: Match[];
  players: Player[];
  departments: Department[];
}

export function SportDetailView({
  sport,
  matches,
  players,
  departments,
}: SportDetailViewProps) {
  // Determine available category tabs from players and matches
  const availableCategories = useMemo(() => {
    const cats = new Set<string>();
    players.forEach((p) => {
      if (p.category) cats.add(p.category.trim());
    });
    matches.forEach((m) => {
      if (m.category) cats.add(m.category.trim());
    });

    // If explicit flags set in sport
    if (sport.has_boys) cats.add('Boys');
    if (sport.has_girls) cats.add('Girls');

    const list = Array.from(cats);
    return list.length > 0 ? list : ['All'];
  }, [players, matches, sport]);

  const [activeCategory, setActiveCategory] = useState<string>(availableCategories[0]);
  const [activeTab, setActiveTab] = useState<'fixtures' | 'results' | 'teams'>('fixtures');

  // Filter items by category
  const categoryMatches = useMemo(() => {
    if (activeCategory === 'All') return matches;
    return matches.filter(
      (m) => !m.category || m.category.toLowerCase() === activeCategory.toLowerCase()
    );
  }, [matches, activeCategory]);

  const scheduledMatches = categoryMatches.filter((m) => m.status === 'Scheduled');
  const completedMatches = categoryMatches.filter((m) => m.status === 'Completed');

  const categoryPlayers = useMemo(() => {
    if (activeCategory === 'All') return players;
    return players.filter(
      (p) => !p.category || p.category.toLowerCase() === activeCategory.toLowerCase()
    );
  }, [players, activeCategory]);

  // Group participating departments
  const participatingDepts = useMemo(() => {
    const deptIds = new Set<string>();
    categoryPlayers.forEach((p) => deptIds.add(p.dept_id.toLowerCase()));
    categoryMatches.forEach((m) => {
      deptIds.add(m.team_a.toLowerCase());
      deptIds.add(m.team_b.toLowerCase());
    });

    return Array.from(deptIds).map((id) => {
      return (
        departments.find((d) => d.dept_id.toLowerCase() === id) || {
          dept_id: id,
          name: id.toUpperCase(),
          short_name: id.toUpperCase(),
        }
      );
    });
  }, [categoryPlayers, categoryMatches, departments]);

  return (
    <div className="space-y-8">
      {/* Category Tabs (Only if multiple exist) */}
      {availableCategories.length > 1 && (
        <div className="flex items-center justify-center px-1">
          <div className="inline-flex p-1 rounded-xl bg-white border border-slate-200 shadow-2xs max-w-full overflow-x-auto scrollbar-thin">
            {availableCategories.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-display text-xs sm:text-base font-bold uppercase tracking-wider whitespace-nowrap transition-all min-h-[44px] shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-blue-900 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-blue-900 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Sub-view Navigation (Fixtures / Results / Teams) */}
      <div className="flex items-center justify-start sm:justify-center border-b border-slate-200 overflow-x-auto scrollbar-thin">
        <nav className="flex space-x-2 sm:space-x-6 min-w-max px-2">
          <button
            onClick={() => setActiveTab('fixtures')}
            className={`flex items-center gap-1.5 sm:gap-2 pb-3 px-2 text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 transition-all min-h-[44px] whitespace-nowrap cursor-pointer ${
              activeTab === 'fixtures'
                ? 'border-blue-600 text-blue-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Calendar className="w-4 h-4 shrink-0" />
            <span>Fixtures ({scheduledMatches.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('results')}
            className={`flex items-center gap-1.5 sm:gap-2 pb-3 px-2 text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 transition-all min-h-[44px] whitespace-nowrap cursor-pointer ${
              activeTab === 'results'
                ? 'border-blue-600 text-blue-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Trophy className="w-4 h-4 shrink-0" />
            <span>Results ({completedMatches.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('teams')}
            className={`flex items-center gap-1.5 sm:gap-2 pb-3 px-2 text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 transition-all min-h-[44px] whitespace-nowrap cursor-pointer ${
              activeTab === 'teams'
                ? 'border-blue-600 text-blue-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Users className="w-4 h-4 shrink-0" />
            <span>Teams ({participatingDepts.length})</span>
          </button>
        </nav>
      </div>

      {/* Content Area */}
      <div>
        {activeTab === 'fixtures' && (
          <div>
            {scheduledMatches.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {scheduledMatches.map((match) => (
                  <MatchCard
                    key={match.match_id}
                    match={match}
                    departments={departments}
                    sports={[sport]}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                title="Fixtures will be announced soon"
                message={`No upcoming matches scheduled for ${sport.name} (${activeCategory}) at this time.`}
              />
            )}
          </div>
        )}

        {activeTab === 'results' && (
          <div>
            {completedMatches.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {completedMatches.map((match) => (
                  <MatchCard
                    key={match.match_id}
                    match={match}
                    departments={departments}
                    sports={[sport]}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                title="Results will be announced soon"
                message={`No match results completed yet for ${sport.name} (${activeCategory}).`}
              />
            )}
          </div>
        )}

        {activeTab === 'teams' && (
          <div>
            {participatingDepts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {participatingDepts.map((dept) => {
                  const deptPlayers = categoryPlayers.filter(
                    (p) => p.dept_id.toLowerCase() === dept.dept_id.toLowerCase()
                  );

                  return (
                    <div
                      key={dept.dept_id}
                      className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <Shield className="w-4 h-4 text-blue-600 shrink-0" />
                        <h4 className="font-display font-bold uppercase text-slate-900 tracking-wide">
                          {dept.name}
                        </h4>
                      </div>

                      {deptPlayers.length > 0 ? (
                        <ul className="divide-y divide-slate-100 text-xs">
                          {deptPlayers.map((p, i) => (
                            <li key={i} className="py-1.5 flex justify-between">
                              <span className="font-medium text-slate-800">{p.player_name}</span>
                              {p.roll_no && (
                                <span className="font-mono text-slate-400">{p.roll_no}</span>
                              )}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-xs text-slate-400 italic">Roster unannounced</p>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <EmptyState
                title="Teams to be announced"
                message={`Participating department rosters for ${sport.name} will be published soon.`}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
