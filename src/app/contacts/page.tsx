import { Metadata } from 'next';
import { getCoordinators, getVolunteers, getSports } from '@/lib/sheets';
import { ContactsView } from './ContactsView';

export const metadata: Metadata = {
  title: 'Coordinators & Volunteers | Arena 2026',
  description:
    'Contact directory for sports coordinators, convenors, and student organizing volunteers for Arena 2026 at DTU.',
};

export default async function ContactsPage() {
  const [coordinators, volunteers, sports] = await Promise.all([
    getCoordinators(),
    getVolunteers(),
    getSports(),
  ]);

  return (
    <div className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="mb-10 text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl sm:text-5xl font-display font-black uppercase text-blue-950 tracking-tight">
          Coordinators & Volunteers
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Official contact directory for tournament convenors, sport-specific coordinators, and student organizing committees.
        </p>
      </div>

      <ContactsView
        coordinators={coordinators}
        volunteers={volunteers}
        sports={sports}
      />
    </div>
  );
}

