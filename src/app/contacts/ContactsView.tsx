'use client';

import { useState, useMemo } from 'react';
import { Coordinator, Volunteer, Sport } from '@/lib/schemas';
import { EmptyState } from '@/components/EmptyState';
import {
  Phone,
  Mail,
  User,
  ShieldCheck,
  HeartHandshake,
  Users,
  Search,
  Filter,
  X,
  Sparkles,
} from 'lucide-react';

interface ContactsViewProps {
  coordinators: Coordinator[];
  volunteers: Volunteer[];
  sports: Sport[];
}

type TabType = 'all' | 'coordinators' | 'volunteers';

interface UnifiedMember {
  name: string;
  role: string;
  sport_id: string;
  phone: string;
  email: string;
  memberType: 'coordinator' | 'volunteer';
}

export function ContactsView({
  coordinators,
  volunteers,
  sports,
}: ContactsViewProps) {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSport, setSelectedSport] = useState<string>('all');
  const [selectedRole, setSelectedRole] = useState<string>('all');

  // Unified list with memberType tag
  const allMembers: UnifiedMember[] = useMemo(() => {
    const list: UnifiedMember[] = [];

    coordinators.forEach((c) => {
      list.push({
        name: c.name,
        role: c.role || 'Coordinator',
        sport_id: c.sport_id || '',
        phone: c.phone || '',
        email: c.email || '',
        memberType: 'coordinator',
      });
    });

    volunteers.forEach((v) => {
      list.push({
        name: v.name,
        role: v.role || 'Volunteer',
        sport_id: v.sport_id || '',
        phone: v.phone || '',
        email: v.email || '',
        memberType: 'volunteer',
      });
    });

    return list;
  }, [coordinators, volunteers]);

  // Unique committees / roles for filter dropdown
  const uniqueRoles = useMemo(() => {
    const set = new Set<string>();
    allMembers.forEach((m) => {
      if (m.role && m.role.trim() && m.role.toLowerCase() !== 'coordinator' && m.role.toLowerCase() !== 'volunteer') {
        set.add(m.role.trim());
      }
    });
    return Array.from(set).sort();
  }, [allMembers]);

  // Filtered members based on tab, search, sport, role
  const filteredMembers = useMemo(() => {
    return allMembers.filter((m) => {
      // 1. Tab filter
      if (activeTab === 'coordinators' && m.memberType !== 'coordinator') return false;
      if (activeTab === 'volunteers' && m.memberType !== 'volunteer') return false;

      // 2. Sport filter
      if (selectedSport !== 'all') {
        if (selectedSport === 'general') {
          if (m.sport_id) return false;
        } else if (m.sport_id.toLowerCase() !== selectedSport.toLowerCase()) {
          return false;
        }
      }

      // 3. Role / Committee filter
      if (selectedRole !== 'all') {
        if (m.role.toLowerCase() !== selectedRole.toLowerCase()) {
          return false;
        }
      }

      // 4. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const sportName =
          sports.find((s) => s.sport_id.toLowerCase() === m.sport_id.toLowerCase())?.name ||
          m.sport_id;
        const matchesName = m.name.toLowerCase().includes(q);
        const matchesRole = m.role.toLowerCase().includes(q);
        const matchesSport = sportName.toLowerCase().includes(q);
        const matchesPhone = m.phone.toLowerCase().includes(q);
        if (!matchesName && !matchesRole && !matchesSport && !matchesPhone) {
          return false;
        }
      }

      return true;
    });
  }, [allMembers, activeTab, selectedSport, selectedRole, searchQuery, sports]);

  const hasActiveFilters =
    searchQuery.trim() !== '' || selectedSport !== 'all' || selectedRole !== 'all';

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedSport('all');
    setSelectedRole('all');
  };

  return (
    <div className="space-y-8">
      {/* 1. Header Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Coordinators Card */}
        <button
          onClick={() => setActiveTab('coordinators')}
          className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
            activeTab === 'coordinators'
              ? 'bg-blue-900 text-white border-blue-900 shadow-md ring-2 ring-blue-600'
              : 'bg-white border-slate-200 shadow-2xs hover:border-blue-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span
              className={`text-xs font-bold uppercase tracking-wider ${
                activeTab === 'coordinators' ? 'text-sky-300' : 'text-slate-500'
              }`}
            >
              Tournament Coordinators
            </span>
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                activeTab === 'coordinators'
                  ? 'bg-white/10 text-white'
                  : 'bg-blue-50 text-blue-600'
              }`}
            >
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div
            className={`text-3xl font-display font-black mt-2 ${
              activeTab === 'coordinators' ? 'text-white' : 'text-slate-900'
            }`}
          >
            {coordinators.length}
          </div>
          <p
            className={`text-xs mt-1 ${
              activeTab === 'coordinators' ? 'text-blue-100' : 'text-slate-500'
            }`}
          >
            Sport heads & convenors
          </p>
        </button>

        {/* Volunteers Card */}
        <button
          onClick={() => setActiveTab('volunteers')}
          className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
            activeTab === 'volunteers'
              ? 'bg-teal-900 text-white border-teal-900 shadow-md ring-2 ring-teal-600'
              : 'bg-white border-slate-200 shadow-2xs hover:border-teal-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span
              className={`text-xs font-bold uppercase tracking-wider ${
                activeTab === 'volunteers' ? 'text-teal-300' : 'text-slate-500'
              }`}
            >
              Student Volunteers
            </span>
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                activeTab === 'volunteers'
                  ? 'bg-white/10 text-white'
                  : 'bg-teal-50 text-teal-700'
              }`}
            >
              <HeartHandshake className="w-5 h-5" />
            </div>
          </div>
          <div
            className={`text-3xl font-display font-black mt-2 ${
              activeTab === 'volunteers' ? 'text-white' : 'text-slate-900'
            }`}
          >
            {volunteers.length}
          </div>
          <p
            className={`text-xs mt-1 ${
              activeTab === 'volunteers' ? 'text-teal-100' : 'text-slate-500'
            }`}
          >
            Ground, media & logistics team
          </p>
        </button>

        {/* Total Roster Card */}
        <button
          onClick={() => setActiveTab('all')}
          className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
            activeTab === 'all'
              ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-slate-600'
              : 'bg-white border-slate-200 shadow-2xs hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span
              className={`text-xs font-bold uppercase tracking-wider ${
                activeTab === 'all' ? 'text-slate-300' : 'text-slate-500'
              }`}
            >
              Total Organizing Crew
            </span>
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                activeTab === 'all'
                  ? 'bg-white/10 text-white'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div
            className={`text-3xl font-display font-black mt-2 ${
              activeTab === 'all' ? 'text-white' : 'text-slate-900'
            }`}
          >
            {allMembers.length}
          </div>
          <p
            className={`text-xs mt-1 ${
              activeTab === 'all' ? 'text-slate-300' : 'text-slate-500'
            }`}
          >
            Dedicated to Arena 2026
          </p>
        </button>
      </div>

      {/* 2. Segment Navigation Pills */}
      <div className="flex items-center justify-center">
        <div className="inline-flex p-1.5 rounded-2xl bg-white border border-slate-200 shadow-2xs max-w-full overflow-x-auto scrollbar-thin">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl font-display text-xs sm:text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer min-h-[44px] ${
              activeTab === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Users className="w-4 h-4 shrink-0" />
            <span>All Members ({allMembers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('coordinators')}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl font-display text-xs sm:text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer min-h-[44px] ${
              activeTab === 'coordinators'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-blue-900 hover:bg-slate-50'
            }`}
          >
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Coordinators ({coordinators.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('volunteers')}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl font-display text-xs sm:text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer min-h-[44px] ${
              activeTab === 'volunteers'
                ? 'bg-teal-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-teal-900 hover:bg-slate-50'
            }`}
          >
            <HeartHandshake className="w-4 h-4 shrink-0" />
            <span>Volunteers ({volunteers.length})</span>
          </button>
        </div>
      </div>

      {/* 3. Search & Filter Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter & Search Contacts</span>
          </div>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, role, phone..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-600 min-h-[44px]"
            />
          </div>

          {/* Committee / Role Filter */}
          <div>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-600 min-h-[44px] cursor-pointer"
            >
              <option value="all">All Committees & Roles</option>
              {uniqueRoles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          {/* Sport Filter */}
          <div>
            <select
              value={selectedSport}
              onChange={(e) => setSelectedSport(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-600 min-h-[44px] cursor-pointer"
            >
              <option value="all">All Sports & Disciplines</option>
              <option value="general">General / Non-Sport Specific</option>
              {sports.map((s) => (
                <option key={s.sport_id} value={s.sport_id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 4. Directory Grid */}
      {filteredMembers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredMembers.map((member, idx) => {
            const isVolunteer = member.memberType === 'volunteer';
            const sportName = member.sport_id
              ? sports.find(
                  (s) => s.sport_id.toLowerCase() === member.sport_id.toLowerCase()
                )?.name || member.sport_id
              : 'General Fest';

            return (
              <div
                key={`${member.name}-${idx}`}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border ${
                        isVolunteer
                          ? 'bg-teal-50 text-teal-800 border-teal-200'
                          : 'bg-blue-50 text-blue-800 border-blue-200'
                      }`}
                    >
                      {isVolunteer ? (
                        <>
                          <HeartHandshake className="w-3.5 h-3.5 text-teal-600" />
                          <span>Volunteer</span>
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                          <span>Coordinator</span>
                        </>
                      )}
                    </span>

                    <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200/60 truncate">
                      {sportName}
                    </span>
                  </div>

                  {/* Name and Committee / Role */}
                  <div className="flex items-start gap-3 mt-2">
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${
                        isVolunteer
                          ? 'bg-teal-50 text-teal-700'
                          : 'bg-blue-50 text-blue-700'
                      }`}
                    >
                      <User className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-xl font-bold uppercase text-slate-900 tracking-wide leading-tight truncate">
                        {member.name}
                      </h3>
                      <p className="text-xs font-semibold text-slate-600 mt-0.5">
                        {member.role || (isVolunteer ? 'Volunteer' : 'Coordinator')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contact Actions */}
                <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
                  {member.phone ? (
                    <a
                      href={`tel:${member.phone.replace(/[^0-9+]/g, '')}`}
                      className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-800 text-xs sm:text-sm font-semibold transition-colors min-h-[44px]"
                    >
                      <div className="flex items-center gap-2.5">
                        <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="font-mono">{member.phone}</span>
                      </div>
                      <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                        Call
                      </span>
                    </a>
                  ) : (
                    <p className="text-xs text-slate-400 italic py-1">
                      Direct contact phone not provided.
                    </p>
                  )}

                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-800 text-xs font-medium transition-colors min-h-[40px] truncate"
                    >
                      <Mail className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span className="truncate">{member.email}</span>
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          title={
            activeTab === 'volunteers'
              ? 'No Volunteers Found'
              : activeTab === 'coordinators'
              ? 'No Coordinators Found'
              : 'No Members Match Your Filters'
          }
          message="Try resetting your filters or clearing your search term to see the complete directory."
        />
      )}
    </div>
  );
}
