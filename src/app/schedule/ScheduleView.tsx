'use client';

import { useState, useMemo } from 'react';
import { Match, Sport, Department } from '@/lib/schemas';
import { MatchCard } from '@/components/MatchCard';
import { EmptyState } from '@/components/EmptyState';
import { Calendar, Filter, X, Clock } from 'lucide-react';
import { normalizeDateKey, formatFriendlyDate, parseTimeToMinutes } from '@/lib/utils';

interface ScheduleViewProps {
  matches: Match[];
  sports: Sport[];
  departments: Department[];
}

const FEST_DAYS = [
  { id: 'all', label: 'All Days', key: 'all' },
  { id: '16', label: 'Day 1 (Fri, 16 Oct)', key: '2026-10-16' },
  { id: '17', label: 'Day 2 (Sat, 17 Oct)', key: '2026-10-17' },
  { id: '18', label: 'Day 3 (Sun, 18 Oct)', key: '2026-10-18' },
];

export function ScheduleView({ matches, sports, departments }: ScheduleViewProps) {
  const [selectedDay, setSelectedDay] = useState<string>('all');
  const [selectedSport, setSelectedSport] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDept, setSelectedDept] = useState<string>('all');

  // Filter scheduled matches
  const scheduledMatches = useMemo(() => {
    return matches.filter((m) => m.status === 'Scheduled');
  }, [matches]);

  // Filter by selected day, sport, category, department
  const filteredMatches = useMemo(() => {
    return scheduledMatches
      .filter((m) => {
        // Day filter:
        if (selectedDay !== 'all') {
          const matchDateKey = normalizeDateKey(m.date);
          const targetDayObj = FEST_DAYS.find((d) => d.id === selectedDay);
          if (targetDayObj && targetDayObj.key !== 'all') {
            if (matchDateKey !== targetDayObj.key) {
              return false;
            }
          }
        }

        // Sport filter
        if (selectedSport !== 'all' && m.sport_id.toLowerCase() !== selectedSport.toLowerCase()) {
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
      })
      .sort((a, b) => {
        // Sort Date first
        const dateA = normalizeDateKey(a.date);
        const dateB = normalizeDateKey(b.date);
        if (dateA !== dateB) {
          if (!dateA) return 1;
          if (!dateB) return -1;
          return dateA.localeCompare(dateB);
        }

        // Then sort Time
        const timeA = parseTimeToMinutes(a.time);
        const timeB = parseTimeToMinutes(b.time);
        if (timeA !== timeB) {
          return timeA - timeB;
        }

        return a.match_id.localeCompare(b.match_id);
      });
  }, [scheduledMatches, selectedDay, selectedSport, selectedCategory, selectedDept]);

  // Group filtered matches by normalized date
  const groupedMatches = useMemo(() => {
    const map = new Map<string, Match[]>();

    filteredMatches.forEach((m) => {
      const key = normalizeDateKey(m.date) || 'tba';
      if (!map.has(key)) {
        map.set(key, []);
      }
      map.get(key)!.push(m);
    });

    const groups: { dateKey: string; friendlyTitle: string; matches: Match[] }[] = [];
    const sortedKeys = Array.from(map.keys()).sort();
    sortedKeys.forEach((key) => {
      groups.push({
        dateKey: key,
        friendlyTitle: key === 'tba' ? 'Date To Be Announced' : formatFriendlyDate(key),
        matches: map.get(key)!,
      });
    });

    return groups;
  }, [filteredMatches]);

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
      <div className="flex items-center justify-center px-1">
        <div className="inline-flex p-1 sm:p-1.5 rounded-2xl bg-white border border-slate-200 shadow-2xs max-w-full overflow-x-auto scrollbar-thin">
          {FEST_DAYS.map((day) => {
            const isSelected = selectedDay === day.id;
            // Match count for badge
            const count =
              day.id === 'all'
                ? scheduledMatches.length
                : scheduledMatches.filter((m) => normalizeDateKey(m.date) === day.key).length;

            return (
              <button
                key={day.id}
                onClick={() => setSelectedDay(day.id)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2.5 sm:py-3 rounded-xl font-display text-xs sm:text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-all min-h-[44px] shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-blue-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-blue-900 hover:bg-slate-50'
                }`}
              >
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>{day.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {count}
                </span>
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
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
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
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-600 min-h-[44px] cursor-pointer"
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
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-600 min-h-[44px] cursor-pointer"
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
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-600 min-h-[44px] cursor-pointer"
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

      {/* Date-wise Matches Groups */}
      {groupedMatches.length > 0 ? (
        <div className="space-y-10">
          {groupedMatches.map((group) => (
            <div key={group.dateKey} className="space-y-4">
              {/* Date Header Banner */}
              <div className="flex items-center justify-between pb-3 border-b-2 border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-900 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg sm:text-xl font-bold uppercase text-slate-900 tracking-wide">
                      {group.friendlyTitle}
                    </h3>
                  </div>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  {group.matches.length} {group.matches.length === 1 ? 'fixture' : 'fixtures'}
                </span>
              </div>

              {/* Match Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {group.matches.map((match) => (
                  <MatchCard
                    key={match.match_id}
                    match={match}
                    departments={departments}
                    sports={sports}
                  />
                ))}
              </div>
            </div>
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
  );
}
