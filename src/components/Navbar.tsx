'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  siteName?: string;
}

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/sports', label: 'Sports' },
  { href: '/teams', label: 'Teams' },
  { href: '/schedule', label: 'Schedule' },
  { href: '/results', label: 'Results' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contacts', label: 'Contacts' },
  { href: '/doubts', label: 'Doubts' },
  { href: '/about', label: 'About' },
];

export function Navbar({ siteName = 'Arena 2026' }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo & Brand */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg p-1"
          >
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-full bg-slate-50 border border-slate-200 overflow-hidden flex items-center justify-center shadow-2xs">
              <Image
                src="/dtu-logo.png"
                alt="Delhi Technological University Seal"
                width={44}
                height={44}
                className="object-contain p-0.5"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl sm:text-2xl font-black tracking-wider text-blue-950 uppercase leading-none group-hover:text-blue-700 transition-colors">
                {siteName}
              </span>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest leading-tight">
                DTU Sports Fest
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold tracking-wide transition-colors min-h-[44px] flex items-center focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-600 ${
                    isActive
                      ? 'bg-blue-50 text-blue-800 border border-blue-200'
                      : 'text-slate-600 hover:text-blue-900 hover:bg-slate-100/70'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2.5 rounded-xl text-slate-700 hover:text-blue-900 hover:bg-slate-100 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-600 min-w-[44px] min-h-[44px]"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top duration-150">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-semibold tracking-wide min-h-[44px] flex items-center transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-800 border border-blue-200'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-blue-900'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
