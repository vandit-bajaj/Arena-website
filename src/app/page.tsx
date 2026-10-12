import { getAllArenaData } from '@/lib/sheets';

export default async function HomePage() {
  const data = await getAllArenaData();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 text-slate-900">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center space-y-4">
        <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-200 tracking-wider uppercase">
          {data.config.organiser}
        </span>
        <h1 className="text-4xl sm:text-5xl font-display font-black text-blue-900 tracking-tight">
          {data.config.site_name}
        </h1>
        <p className="text-slate-600 font-medium">{data.config.subtitle}</p>
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm text-slate-700 space-y-1">
          <p>
            <strong>Dates:</strong> {data.config.event_dates_text}
          </p>
          <p>
            <strong>Venue:</strong> {data.config.venue}
          </p>
          <p>
            <strong>Tagline:</strong> &ldquo;{data.config.tagline}&rdquo;
          </p>
        </div>
        <p className="text-xs text-slate-400">
          Scaffolding verified: {data.sports.length} sports pre-seeded from poster.
        </p>
      </div>
    </main>
  );
}
