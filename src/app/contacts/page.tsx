import { Metadata } from 'next';
import { getCoordinators, getSports } from '@/lib/sheets';
import { EmptyState } from '@/components/EmptyState';
import { Phone, Mail, User, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Coordinators & Contacts | Arena 2026',
  description:
    'Contact the sports coordinators, event managers, and officials organizing Arena 2026 at DTU.',
};

export default async function ContactsPage() {
  const [coordinators, sports] = await Promise.all([
    getCoordinators(),
    getSports(),
  ]);

  return (
    <div className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="mb-10 text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl sm:text-5xl font-display font-black uppercase text-blue-950 tracking-tight">
          Tournament Coordinators
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Reach out to sport-specific student coordinators and sports council convenors for assistance.
        </p>
      </div>

      {coordinators.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {coordinators.map((coord, idx) => {
            const sportName = coord.sport_id
              ? sports.find((s) => s.sport_id === coord.sport_id)?.name || coord.sport_id
              : 'General Tournament';

            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold uppercase tracking-wider border border-blue-100">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                      {sportName}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {coord.role || 'Coordinator'}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mt-2">
                    <div className="w-11 h-11 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                      <User className="w-5 h-5 text-slate-500" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold uppercase text-slate-900 tracking-wide">
                        {coord.name}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        {coord.role || 'Sports Coordinator'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contact Actions (min 44px height for mobile touch targets) */}
                <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
                  {coord.phone && (
                    <a
                      href={`tel:${coord.phone}`}
                      className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-800 text-xs sm:text-sm font-semibold transition-colors min-h-[44px]"
                    >
                      <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="font-mono">{coord.phone}</span>
                    </a>
                  )}

                  {coord.email && (
                    <a
                      href={`mailto:${coord.email}`}
                      className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-800 text-xs sm:text-sm font-semibold transition-colors min-h-[44px]"
                    >
                      <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                      <span className="truncate">{coord.email}</span>
                    </a>
                  )}

                  {!coord.phone && !coord.email && (
                    <p className="text-xs text-slate-400 italic py-1">
                      Direct contact info will be posted shortly.
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          title="Coordinator details will be announced soon"
          message="Student sport heads and tournament convenor contacts will be announced prior to the opening ceremony."
        />
      )}
    </div>
  );
}
