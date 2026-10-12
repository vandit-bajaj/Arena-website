'use client';

import { useState, useMemo, useEffect } from 'react';
import { Match, Sport, Department } from '@/lib/schemas';
import { MatchCard } from '@/components/MatchCard';
import { EmptyState } from '@/components/EmptyState';
import { Filter, X, Clock, Trophy } from 'lucide-react';

interface ResultsViewProps {
  matches: Match[];
  sports: Sport[];
  departments: Department[];
}

export function ResultsView({
  matches,
  sports,
  departments,
}: ResultsViewProps) {
  const [selectedSport, setSelectedSport] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [lastUpdated, setLastUpdated] = useState<string>('Just now');

  useEffect(() => {
    const formatted = new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: 'numeric',
      month: 'short',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(new Date());
    setLastUpdated(formatted);
  }, []);

  // Filter completed matches, newest first
  const completedMatches = useMemo(() => {
    return matches
      .filter((m) => m.status === 'Completed')
      .slice()
      .reverse();
  }, [matches]);

  // Apply filters
  const filteredMatches = useMemo(() => {
    return completedMatches.filter((m) => {
      if (selectedSport !== 'all' && m.sport_id !== selectedSport) {
        return false;
      }
      if (
        selectedCategory !== 'all' &&
        m.category.toLowerCase() !== selectedCategory.toLowerCase()
      ) {
        return false;
      }
      if (
        selectedDept !== 'all' &&
        m.team_a.toLowerCase() !== selectedDept.toLowerCase() &&
        m.team_b.toLowerCase() !== selectedDept.toLowerCase()
      ) {
        return false;
      }
      return true;
    });
  }, [completedMatches, selectedSport, selectedCategory, selectedDept]);

  const hasActiveFilters =
    selectedSport !== 'all' || selectedCategory !== 'all' || selectedDept !== 'all';

  const resetFilters = () => {
    setSelectedSport('all');
    setSelectedCategory('all');
    setSelectedDept('all');
  };

  return (
    <div className="space-y-8">
      {/* Top Banner: Last Updated & Completed Count */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs gap-3">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
          <Clock className="w-4 h-4 text-blue-600 shrink-0" />
          <span>
            Last updated: <strong className="text-slate-800">{lastUpdated} (IST)</strong>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold uppercase tracking-wider">
            <Trophy className="w-3.5 h-3.5 text-emerald-600" />
            <span>{completedMatches.length} Matches Concluded</span>
          </span>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter Results</span>
          </div>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800"
            >
              <X className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Sport Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Sport</label>
            <select
              value={selectedSport}
              onChange={(e) => setSelectedSport(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-600 min-h-[44px]"
            >
              <option value="all">All Sports ({sports.length})</option>
              {sports.map((s) => (
                <option key={s.sport_id} value={s.sport_id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-600 min-h-[44px]"
            >
              <option value="all">All Categories</option>
              <option value="boys">Boys</option>
              <option value="girls">Girls</option>
            </select>
          </div>

          {/* Department Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">
              Department
            </label>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-600 min-h-[44px]"
            >
              <option value="all">All Departments</option>
              {departments.map((d) => (
                <option key={d.dept_id} value={d.dept_id}>
                  {d.short_name || d.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results List */}
      <div>
        {filteredMatches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMatches.map((match) => (
              <MatchCard
                key={match.match_id}
                match={match}
                departments={departments}
                sports={sports}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Results will be announced soon"
            message={
              hasActiveFilters
                ? 'No completed matches match your current filter settings.'
                : 'No match results have been recorded yet. Live scores will update automatically within 60 seconds of entry.'
            }
          />
        )}
      </div>
    </div>
  );
}
