import { Metadata } from 'next';
import { getSiteConfig } from '@/lib/sheets';
import { HelpCircle, ExternalLink, MessageSquare, CheckCircle, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Doubts & Inquiries | Arena 2026',
  description:
    'Submit queries, dispute clarifications, or schedule requests for Arena 2026 at DTU.',
};

export default async function DoubtsPage() {
  const config = await getSiteConfig();

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-8 sm:p-12 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-2xs">
          <HelpCircle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
            Participant Help Desk
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-black uppercase text-blue-950 tracking-tight">
            Have Questions or Doubts?
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
            Need clarification regarding fixtures, player eligibility, department rosters, or court
            allocations? Submit your inquiry through our official Google Form.
          </p>
        </div>

        {/* Guidelines Box */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 text-left max-w-lg mx-auto space-y-3">
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-slate-800">
            Before submitting your query:
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Ensure your roll number and department are correctly entered.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>For urgent fixture conflicts, contact your sport coordinator directly.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Responses are reviewed regularly by the Sports Council secretariat.</span>
            </li>
          </ul>
        </div>

        {/* Action Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          {config.doubts_form_url ? (
            <a
              href={config.doubts_form_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-display text-base font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all min-h-[48px]"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Open Doubts Form</span>
              <ExternalLink className="w-4 h-4 opacity-75" />
            </a>
          ) : (
            <div className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-100 text-slate-400 font-display text-sm font-bold uppercase tracking-wider border border-slate-200">
              <span>Doubts Form Coming Soon</span>
            </div>
          )}

          {config.contact_email && (
            <a
              href={`mailto:${config.contact_email}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-sm border border-slate-200 transition-colors min-h-[48px]"
            >
              <Mail className="w-4 h-4 text-slate-500" />
              <span>Email Support</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
