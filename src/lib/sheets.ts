import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import {
  ConfigRowSchema,
  DEFAULT_CONFIG,
  SiteConfig,
  DepartmentSchema,
  Department,
  SportSchema,
  Sport,
  OFFICIAL_GAMES_INFO,
  PlayerSchema,
  Player,
  MatchSchema,
  Match,
  CoordinatorSchema,
  Coordinator,
  VolunteerSchema,
  Volunteer,
  GallerySchema,
  GalleryItem,
  AnnouncementSchema,
  Announcement,
} from './schemas';
import { normalizeDateKey, parseTimeToMinutes } from './utils';

export interface ArenaData {
  config: SiteConfig;
  departments: Department[];
  sports: Sport[];
  players: Player[];
  matches: Match[];
  coordinators: Coordinator[];
  volunteers: Volunteer[];
  gallery: GalleryItem[];
  announcements: Announcement[];
}

// In-memory fallback cache to store last known good data
const lastGoodDataCache: Partial<ArenaData> = {};

/**
 * Read local fallback template CSV
 */
function readLocalFallbackCSV(tabName: string): Record<string, string>[] {
  try {
    const filePath = path.join(process.cwd(), 'data-template', `${tabName}.csv`);
    if (!fs.existsSync(filePath)) {
      return [];
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    const records = parse(content, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
      relax_column_count: true,
      skip_records_with_error: true,
    }) as Record<string, string>[];
    return records;
  } catch (err) {
    console.warn(`[Sheets] Failed to read local fallback CSV for ${tabName}:`, err);
    return [];
  }
}

/**
 * Fetch rows from Google Sheets either via API v4 or via public CSV export
 */
async function fetchSheetRows(tabName: string): Promise<Record<string, string>[]> {
  const sheetId = process.env.NEXT_PUBLIC_SHEET_ID || process.env.GOOGLE_SHEET_ID;
  const apiKey = process.env.GOOGLE_SHEETS_API_KEY;

  if (!sheetId) {
    // No sheet ID configured, return local template data
    return readLocalFallbackCSV(tabName);
  }

  try {
    if (apiKey) {
      // 1. Google Sheets API v4
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(
        tabName
      )}?key=${apiKey}`;
      const res = await fetch(url, { next: { revalidate: 60 } });
      if (!res.ok) {
        throw new Error(`Sheets API v4 returned status ${res.status}: ${res.statusText}`);
      }
      const data = await res.json();
      const rows: string[][] = data.values || [];
      if (rows.length < 2) return [];

      const headers = rows[0].map((h) => h.trim());
      const records: Record<string, string>[] = [];
      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const record: Record<string, string> = {};
        headers.forEach((header, index) => {
          record[header] = row[index] !== undefined ? String(row[index]).trim() : '';
        });
        records.push(record);
      }
      return records;
    } else {
      // 2. Google Sheets Public CSV Export Endpoint (headers=1 forces row 1 as single header)
      const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(
        tabName
      )}&headers=1`;
      const res = await fetch(url, { next: { revalidate: 60 } });
      if (!res.ok) {
        throw new Error(`Google Sheets CSV export returned status ${res.status}: ${res.statusText}`);
      }
      const text = await res.text();
      const records = parse(text, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
        relax_column_count: true,
        skip_records_with_error: true,
      }) as Record<string, string>[];

      // If Google Sheets couldn't find the tab, it returns the first tab (Config)
      if (
        tabName !== 'Config' &&
        records.length > 0 &&
        'key' in records[0] &&
        'value' in records[0]
      ) {
        throw new Error(
          `Tab "${tabName}" does not exist in spreadsheet (Google Sheets returned default Config tab).`
        );
      }

      return records;
    }
  } catch (error) {
    console.warn(
      `[Sheets] Network fetch failed for tab "${tabName}". Serving fallback data. Reason:`,
      error
    );
    return readLocalFallbackCSV(tabName);
  }
}

/**
 * Fetch and parse Site Config
 */
export async function getSiteConfig(): Promise<SiteConfig> {
  try {
    const rawRows = await fetchSheetRows('Config');
    const config = { ...DEFAULT_CONFIG };

    for (const row of rawRows) {
      const parsed = ConfigRowSchema.safeParse(row);
      if (parsed.success && parsed.data.key) {
        config[parsed.data.key] = parsed.data.value;
      }
    }

    lastGoodDataCache.config = config;
    return config;
  } catch (err) {
    console.warn('[Sheets] getSiteConfig fallback triggered:', err);
    return lastGoodDataCache.config || DEFAULT_CONFIG;
  }
}

/**
 * Fetch and parse Departments
 */
export async function getDepartments(): Promise<Department[]> {
  try {
    const rawRows = await fetchSheetRows('Departments');
    const departments: Department[] = [];

    for (const row of rawRows) {
      const parsed = DepartmentSchema.safeParse(row);
      if (parsed.success) {
        departments.push(parsed.data);
      } else {
        console.warn('[Sheets] Skipping malformed Department row:', row, parsed.error.format());
      }
    }

    lastGoodDataCache.departments = departments;
    return departments;
  } catch (err) {
    console.warn('[Sheets] getDepartments fallback triggered:', err);
    return lastGoodDataCache.departments || [];
  }
}

/**
 * Fetch and parse Sports
 */
export async function getSports(): Promise<Sport[]> {
  try {
    const rawRows = await fetchSheetRows('Sports');
    const sportsMap = new Map<string, Sport>();

    for (const row of rawRows) {
      const sportId = (row.sport_id || '').trim().toLowerCase();
      if (!sportId) continue;

      const official = OFFICIAL_GAMES_INFO[sportId];

      const nos =
        row.nos_of_players ||
        row.players_required ||
        row['Nos of Players'] ||
        row['nos of players'] ||
        row.team_size ||
        (official ? official.nos_of_players : '') ||
        '';

      const enrichedRow = {
        ...row,
        nos_of_players: nos,
        has_boys:
          row.has_boys !== undefined && row.has_boys !== ''
            ? row.has_boys
            : official
            ? official.has_boys
            : null,
        has_girls:
          row.has_girls !== undefined && row.has_girls !== ''
            ? row.has_girls
            : official
            ? official.has_girls
            : null,
        display_order:
          row.display_order !== undefined && row.display_order !== ''
            ? row.display_order
            : official
            ? official.display_order
            : 99,
      };

      const parsed = SportSchema.safeParse(enrichedRow);
      if (parsed.success) {
        sportsMap.set(parsed.data.sport_id.toLowerCase(), parsed.data);
      } else {
        console.warn('[Sheets] Skipping malformed Sport row:', row, parsed.error.format());
      }
    }

    // Ensure all 11 official games from the circular exist
    for (const [key, info] of Object.entries(OFFICIAL_GAMES_INFO)) {
      if (!sportsMap.has(key)) {
        sportsMap.set(key, {
          sport_id: key,
          name: info.name,
          has_boys: info.has_boys,
          has_girls: info.has_girls,
          nos_of_players: info.nos_of_players,
          display_order: info.display_order,
        });
      }
    }

    // Only include official circular games (unless user explicitly added custom sport with valid ID)
    const sports = Array.from(sportsMap.values()).filter((s) => {
      return OFFICIAL_GAMES_INFO[s.sport_id.toLowerCase()] !== undefined;
    });

    // Sort by display_order
    sports.sort((a, b) => a.display_order - b.display_order);

    lastGoodDataCache.sports = sports;
    return sports;
  } catch (err) {
    console.warn('[Sheets] getSports fallback triggered:', err);
    return (
      lastGoodDataCache.sports ||
      Object.entries(OFFICIAL_GAMES_INFO).map(([key, info]) => ({
        sport_id: key,
        name: info.name,
        has_boys: info.has_boys,
        has_girls: info.has_girls,
        nos_of_players: info.nos_of_players,
        display_order: info.display_order,
      }))
    );
  }
}

/**
 * Fetch and parse Players
 */
export async function getPlayers(): Promise<Player[]> {
  try {
    const rawRows = await fetchSheetRows('Players');
    const players: Player[] = [];

    for (const row of rawRows) {
      const parsed = PlayerSchema.safeParse(row);
      if (parsed.success) {
        players.push(parsed.data);
      } else {
        console.warn('[Sheets] Skipping malformed Player row:', row, parsed.error.format());
      }
    }

    lastGoodDataCache.players = players;
    return players;
  } catch (err) {
    console.warn('[Sheets] getPlayers fallback triggered:', err);
    return lastGoodDataCache.players || [];
  }
}

/**
 * Fetch and parse Matches (with derived status)
 */
export async function getMatches(): Promise<Match[]> {
  try {
    const rawRows = await fetchSheetRows('Matches');
    const matches: Match[] = [];

    for (const row of rawRows) {
      const parsed = MatchSchema.safeParse(row);
      if (parsed.success) {
        const raw = parsed.data;
        const status = raw.winner ? 'Completed' : 'Scheduled';
        matches.push({
          ...raw,
          status,
        });
      } else {
        console.warn('[Sheets] Skipping malformed Match row:', row, parsed.error.format());
      }
    }

    // Sort matches chronologically: Date first, then Time, then match_id
    matches.sort((a, b) => {
      const dateA = normalizeDateKey(a.date);
      const dateB = normalizeDateKey(b.date);
      if (dateA !== dateB) {
        if (!dateA) return 1;
        if (!dateB) return -1;
        return dateA.localeCompare(dateB);
      }
      const timeA = parseTimeToMinutes(a.time);
      const timeB = parseTimeToMinutes(b.time);
      if (timeA !== timeB) {
        return timeA - timeB;
      }
      return a.match_id.localeCompare(b.match_id);
    });

    lastGoodDataCache.matches = matches;
    return matches;
  } catch (err) {
    console.warn('[Sheets] getMatches fallback triggered:', err);
    return lastGoodDataCache.matches || [];
  }
}

function normalizeSportSlug(val: string): string {
  if (!val) return '';
  const clean = val.toLowerCase().trim();
  if (clean.includes('cricket')) return 'cricket';
  if (clean.includes('football')) return 'football';
  if (clean.includes('basket')) return 'basketball';
  if (clean.includes('voll')) return 'volleyball';
  if (clean.includes('kabad')) return 'kabaddi';
  if (clean.includes('lawn') || (clean.includes('tennis') && !clean.includes('table'))) return 'lawn-tennis';
  if (clean.includes('badminton')) return 'badminton';
  if (clean.includes('table') || clean.includes('tt')) return 'table-tennis';
  if (clean.includes('chess')) return 'chess';
  if (clean.includes('athletic')) return 'athletics';
  if (clean.includes('tug')) return 'tug-of-war';
  return clean.replace(/\s+/g, '-');
}

/**
 * Fetch and parse Coordinators
 */
export async function getCoordinators(): Promise<Coordinator[]> {
  try {
    const rawRows = await fetchSheetRows('Coordinators');
    const coordinators: Coordinator[] = [];

    for (const row of rawRows) {
      const name = (row.name || row['Name of coordinators'] || row['Name of Coordinator'] || row['Name'] || '').trim();
      if (!name) continue;

      const phone = (row.phone || row['Mob No'] || row['Mobile'] || row['Contact'] || '').trim();
      const roll_no = (row.roll_no || row['Roll No'] || row['Roll Number'] || row['RollNo'] || '').trim();
      const email = (row.email || row['Email'] || '').trim();
      
      const rawSport = row.sport_id || row.sport || row.Sport || (row.Derailment ? row.Remarks : '') || '';
      const rawRole = row.role || row.Role || row.Derailment || row.Committee || (row.sport_id ? row.role : row.Remarks) || 'Coordinator';

      const enriched = {
        name,
        role: rawRole.trim() || 'Coordinator',
        sport_id: normalizeSportSlug(rawSport),
        phone,
        email,
        roll_no,
      };

      const parsed = CoordinatorSchema.safeParse(enriched);
      if (parsed.success) {
        coordinators.push(parsed.data);
      } else {
        console.warn('[Sheets] Skipping malformed Coordinator row:', row, parsed.error.format());
      }
    }

    lastGoodDataCache.coordinators = coordinators;
    return coordinators;
  } catch (err) {
    console.warn('[Sheets] getCoordinators fallback triggered:', err);
    return lastGoodDataCache.coordinators || [];
  }
}

/**
 * Fetch and parse Volunteers
 */
export async function getVolunteers(): Promise<Volunteer[]> {
  try {
    const rawRows = await fetchSheetRows('Volunteers');
    const volunteers: Volunteer[] = [];

    for (const row of rawRows) {
      const name = (row.name || row['Name of Volunteers'] || row['Name of Volunteer'] || row['Name'] || '').trim();
      if (!name) continue;

      const phone = (row.phone || row['Mob No'] || row['Mobile'] || row['Contact'] || '').trim();
      const roll_no = (row.roll_no || row['Roll No'] || row['Roll Number'] || row['RollNo'] || '').trim();
      const email = (row.email || row['Email'] || '').trim();
      const rawRole = row.role || row.Role || row.Remarks || row.Team || 'Volunteer';
      const rawSport = row.sport_id || row.sport || row.Sport || '';

      const enriched = {
        name,
        role: rawRole.trim() || 'Volunteer',
        sport_id: normalizeSportSlug(rawSport),
        phone,
        email,
        roll_no,
      };

      const parsed = VolunteerSchema.safeParse(enriched);
      if (parsed.success) {
        volunteers.push(parsed.data);
      } else {
        console.warn('[Sheets] Skipping malformed Volunteer row:', row, parsed.error.format());
      }
    }

    lastGoodDataCache.volunteers = volunteers;
    return volunteers;
  } catch (err) {
    console.warn('[Sheets] getVolunteers fallback triggered:', err);
    return lastGoodDataCache.volunteers || [];
  }
}

let detectedGalleryDriveUrl = '';

export function getDetectedGalleryDriveUrl(): string {
  return detectedGalleryDriveUrl;
}

/**
 * Fetch and parse Gallery
 */
export async function getGallery(): Promise<GalleryItem[]> {
  try {
    const rawRows = await fetchSheetRows('Gallery');
    const gallery: GalleryItem[] = [];

    for (const row of rawRows) {
      const parsed = GallerySchema.safeParse(row);
      if (parsed.success) {
        const fn = parsed.data.filename.trim();
        // If user pasted a Google Drive folder URL in filename column, remember it as driveUrl
        if (
          fn.includes('drive.google.com/drive/folders/') ||
          fn.includes('drive.google.com/drive/u/') ||
          fn.includes('drive.google.com/folderview') ||
          fn.includes('drive.google.com/open?id=')
        ) {
          detectedGalleryDriveUrl = fn;
          continue;
        }

        // If it's an external web URL, ensure it's not a folder or web page
        if (fn.startsWith('http://') || fn.startsWith('https://')) {
          if (!/\.(jpg|jpeg|png|webp|gif|svg)($|\?)/i.test(fn)) {
            continue;
          }
        }

        gallery.push(parsed.data);
      } else {
        console.warn('[Sheets] Skipping malformed Gallery row:', row, parsed.error.format());
      }
    }

    lastGoodDataCache.gallery = gallery;
    return gallery;
  } catch (err) {
    console.warn('[Sheets] getGallery fallback triggered:', err);
    return lastGoodDataCache.gallery || [];
  }
}

/**
 * Fetch and parse Announcements
 */
export async function getAnnouncements(): Promise<Announcement[]> {
  try {
    const rawRows = await fetchSheetRows('Announcements');
    const announcements: Announcement[] = [];

    for (const row of rawRows) {
      const parsed = AnnouncementSchema.safeParse(row);
      if (parsed.success) {
        announcements.push(parsed.data);
      } else {
        console.warn('[Sheets] Skipping malformed Announcement row:', row, parsed.error.format());
      }
    }

    lastGoodDataCache.announcements = announcements;
    return announcements;
  } catch (err) {
    console.warn('[Sheets] getAnnouncements fallback triggered:', err);
    return lastGoodDataCache.announcements || [];
  }
}

/**
 * Convenience aggregator to fetch all data simultaneously
 */
export async function getAllArenaData(): Promise<ArenaData> {
  const [
    config,
    departments,
    sports,
    players,
    matches,
    coordinators,
    volunteers,
    gallery,
    announcements,
  ] = await Promise.all([
    getSiteConfig(),
    getDepartments(),
    getSports(),
    getPlayers(),
    getMatches(),
    getCoordinators(),
    getVolunteers(),
    getGallery(),
    getAnnouncements(),
  ]);

  return {
    config,
    departments,
    sports,
    players,
    matches,
    coordinators,
    volunteers,
    gallery,
    announcements,
  };
}
