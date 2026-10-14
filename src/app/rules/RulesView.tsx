'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Download,
  HelpCircle,
  Shield,
  Trophy,
  Clock,
  IdCard,
  Search,
  Filter,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  FileText,
  AlertTriangle,
  Scale,
  Sparkles,
} from 'lucide-react';
import {
  GENERAL_RULES,
  POINTS_SYSTEM,
  SPORT_RULES,
  SportRule,
} from '@/data/rulesData';

export function RulesView() {
  const [selectedSport, setSelectedSport] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAllGeneral, setShowAllGeneral] = useState<boolean>(false);

  // Filtered sports based on sport pill and search query
  const filteredSports = useMemo(() => {
    return SPORT_RULES.filter((sport) => {
      // Sport filter
      if (selectedSport !== 'all' && sport.sport_id !== selectedSport) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = sport.name.toLowerCase().includes(q);
        const matchesGov = (sport.governingBody || '').toLowerCase().includes(q);
        const matchesFormat = JSON.stringify(sport.format).toLowerCase().includes(q);
        const matchesRules = sport.rules.some((r) => r.toLowerCase().includes(q));
        const matchesSubsections = (sport.subsections || []).some(
          (sub) =>
            sub.title.toLowerCase().includes(q) ||
            sub.items.some((item) => item.toLowerCase().includes(q))
        );

        return (
          matchesName ||
          matchesGov ||
          matchesFormat ||
          matchesRules ||
          matchesSubsections
        );
      }

      return true;
    });
  }, [selectedSport, searchQuery]);

  return (
    <div className="space-y-12">
      {/* 1. Hero Action Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-10 shadow-xl border border-blue-900/40">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-sky-300 text-xs font-bold uppercase tracking-wider">
              <Scale className="w-3.5 h-3.5 text-sky-300" />
              <span>Official Tournament Guidelines</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-white">
              Rules & Regulations
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Official eligibility criteria, knockout match formats, championship points distribution,
              and disciplinary rules governing all 11 disciplines for Arena 2026.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <a
              href="/Rulebook.pdf"
              download="ARENA_2026_Rulebook.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm uppercase tracking-wider transition-all shadow-md hover:shadow-lg cursor-pointer min-h-[48px]"
            >
              <Download className="w-4 h-4" />
              <span>Download Rulebook (PDF)</span>
            </a>
            <Link
              href="/doubts"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 font-bold text-sm uppercase tracking-wider transition-all min-h-[48px]"
            >
              <HelpCircle className="w-4 h-4 text-sky-300" />
              <span>Ask a Doubt</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Key Tournament Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Eligibility Card */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2.5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
            <IdCard className="w-5 h-5" />
          </div>
          <h3 className="font-display font-bold uppercase text-slate-900 text-sm tracking-wide">
            Regular Students Only
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Only regular DTU students are eligible. Physical University ID Cards must be presented upon request. Outside players cause immediate disqualification.
          </p>
        </div>

        {/* 15-Minute Rule Card */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2.5">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="font-display font-bold uppercase text-slate-900 text-sm tracking-wide">
            15-Min Reporting Rule
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Teams must report 15 minutes before match time. Failure to report within 15 minutes of scheduled time results in walkover (bye) to the opponent.
          </p>
        </div>

        {/* Points System Card */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Trophy className="w-5 h-5" />
          </div>
          <h3 className="font-display font-bold uppercase text-slate-900 text-sm tracking-wide">
            ARENA Championship
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            🥇 Gold: <strong>10 Pts</strong> • 🥈 Silver: <strong>7 Pts</strong> • 🥉 Bronze: <strong>5 Pts</strong>. The department with highest points wins the ARENA Cup.
          </p>
        </div>

        {/* Disciplinary Card */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2.5">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="font-display font-bold uppercase text-slate-900 text-sm tracking-wide">
            Official Disciplinary Code
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Decision of Umpires and Referees is final and binding. Zero tolerance for dissent or unsportsmanlike behavior. No spike shoes in cricket.
          </p>
        </div>
      </div>

      {/* 3. Points System Breakdown Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <h2 className="font-display text-xl sm:text-2xl font-bold uppercase text-slate-900 tracking-wide">
                ARENA Cup Points System
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500">
              Department-wise points allocation applied towards the overall Annual Sports Championship.
            </p>
          </div>
          <Link
            href="/points"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 hover:text-blue-800 transition-colors"
          >
            <span>View Live Points Table</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-center space-y-2">
            <span className="text-3xl">🥇</span>
            <h4 className="font-display font-bold uppercase text-amber-900 text-sm tracking-wider">
              {POINTS_SYSTEM.gold.position}
            </h4>
            <div className="text-3xl font-display font-black text-amber-800">
              {POINTS_SYSTEM.gold.label}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-100 border border-slate-300 text-center space-y-2">
            <span className="text-3xl">🥈</span>
            <h4 className="font-display font-bold uppercase text-slate-800 text-sm tracking-wider">
              {POINTS_SYSTEM.silver.position}
            </h4>
            <div className="text-3xl font-display font-black text-slate-700">
              {POINTS_SYSTEM.silver.label}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-orange-50/70 border border-orange-200 text-center space-y-2">
            <span className="text-3xl">🥉</span>
            <h4 className="font-display font-bold uppercase text-orange-950 text-sm tracking-wider">
              {POINTS_SYSTEM.bronze.position}
            </h4>
            <div className="text-3xl font-display font-black text-orange-800">
              {POINTS_SYSTEM.bronze.label}
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-500 bg-slate-50 p-4 rounded-xl border border-slate-200/80 leading-relaxed italic">
          &ldquo;{POINTS_SYSTEM.trophy_note}&rdquo;
        </p>
      </div>

      {/* 4. General Rules Accordion */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-5">
          <div className="flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-blue-600" />
            <h2 className="font-display text-xl sm:text-2xl font-bold uppercase text-slate-900 tracking-wide">
              General Tournament Rules
            </h2>
          </div>
          <button
            onClick={() => setShowAllGeneral(!showAllGeneral)}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 hover:text-blue-800 cursor-pointer min-h-[44px]"
          >
            <span>{showAllGeneral ? 'Collapse Rules' : 'Expand All (10 Rules)'}</span>
            {showAllGeneral ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(showAllGeneral ? GENERAL_RULES : GENERAL_RULES.slice(0, 4)).map(
            (rule, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <h4 className="font-display font-bold uppercase text-slate-900 text-xs tracking-wide">
                    {rule.title}
                  </h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-8">
                  {rule.description}
                </p>
              </div>
            )
          )}
        </div>
      </div>

      {/* 5. Sport-by-Sport Rules Section */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-display font-black uppercase text-blue-950 tracking-tight">
              Sport-Specific Rulebooks
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Match formats, overs, sets, durations, fouls, and tie-breakers across disciplines.
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          <button
            onClick={() => setSelectedSport('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer min-h-[40px] ${
              selectedSport === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            All Disciplines ({SPORT_RULES.length})
          </button>
          {SPORT_RULES.map((sport) => (
            <button
              key={sport.sport_id}
              onClick={() => setSelectedSport(sport.sport_id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer min-h-[40px] ${
                selectedSport === sport.sport_id
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:text-blue-900 hover:border-blue-300'
              }`}
            >
              {sport.name}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search rules (e.g., 'super over', 'substitutions', 'queen', 'penalty', 'overs', '11 points')..."
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-600 shadow-2xs min-h-[44px]"
          />
        </div>

        {/* Sports Cards Grid */}
        {filteredSports.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredSports.map((sport) => (
              <div
                key={sport.sport_id}
                className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-5">
                  {/* Card Header */}
                  <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-display font-black uppercase text-slate-900 tracking-wide">
                        {sport.name}
                      </h3>
                      {sport.governingBody && (
                        <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
                          Governed by: <span className="text-blue-700 font-bold">{sport.governingBody}</span>
                        </p>
                      )}
                    </div>
                    <Link
                      href={`/sports/${sport.sport_id}`}
                      className="text-xs font-bold uppercase tracking-wider text-blue-600 hover:text-blue-800 transition-colors shrink-0"
                    >
                      View Matches &rarr;
                    </Link>
                  </div>

                  {/* Format of Match */}
                  <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-900 block">
                      Match Format & Durations
                    </span>
                    {sport.format.rounds ? (
                      <div className="space-y-1.5">
                        {sport.format.rounds.map((round, rIdx) => (
                          <div
                            key={rIdx}
                            className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1 border-b border-blue-100/60 pb-1 last:border-0 last:pb-0"
                          >
                            <span className="font-semibold text-slate-800">
                              {round.stage}:
                            </span>
                            <span className="font-mono text-blue-950 font-bold">
                              {round.detail}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-xs space-y-1 text-slate-800">
                        {sport.format.men && (
                          <p>
                            <strong className="text-blue-950">Men:</strong> {sport.format.men}
                          </p>
                        )}
                        {sport.format.women && (
                          <p>
                            <strong className="text-blue-950">Women:</strong> {sport.format.women}
                          </p>
                        )}
                        {sport.format.general && (
                          <p className="font-medium text-slate-800">{sport.format.general}</p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Rules Bullet Points */}
                  <div className="space-y-2.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                      Discipline Rules & Regulations
                    </span>
                    <ul className="space-y-2">
                      {sport.rules.map((rule, ruleIdx) => (
                        <li key={ruleIdx} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Subsections (like Carrom Queen / Fouls) */}
                  {sport.subsections && (
                    <div className="space-y-4 pt-3 border-t border-slate-100">
                      {sport.subsections.map((sub, sIdx) => (
                        <div key={sIdx} className="space-y-1.5">
                          <h5 className="font-display font-bold uppercase text-slate-900 text-xs tracking-wider">
                            {sub.title}
                          </h5>
                          <ul className="space-y-1">
                            {sub.items.map((item, itemIdx) => (
                              <li key={itemIdx} className="text-xs text-slate-600 pl-4 relative before:content-['•'] before:absolute before:left-1 before:text-blue-600">
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-3xl bg-white border border-slate-200 space-y-3">
            <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto" />
            <h3 className="font-display font-bold uppercase text-slate-800">No Rules Match Your Search</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              No specific rules matched &ldquo;{searchQuery}&rdquo;. Try searching for general terms like &ldquo;penalty&rdquo;, &ldquo;overs&rdquo;, or &ldquo;points&rdquo;.
            </p>
          </div>
        )}
      </div>

      {/* 6. Official Disclaimer Footer Note */}
      <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed space-y-1">
        <p className="font-semibold text-slate-800">
          Official Tournament Disclaimer:
        </p>
        <p>
          Rules and match overs/durations are subject to modification by the Arena 2026 Organising Committee due to weather, light conditions, or tournament scheduling constraints. In all instances of dispute or interpretation, the decision of the official DTU umpires and organising committee is final and binding.
        </p>
      </div>
    </div>
  );
}
