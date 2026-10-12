import Link from 'next/link';
import Image from 'next/image';
import { getAllArenaData } from '@/lib/sheets';
import { Countdown } from '@/components/Countdown';
import { MatchCard } from '@/components/MatchCard';
import { EmptyState } from '@/components/EmptyState';
import { InstagramIcon } from '@/components/InstagramIcon';
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
                  <div className="text-[11px] font-semibold text-blue-900/90 bg-blue-50/70 border border-blue-100 rounded-md px-2 py-1 flex items-center gap-1.5">
                    <Users className="w-3 h-3 text-blue-600 shrink-0" />
                    <span className="truncate">{sport.nos_of_players}</span>
                  </div>
                )}

                <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-medium text-slate-500">
                  {sport.has_boys === true && (
                    <span className="px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                      Men
                    </span>
                  )}
                  {sport.has_girls === true && (
                    <span className="px-1.5 py-0.5 rounded-md bg-pink-50 text-pink-700 border border-pink-100">
                      Women
                    </span>
                  )}
                  {sport.has_boys === null && sport.has_girls === null && (
                    <span className="text-slate-400 italic">Categories TBA</span>
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
    </div>
  );
}
