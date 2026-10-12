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
  PlayerSchema,
  Player,
  MatchSchema,
  Match,
  CoordinatorSchema,
  Coordinator,
  GallerySchema,
  GalleryItem,
  AnnouncementSchema,
  Announcement,
} from './schemas';

export interface ArenaData {
  config: SiteConfig;
  departments: Department[];
  sports: Sport[];
  players: Player[];
  matches: Match[];
  coordinators: Coordinator[];
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
      // 2. Google Sheets Public CSV Export Endpoint
      const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(
        tabName
      )}`;
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
    const sports: Sport[] = [];

    for (const row of rawRows) {
      const parsed = SportSchema.safeParse(row);
      if (parsed.success) {
        sports.push(parsed.data);
      } else {
        console.warn('[Sheets] Skipping malformed Sport row:', row, parsed.error.format());
      }
    }

    // Sort by display_order
    sports.sort((a, b) => a.display_order - b.display_order);

    lastGoodDataCache.sports = sports;
    return sports;
  } catch (err) {
    console.warn('[Sheets] getSports fallback triggered:', err);
    return lastGoodDataCache.sports || [];
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

    lastGoodDataCache.matches = matches;
    return matches;
  } catch (err) {
    console.warn('[Sheets] getMatches fallback triggered:', err);
    return lastGoodDataCache.matches || [];
  }
}

/**
 * Fetch and parse Coordinators
 */
export async function getCoordinators(): Promise<Coordinator[]> {
  try {
    const rawRows = await fetchSheetRows('Coordinators');
    const coordinators: Coordinator[] = [];

    for (const row of rawRows) {
      const parsed = CoordinatorSchema.safeParse(row);
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
 * Fetch and parse Gallery
 */
export async function getGallery(): Promise<GalleryItem[]> {
  try {
    const rawRows = await fetchSheetRows('Gallery');
    const gallery: GalleryItem[] = [];

    for (const row of rawRows) {
      const parsed = GallerySchema.safeParse(row);
      if (parsed.success) {
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
    gallery,
    announcements,
  ] = await Promise.all([
    getSiteConfig(),
    getDepartments(),
    getSports(),
    getPlayers(),
    getMatches(),
    getCoordinators(),
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
    gallery,
    announcements,
  };
}
