import Link from 'next/link';
import Image from 'next/image';
import { getAllArenaData } from '@/lib/sheets';
import { calculateDepartmentStandings } from '@/lib/points';
import { Countdown } from '@/components/Countdown';
import { MatchCard } from '@/components/MatchCard';
import { EmptyState } from '@/components/EmptyState';
import { InstagramIcon } from '@/components/InstagramIcon';
import { TrophyShowcase } from '@/components/TrophyShowcase';
import {
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  HelpCircle,
  Users,
  Trophy,
  Images,
  Activity,
} from 'lucide-react';

export default async function HomePage() {
  const { config, sports, matches, departments, announcements } = await getAllArenaData();

  // Latest 5 completed matches
  const completedMatches = matches
    .filter((m) => m.status === 'Completed')
    .slice(-5)
    .reverse();

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-blue-800 to-slate-900 text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-blue-950">
        {/* Background decorative subtle blur */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          {/* Organiser Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-sky-200 text-xs sm:text-sm font-semibold tracking-wider uppercase backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            {config.organiser}
          </div>

          {/* Main Title & Subtitle */}
          <div className="space-y-2">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-black tracking-wider uppercase text-white drop-shadow-md">
              {config.site_name}
            </h1>
            <p className="text-base sm:text-xl lg:text-2xl text-blue-100 font-medium tracking-wide max-w-2xl mx-auto">
              {config.subtitle}
            </p>
          </div>

          {/* Tagline Badge */}
          <div className="pt-2">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white font-display text-sm sm:text-base tracking-widest uppercase border border-white/20 shadow-xs">
              &ldquo;{config.tagline}&rdquo;
            </span>
          </div>

          {/* Date & Venue Info Chips */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto pt-4 text-xs sm:text-sm text-slate-200">
            <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <Calendar className="w-4 h-4 text-sky-300 shrink-0" />
              <span>{config.event_dates_text}</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <MapPin className="w-4 h-4 text-sky-300 shrink-0" />
              <span>{config.venue}</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <Clock className="w-4 h-4 text-sky-300 shrink-0" />
              <span>Starts 8:30 AM (16 Oct)</span>
            </div>
          </div>

          {/* Live IST Countdown */}
          <div className="pt-6">
            <Countdown targetIso={config.event_start_datetime} />
          </div>

          {/* Quick CTA Links */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-6">
            <Link
              href="/schedule"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-md transition-all min-h-[44px]"
            >
              <span>View Schedule</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/teams"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all min-h-[44px]"
            >
              <Users className="w-4 h-4" />
              <span>Department Teams</span>
            </Link>
            <Link
              href="/results"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all min-h-[44px]"
            >
              <Trophy className="w-4 h-4" />
              <span>Live Results</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Quick Action Bar */}
      <section className="bg-white border-b border-slate-200 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-medium">
          <Link
            href="/schedule"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 transition-colors min-h-[44px]"
          >
            <Calendar className="w-4 h-4 text-blue-600" />
            <span>Schedule</span>
          </Link>
          <Link
            href="/teams"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 transition-colors min-h-[44px]"
          >
            <Users className="w-4 h-4 text-blue-600" />
            <span>Teams</span>
          </Link>
          <Link
            href="/points"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-50 hover:bg-amber-50 text-slate-700 hover:text-amber-800 border border-slate-200 transition-colors min-h-[44px]"
          >
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>Points Table</span>
          </Link>
          <Link
            href="/gallery"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 transition-colors min-h-[44px]"
          >
            <Images className="w-4 h-4 text-blue-600" />
            <span>Gallery</span>
          </Link>
          {config.doubts_form_url ? (
            <a
              href={config.doubts_form_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 transition-colors min-h-[44px]"
            >
              <HelpCircle className="w-4 h-4 text-blue-600" />
              <span>Doubts Form</span>
            </a>
          ) : (
            <span className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-50 text-slate-400 border border-slate-200 text-xs">
              <HelpCircle className="w-4 h-4" />
              <span>Doubts Form (Coming soon)</span>
            </span>
          )}
          {config.instagram_url ? (
            <a
              href={config.instagram_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-50 hover:bg-pink-50 text-slate-700 hover:text-pink-700 border border-slate-200 transition-colors min-h-[44px]"
            >
              <InstagramIcon className="w-4 h-4 text-pink-600" />
              <span>Instagram (@sc_dtu)</span>
            </a>
          ) : (
            <span className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-50 text-slate-400 border border-slate-200 text-xs">
              <InstagramIcon className="w-4 h-4" />
              <span>Instagram (Coming soon)</span>
            </span>
          )}
        </div>
      </section>

      {/* 3.5. Championship Trophy Showcase */}
      <section className="pt-8 sm:pt-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <TrophyShowcase />
      </section>

      {/* 4. The 9 Sports Grid */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900 tracking-wide uppercase">
              Tournament Sports
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {sports.length} sanctioned disciplines competing for inter-departmental glory
            </p>
          </div>
          <Link
            href="/sports"
            className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 min-h-[44px]"
          >
            <span>All Sports</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {sports.map((sport) => (
            <Link
              key={sport.sport_id}
              href={`/sports/${sport.sport_id}`}
              className="group relative p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between min-h-[130px]"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-base sm:text-lg font-bold uppercase text-slate-900 group-hover:text-blue-700 transition-colors tracking-wide">
                  {sport.name}
                </span>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all shrink-0" />
              </div>

              <div className="space-y-2 mt-3">
                {sport.nos_of_players && (
                  <div className="text-[11px] font-bold text-blue-950 bg-blue-100 border border-blue-200 rounded-md px-2 py-0.5 flex items-center gap-1.5 shadow-2xs">
                    <Users className="w-3 h-3 text-blue-700 shrink-0" />
                    <span className="truncate">{sport.nos_of_players}</span>
                  </div>
                )}

                <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold">
                  {sport.has_boys === true && (
                    <span className="px-2 py-0.5 rounded-md bg-blue-600 text-white uppercase shadow-2xs">
                      Men
                    </span>
                  )}
                  {sport.has_girls === true && (
                    <span className="px-2 py-0.5 rounded-md bg-pink-600 text-white uppercase shadow-2xs">
                      Women
                    </span>
                  )}
                  {sport.has_boys === null && sport.has_girls === null && (
                    <span className="text-slate-400 italic font-normal">Categories TBA</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Latest 5 Results */}
      <section className="py-12 sm:py-16 bg-slate-100/60 border-t border-slate-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900 tracking-wide uppercase">
                  Latest Results
                </h2>
                <p className="text-sm text-slate-500">Live scores from the playing fields</p>
              </div>
            </div>

            <Link
              href="/results"
              className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 min-h-[44px]"
            >
              <span>View All Results</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {completedMatches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {completedMatches.map((match) => (
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
              message="No match results have been posted yet. Live scores will appear here as soon as games conclude."
            />
          )}
        </div>
      </section>

      {/* 6. Department Points Table Preview */}
      <section className="py-12 sm:py-16 bg-white border-t border-slate-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900 tracking-wide uppercase">
                  Points Table
                </h2>
                <p className="text-sm text-slate-500">
                  Overall championship team rankings, points, wins, and losses
                </p>
              </div>
            </div>

            <Link
              href="/points"
              className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 min-h-[44px]"
            >
              <span>View Full Table</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto scrollbar-thin">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-display uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-4 text-center w-14 whitespace-nowrap">Rank</th>
                    <th className="py-3 px-4 font-bold min-w-[140px]">Department</th>
                    <th className="py-3 px-3 text-center whitespace-nowrap">Played</th>
                    <th className="py-3 px-3 text-center text-emerald-700 font-bold whitespace-nowrap">Won</th>
                    <th className="py-3 px-3 text-center text-rose-700 font-bold whitespace-nowrap">Lost</th>
                    <th className="py-3 px-3 text-center text-slate-600 whitespace-nowrap">Draw</th>
                    <th className="py-3 px-4 text-center text-blue-900 font-black text-sm sm:text-base bg-blue-50/50 whitespace-nowrap">
                      Points
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {calculateDepartmentStandings(departments, matches)
                    .slice(0, 5)
                    .map((item) => (
                      <tr key={item.dept_id} className="hover:bg-blue-50/30 transition-colors">
                        <td className="py-3 px-4 text-center font-display font-black text-sm">
                          {item.rank === 1 && item.points > 0 ? (
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-400 text-amber-950 text-xs font-black ring-2 ring-amber-500 shadow-xs">
                              1
                            </span>
                          ) : item.rank === 2 && item.points > 0 ? (
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-300 text-slate-900 text-xs font-black ring-2 ring-slate-400 shadow-xs">
                              2
                            </span>
                          ) : item.rank === 3 && item.points > 0 ? (
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-700 text-white text-xs font-black ring-2 ring-amber-600 shadow-xs">
                              3
                            </span>
                          ) : (
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold text-xs border border-slate-200">
                              {item.rank}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-900">
                            {item.name}
                          </div>
                          <span className="text-[11px] font-mono font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                            {item.dept_id}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span className="inline-flex items-center justify-center min-w-[26px] px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-800 font-bold text-xs border border-slate-200">
                            {item.played}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span className="inline-flex items-center justify-center min-w-[26px] px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-300">
                            {item.won}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span className="inline-flex items-center justify-center min-w-[26px] px-1.5 py-0.5 rounded-md bg-rose-50 text-rose-700 font-semibold text-xs border border-rose-200">
                            {item.lost}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span className="inline-flex items-center justify-center min-w-[26px] px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium text-xs border border-slate-200">
                            {item.drawn}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center bg-blue-50/50">
                          <span className="inline-flex items-center justify-center min-w-[34px] px-2 py-0.5 rounded-md bg-blue-950 text-amber-300 font-black text-sm shadow-2xs border border-blue-900">
                            {item.points}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <div className="p-3.5 bg-slate-50 border-t border-slate-100 text-center text-xs text-slate-500">
              <Link
                href="/points"
                className="text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center gap-1"
              >
                <span>Explore complete rankings across all 15 departments and 11 sports</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
