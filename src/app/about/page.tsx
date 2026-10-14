import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getSiteConfig } from '@/lib/sheets';
import { Shield, MapPin, Calendar, Clock, Trophy, BookOpen, Download, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Arena 2026 | DTU Sports Complex',
  description:
    'Learn about Arena 2026, the Annual Inter Departmental Sports Tournament organized by the DTU Department of Physical Education & Sports.',
};

export default async function AboutPage() {
  const config = await getSiteConfig();

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-12">
      {/* Title */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="flex items-center justify-center gap-3">
          <div className="w-16 h-16 rounded-full bg-white border border-slate-200 p-2 flex items-center justify-center shadow-xs">
            <Image
              src="/dtu-logo.png"
              alt="DTU Seal"
              width={48}
              height={48}
              className="object-contain"
            />
          </div>
          <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-200 p-2 flex items-center justify-center shadow-xs">
            <Image
              src="/sports-council-logo.png"
              alt="Sports Council DTU Shield"
              width={48}
              height={48}
              className="object-contain"
            />
          </div>
        </div>
        <h1 className="text-4xl sm:text-6xl font-display font-black uppercase text-blue-950 tracking-tight">
          About {config.site_name}
        </h1>
        <p className="text-base sm:text-lg text-slate-600 font-medium">
          {config.subtitle} • Delhi Technological University
        </p>
      </div>

      {/* Facts Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
            Organised By
          </span>
          <p className="font-semibold text-slate-900 text-sm">{config.organiser}</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Calendar className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
            Tournament Dates
          </span>
          <p className="font-semibold text-slate-900 text-sm">{config.event_dates_text}</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <MapPin className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
            Venue
          </span>
          <p className="font-semibold text-slate-900 text-sm">{config.venue}</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Clock className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
            Opening Ceremony
          </span>
          <p className="font-semibold text-slate-900 text-sm">8:30 AM (16 October 2026)</p>
        </div>
      </div>

      {/* Overview Content */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs p-8 sm:p-12 space-y-8">
        <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
          <h2 className="font-display text-2xl font-bold uppercase text-blue-950 tracking-wide">
            The Spirit of Arena
          </h2>
          <p>
            <strong>Arena 2026</strong> is the premier annual inter-departmental sports tournament
            at Delhi Technological University (formerly Delhi College of Engineering). Organised by
            the <strong>{config.organiser}</strong>, the tournament brings together students,
            athletes, and sports enthusiasts from across academic departments to compete at the
            highest athletic level.
          </p>
          <p>
            With the rallying motto <span className="italic font-semibold text-blue-900">&ldquo;{config.tagline}&rdquo;</span>,
            Arena fosters sportsmanship, team resilience, and fitness across eleven sanctioned sports:
            Cricket, Football, Basketball, Volleyball, Kabaddi, Lawn Tennis, Athletics, Badminton,
            Chess, Table Tennis, and Carom (Mixed).
          </p>
        </div>

        <div className="pt-6 border-t border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-display text-lg font-bold uppercase text-slate-900 tracking-wide">
              DTU Sports Complex
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              State-of-the-art facilities hosting synthetic courts, outdoor turf grounds, running
              tracks, indoor sports arenas, and fitness complexes.
            </p>
          </div>
        </div>
      </div>

      {/* Rulebook Banner Card */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-sky-300 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Tournament Guidelines</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-black uppercase tracking-tight text-white">
            Official Tournament Rulebook
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Read complete eligibility terms, knockout formats, scoring rules, overs, and the ARENA Cup points system.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
          <Link
            href="/rules"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-colors min-h-[44px]"
          >
            <span>Explore Rules</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="/Rulebook.pdf"
            download="ARENA_2026_Rulebook.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 font-bold text-xs uppercase tracking-wider transition-colors min-h-[44px]"
          >
            <Download className="w-4 h-4 text-sky-300" />
            <span>Download PDF</span>
          </a>
        </div>
      </div>
    </div>
  );
}
