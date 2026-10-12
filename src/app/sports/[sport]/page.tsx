import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getSports, getMatches, getPlayers, getDepartments } from '@/lib/sheets';
import { SportDetailView } from './SportDetailView';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface SportPageProps {
  params: Promise<{
    sport: string;
  }>;
}

export async function generateStaticParams() {
  const sports = await getSports();
  return sports.map((s) => ({
    sport: s.sport_id,
  }));
}

export async function generateMetadata({ params }: SportPageProps): Promise<Metadata> {
  const { sport: sportSlug } = await params;
  const sports = await getSports();
  const sport = sports.find(
    (s) => s.sport_id.toLowerCase() === decodeURIComponent(sportSlug).toLowerCase()
  );

  if (!sport) {
    return { title: 'Sport Not Found | Arena 2026' };
  }

  return {
    title: `${sport.name} | Arena 2026 DTU`,
    description: `Fixtures, results, and department rosters for ${sport.name} at Arena 2026 DTU.`,
  };
}

export default async function SportDetailPage({ params }: SportPageProps) {
  const { sport: sportSlug } = await params;
  const decodedSlug = decodeURIComponent(sportSlug).toLowerCase();

  const [sports, matches, players, departments] = await Promise.all([
    getSports(),
    getMatches(),
    getPlayers(),
    getDepartments(),
  ]);

  const sport = sports.find((s) => s.sport_id.toLowerCase() === decodedSlug);

  if (!sport) {
    notFound();
  }

  // Filter items for this specific sport
  const sportMatches = matches.filter(
    (m) => m.sport_id.toLowerCase() === sport.sport_id.toLowerCase()
  );
  const sportPlayers = players.filter(
    (p) => p.sport_id.toLowerCase() === sport.sport_id.toLowerCase()
  );

  return (
    <div className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-8">
      {/* Back Link */}
      <div>
        <Link
          href="/sports"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Sports</span>
        </Link>
      </div>

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
          Arena 2026 Discipline
        </span>
        <h1 className="text-4xl sm:text-6xl font-display font-black uppercase text-blue-950 tracking-tight">
          {sport.name}
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Tournament schedule, live results, and department lineups for {sport.name}.
        </p>
      </div>

      {/* Sport Detail View */}
      <SportDetailView
        sport={sport}
        matches={sportMatches}
        players={sportPlayers}
        departments={departments}
      />
    </div>
  );
}
