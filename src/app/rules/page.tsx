import { Metadata } from 'next';
import { RulesView } from './RulesView';

export const metadata: Metadata = {
  title: 'Rulebook & Regulations | Arena 2026 DTU',
  description:
    'Official tournament rulebook for Arena 2026 at DTU. Match formats, eligibility, championship points, overs, durations, and discipline guidelines.',
};

export default function RulesPage() {
  return (
    <div className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <RulesView />
    </div>
  );
}
