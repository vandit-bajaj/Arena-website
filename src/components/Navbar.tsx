'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  ChevronDown,
  HelpCircle,
  Image as ImageIcon,
  Users,
  Info,
} from 'lucide-react';

interface NavbarProps {
  siteName?: string;
}

const primaryLinks = [
  { href: '/', label: 'Home' },
  { href: '/sports', label: 'Sports' },
  { href: '/teams', label: 'Teams' },
  { href: '/schedule', label: 'Schedule' },
  { href: '/results', label: 'Results' },
  { href: '/points', label: 'Points Table' },
];

const moreLinks = [
  {
    href: '/gallery',
    label: 'Gallery',
    description: 'Event moments & photos',
    icon: ImageIcon,
  },
  {
    href: '/contacts',
    label: 'Contacts',
    description: 'Coordinators & council',
    icon: Users,
  },
  {
    href: '/about',
    label: 'About',
    description: 'Tournament rules & history',
    icon: Info,
  },
];

export function Navbar({ siteName = 'Arena 2026' }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const pathname = usePathname();
  const moreDropdownRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click or Escape key
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        moreDropdownRef.current &&
        !moreDropdownRef.current.contains(event.target as Node)
      ) {
        setIsMoreOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsMoreOpen(false);
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMoreOpen(false);
    setIsOpen(false);
  }, [pathname]);

  const isMoreActive = moreLinks.some((item) => pathname === item.href);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo & Brand */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg p-1"
          >
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-full bg-slate-50 border border-slate-200 overflow-hidden flex items-center justify-center shadow-2xs">
                <Image
                  src="/dtu-logo.png"
                  alt="Delhi Technological University Seal"
                  width={40}
                  height={40}
                  className="object-contain p-0.5"
                  priority
                />
              </div>
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-full bg-slate-900 border border-slate-200 overflow-hidden flex items-center justify-center shadow-2xs">
                <Image
                  src="/sports-council-logo.png"
                  alt="Sports Council DTU Shield"
                  width={40}
                  height={40}
                  className="object-contain p-0.5"
                  priority
                />
              </div>
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

          {/* Desktop Navigation & Actions */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3">
            <nav className="flex items-center space-x-1" aria-label="Main Navigation">
              {primaryLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold tracking-wide transition-colors min-h-[40px] flex items-center focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-600 ${
                      isActive
                        ? 'bg-blue-50 text-blue-800 border border-blue-200'
                        : 'text-slate-600 hover:text-blue-900 hover:bg-slate-100/70'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              {/* More Dropdown */}
              <div className="relative" ref={moreDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsMoreOpen((prev) => !prev)}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold tracking-wide transition-colors min-h-[40px] flex items-center gap-1.5 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-600 cursor-pointer ${
                    isMoreActive || isMoreOpen
                      ? 'bg-blue-50 text-blue-800 border border-blue-200'
                      : 'text-slate-600 hover:text-blue-900 hover:bg-slate-100/70'
                  }`}
                  aria-expanded={isMoreOpen}
                  aria-haspopup="true"
                  aria-label="More navigation links"
                >
                  <span>More</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isMoreOpen ? 'rotate-180 text-blue-700' : 'text-slate-400'
                    }`}
                  />
                </button>

                {isMoreOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200/90 p-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      More Links
                    </div>
                    {moreLinks.map((link) => {
                      const Icon = link.icon;
                      const isActive = pathname === link.href;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsMoreOpen(false)}
                          className={`flex items-start gap-3 px-3 py-2.5 rounded-xl transition-colors group ${
                            isActive
                              ? 'bg-blue-50 text-blue-900 font-semibold'
                              : 'hover:bg-slate-50 text-slate-700 hover:text-blue-900'
                          }`}
                        >
                          <div
                            className={`mt-0.5 p-1.5 rounded-lg shrink-0 ${
                              isActive
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold leading-tight">{link.label}</span>
                            <span className="text-[11px] text-slate-400 group-hover:text-slate-500 leading-tight mt-0.5">
                              {link.description}
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </nav>

            {/* Doubts Small Filled Button on the right */}
            <div className="pl-2 border-l border-slate-200">
              <Link
                href="/doubts"
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-xs focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 ${
                  pathname === '/doubts'
                    ? 'bg-blue-700 text-white ring-2 ring-blue-600'
                    : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white hover:shadow-sm'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Doubts</span>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Controls */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/doubts"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-2xs"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Doubts</span>
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-xl text-slate-700 hover:text-blue-900 hover:bg-slate-100 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-600 min-w-[42px] min-h-[42px] cursor-pointer"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Collapses to Hamburger Menu) */}
      {isOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top duration-150 max-h-[calc(100vh-4.5rem)] overflow-y-auto scrollbar-thin">
          <div className="space-y-1">
            {primaryLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-3.5 py-2.5 rounded-xl text-base font-semibold tracking-wide flex items-center justify-between transition-colors min-h-[44px] ${
                    isActive
                      ? 'bg-blue-50 text-blue-800 border border-blue-200 font-bold'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-blue-900'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-blue-600" />}
                </Link>
              );
            })}
          </div>

          {/* More Section in Mobile Menu */}
          <div className="pt-2 border-t border-slate-100">
            <div className="px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              More Information
            </div>
            <div className="space-y-1 mt-1">
              {moreLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-base font-semibold min-h-[44px] transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-800 border border-blue-200'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-blue-900'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-slate-500" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Doubts Full Button in Mobile Menu */}
          <div className="pt-2 border-t border-slate-100">
            <Link
              href="/doubts"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-xs min-h-[44px]"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Ask Doubts / Query Form</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

