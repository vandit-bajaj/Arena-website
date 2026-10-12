import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Mail, ExternalLink } from 'lucide-react';
import { InstagramIcon } from '@/components/InstagramIcon';
import { SiteConfig } from '@/lib/schemas';

interface FooterProps {
  config: SiteConfig;
}

export function Footer({ config }: FooterProps) {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-auto border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 shrink-0">
                <div className="w-10 h-10 rounded-full bg-white p-1 flex items-center justify-center shrink-0">
                  <Image
                    src="/dtu-logo.png"
                    alt="DTU Crest"
                    width={36}
                    height={36}
                    className="object-contain"
                  />
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700 p-1 flex items-center justify-center shrink-0">
                  <Image
                    src="/sports-council-logo.png"
                    alt="Sports Council DTU Shield"
                    width={36}
                    height={36}
                    className="object-contain"
                  />
                </div>
              </div>
              <div>
                <h3 className="font-display text-2xl font-black text-white tracking-wider uppercase">
                  {config.site_name}
                </h3>
                <p className="text-xs text-slate-400 font-medium">{config.subtitle}</p>
              </div>
            </div>

            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Organised by the{' '}
              <strong className="text-slate-200">{config.organiser}</strong>. Annual festival
              celebrating athletic spirit, sportsmanship, and inter-departmental camaraderie at DTU.
            </p>

            <div className="inline-block px-3 py-1 bg-blue-950/80 border border-blue-800/80 rounded-full text-blue-300 font-display text-sm tracking-wider uppercase">
              &ldquo;{config.tagline}&rdquo;
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
              <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
              <span>{config.venue}, Delhi Technological University</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/schedule"
                  className="hover:text-blue-400 transition-colors py-1 inline-block"
                >
                  Match Schedule
                </Link>
              </li>
              <li>
                <Link
                  href="/results"
                  className="hover:text-blue-400 transition-colors py-1 inline-block"
                >
                  Live Results
                </Link>
              </li>
              <li>
                <Link
                  href="/points"
                  className="hover:text-amber-400 text-amber-200/90 font-semibold transition-colors py-1 inline-block"
                >
                  Points Table
                </Link>
              </li>
              <li>
                <Link
                  href="/teams"
                  className="hover:text-blue-400 transition-colors py-1 inline-block"
                >
                  Department Teams
                </Link>
              </li>
              <li>
                <Link
                  href="/sports"
                  className="hover:text-blue-400 transition-colors py-1 inline-block"
                >
                  Tournament Sports
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="hover:text-blue-400 transition-colors py-1 inline-block"
                >
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/contacts"
                  className="hover:text-blue-400 transition-colors py-1 inline-block"
                >
                  Coordinators
                </Link>
              </li>
              <li>
                <Link
                  href="/doubts"
                  className="hover:text-blue-400 transition-colors py-1 inline-block"
                >
                  Doubts & Inquiries
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-blue-400 transition-colors py-1 inline-block"
                >
                  About Tournament
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials & Help */}
          <div className="space-y-3">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Connect & Help
            </h4>
            <div className="space-y-3">
              {config.instagram_url ? (
                <a
                  href={config.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm hover:text-pink-400 transition-colors min-h-[44px]"
                >
                  <InstagramIcon className="w-5 h-5 text-pink-500 shrink-0" />
                  <span>@sc_dtu Instagram</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </a>
              ) : (
                <span className="text-xs text-slate-500">Instagram link coming soon</span>
              )}

              {config.doubts_form_url ? (
                <a
                  href={config.doubts_form_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm hover:text-blue-400 transition-colors min-h-[44px]"
                >
                  <Mail className="w-5 h-5 text-blue-400 shrink-0" />
                  <span>Doubts & Queries Form</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </a>
              ) : (
                <span className="text-xs text-slate-500">Doubts form coming soon</span>
              )}
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© 2026 {config.footer_note}. All rights reserved.</p>
          <p className="font-mono text-[11px] text-slate-500">
            Arena 2026 • 16, 17 & 18 October 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
