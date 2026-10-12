'use client';

import { useState, useMemo } from 'react';
import { Match, Sport, Department } from '@/lib/schemas';
import { MatchCard } from '@/components/MatchCard';
import { EmptyState } from '@/components/EmptyState';
import { Calendar, Filter, X } from 'lucide-react';

interface ScheduleViewProps {
  matches: Match[];
  sports: Sport[];
  departments: Department[];
}

const FEST_DAYS = [
  { id: '16', label: 'Day 1 (16 Oct)', dateKey: '16' },
  { id: '17', label: 'Day 2 (17 Oct)', dateKey: '17' },
  { id: '18', label: 'Day 3 (18 Oct)', dateKey: '18' },
];

export function ScheduleView({ matches, sports, departments }: ScheduleViewProps) {
  const [selectedDay, setSelectedDay] = useState<string>('16');
  const [selectedSport, setSelectedSport] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDept, setSelectedDept] = useState<string>('all');

  // Filter scheduled matches (per roadmap: matches without winner are scheduled)
  const scheduledMatches = useMemo(() => {
    return matches.filter((m) => m.status === 'Scheduled');
  }, [matches]);

  // Filter by selected day, sport, category, department
  const filteredMatches = useMemo(() => {
    return scheduledMatches.filter((m) => {
      // Day filter: match m.date containing '16', '17', or '18' or '2026-10-16', etc.
      if (m.date) {
        const dateLower = m.date.toLowerCase();
        if (!dateLower.includes(selectedDay)) {
          return false;
        }
      }

      // Sport filter
      if (selectedSport !== 'all' && m.sport_id !== selectedSport) {
        return false;
      }

      // Category filter
      if (
        selectedCategory !== 'all' &&
        m.category.toLowerCase() !== selectedCategory.toLowerCase()
      ) {
        return false;
      }

      // Department filter
      if (
        selectedDept !== 'all' &&
        m.team_a.toLowerCase() !== selectedDept.toLowerCase() &&
        m.team_b.toLowerCase() !== selectedDept.toLowerCase()
      ) {
        return false;
      }

      return true;
    });
  }, [scheduledMatches, selectedDay, selectedSport, selectedCategory, selectedDept]);

  const hasActiveFilters =
    selectedSport !== 'all' || selectedCategory !== 'all' || selectedDept !== 'all';

  const resetFilters = () => {
    setSelectedSport('all');
    setSelectedCategory('all');
    setSelectedDept('all');
  };

  return (
    <div className="space-y-8">
      {/* Day Selector Tabs */}
      <div className="flex items-center justify-center">
        <div className="inline-flex p-1.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          {FEST_DAYS.map((day) => {
            const isSelected = selectedDay === day.id;
            return (
              <button
                key={day.id}
                onClick={() => setSelectedDay(day.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-display text-sm sm:text-base font-bold uppercase tracking-wider transition-all min-h-[44px] ${
                  isSelected
                    ? 'bg-blue-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-blue-900 hover:bg-slate-50'
                }`}
              >
                <Calendar className="w-4 h-4 shrink-0" />
                <span>{day.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter Fixtures</span>
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

      {/* Matches List */}
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
            title="Fixtures will be announced soon"
            message={`No scheduled fixtures found for ${
              FEST_DAYS.find((d) => d.id === selectedDay)?.label
            }${
              hasActiveFilters ? ' matching current filter criteria' : ''
            }. Full order of play will be published once released by the sports council.`}
          />
        )}
      </div>
    </div>
  );
}
