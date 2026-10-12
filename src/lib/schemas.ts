import { z } from 'zod';

// ==========================================
// 1. Config Tab Schema
// ==========================================
export const ConfigRowSchema = z.object({
  key: z.string().trim(),
  value: z.string().trim().default(''),
});

export type ConfigRow = z.infer<typeof ConfigRowSchema>;

export interface SiteConfig {
  site_name: string;
  subtitle: string;
  organiser: string;
  tagline: string;
  event_start_datetime: string;
  event_dates_text: string;
  venue: string;
  instagram_url: string;
  doubts_form_url: string;
  gallery_drive_url: string;
  contact_email: string;
  footer_note: string;
  announcement_ribbon_text: string;
  [key: string]: string;
}

export const DEFAULT_CONFIG: SiteConfig = {
  site_name: 'Arena 2026',
  subtitle: 'Annual Inter Departmental Sports Tournament',
  organiser: 'DTU Department of Physical Education & Sports',
  tagline: 'Hustle, Hit, Never Quit',
  event_start_datetime: '2026-10-16T08:30:00+05:30',
  event_dates_text: '16, 17 and 18 October 2026',
  venue: 'DTU Sports Complex',
  instagram_url: 'https://www.instagram.com/sc_dtu',
  doubts_form_url: 'https://forms.gle/eJR4xUL5RV4ratG57',
  gallery_drive_url: '',
  contact_email: '',
  footer_note: 'Delhi Technological University',
  announcement_ribbon_text: '',
};

// ==========================================
// 2. Departments Tab Schema
// ==========================================
export const DepartmentSchema = z.object({
  dept_id: z.string().trim().min(1, 'dept_id is required'),
  name: z.string().trim().min(1, 'Department name is required'),
  short_name: z.string().trim().default(''),
});

export type Department = z.infer<typeof DepartmentSchema>;

// ==========================================
// 3. Sports Tab Schema
// ==========================================
export const SportSchema = z.object({
  sport_id: z.string().trim().min(1, 'sport_id is required'),
  name: z.string().trim().min(1, 'Sport name is required'),
  has_boys: z.preprocess((val) => {
    if (typeof val === 'string') {
      const s = val.trim().toLowerCase();
      if (s === 'true' || s === 'yes' || s === '1') return true;
      if (s === 'false' || s === 'no' || s === '0') return false;
      if (s === '') return null;
    }
    if (typeof val === 'boolean') return val;
    return null;
  }, z.boolean().nullable().default(null)),
  has_girls: z.preprocess((val) => {
    if (typeof val === 'string') {
      const s = val.trim().toLowerCase();
      if (s === 'true' || s === 'yes' || s === '1') return true;
      if (s === 'false' || s === 'no' || s === '0') return false;
      if (s === '') return null;
    }
    if (typeof val === 'boolean') return val;
    return null;
  }, z.boolean().nullable().default(null)),
  display_order: z.preprocess((val) => {
    const num = Number(val);
    return isNaN(num) ? 99 : num;
  }, z.number().default(99)),
});

export type Sport = z.infer<typeof SportSchema>;

// ==========================================
// 4. Players Tab Schema
// ==========================================
export const PlayerSchema = z.object({
  dept_id: z.string().trim().min(1, 'dept_id is required'),
  sport_id: z.string().trim().min(1, 'sport_id is required'),
  category: z.string().trim().min(1, 'category is required'), // 'Boys' | 'Girls'
  player_name: z.string().trim().min(1, 'player_name is required'),
  roll_no: z.string().trim().default(''),
});

export type Player = z.infer<typeof PlayerSchema>;

// ==========================================
// 5. Matches Tab Schema (Fixtures & Results)
// ==========================================
export const WinnerEnum = z.enum(['A', 'B', 'Draw', 'No result']);
export type Winner = z.infer<typeof WinnerEnum>;

export const MatchSchema = z.object({
  match_id: z.string().trim().min(1, 'match_id is required'),
  date: z.string().trim().default(''), // ISO date or "16 October 2026"
  time: z.string().trim().default(''), // e.g. "09:00 AM"
  venue_ground: z.string().trim().default(''), // e.g. "Ground 1"
  sport_id: z.string().trim().min(1, 'sport_id is required'),
  category: z.string().trim().default(''), // "Boys" | "Girls"
  round: z.string().trim().default(''), // "Round 1", "Quarterfinal", "Semi Final", "Final"
  team_a: z.string().trim().min(1, 'team_a is required'),
  team_b: z.string().trim().min(1, 'team_b is required'),
  score_a: z.string().trim().default(''),
  score_b: z.string().trim().default(''),
  winner: z.preprocess((val) => {
    if (typeof val === 'string') {
      const v = val.trim();
      if (v.toUpperCase() === 'A') return 'A';
      if (v.toUpperCase() === 'B') return 'B';
      if (v.toLowerCase() === 'draw') return 'Draw';
      if (v.toLowerCase() === 'no result') return 'No result';
    }
    return '';
  }, z.union([WinnerEnum, z.literal('')])).default(''),
  result_note: z.string().trim().default(''),
});

export type RawMatch = z.infer<typeof MatchSchema>;

export interface Match extends RawMatch {
  status: 'Scheduled' | 'Completed';
}

// ==========================================
// 6. Coordinators Tab Schema
// ==========================================
export const CoordinatorSchema = z.object({
  name: z.string().trim().min(1, 'name is required'),
  role: z.string().trim().default('Coordinator'),
  sport_id: z.string().trim().default(''),
  phone: z.string().trim().default(''),
  email: z.string().trim().default(''),
});

export type Coordinator = z.infer<typeof CoordinatorSchema>;

// ==========================================
// 7. Gallery Tab Schema
// ==========================================
export const GallerySchema = z.object({
  filename: z.string().trim().min(1, 'filename is required'),
  caption: z.string().trim().default(''),
  year: z.string().trim().default('2025'),
});

export type GalleryItem = z.infer<typeof GallerySchema>;

// ==========================================
// 8. Announcements Tab Schema
// ==========================================
export const AnnouncementSchema = z.object({
  date_time: z.string().trim().default(''),
  text: z.string().trim().min(1, 'text is required'),
});

export type Announcement = z.infer<typeof AnnouncementSchema>;
