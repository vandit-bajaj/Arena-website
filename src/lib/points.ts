import { Department, Match } from './schemas';

export interface DepartmentStanding {
  rank: number;
  dept_id: string;
  name: string;
  short_name: string;
  played: number;
  won: number;
  lost: number;
  drawn: number;
  points: number;
  win_rate: number;
  form: ('W' | 'L' | 'D')[];
}

export interface PointsCalculationOptions {
  pointsPerWin?: number;
  pointsPerDraw?: number;
  sportId?: string;
}

/**
 * Calculates department standings, rankings, wins, losses, and points
 * from existing matches and departments in the Google Sheet.
 */
export function calculateDepartmentStandings(
  departments: Department[],
  matches: Match[],
  options: PointsCalculationOptions = {}
): DepartmentStanding[] {
  const pointsPerWin = options.pointsPerWin ?? 2;
  const pointsPerDraw = options.pointsPerDraw ?? 1;
  const targetSport = options.sportId?.trim().toLowerCase();

  // Filter matches: must be completed (has a winner recorded)
  let relevantMatches = matches.filter((m) => m.status === 'Completed' && m.winner);

  if (targetSport && targetSport !== 'all') {
    relevantMatches = relevantMatches.filter(
      (m) => m.sport_id.trim().toLowerCase() === targetSport
    );
  }

  // Department metadata index
  const deptMetaMap = new Map<string, { name: string; short_name: string }>();
  departments.forEach((d) => {
    deptMetaMap.set(d.dept_id.trim().toUpperCase(), {
      name: d.name,
      short_name: d.short_name || d.dept_id,
    });
  });

  // Track raw stats
  const statsMap = new Map<
    string,
    {
      played: number;
      won: number;
      lost: number;
      drawn: number;
      points: number;
      form: ('W' | 'L' | 'D')[];
    }
  >();

  // Ensure every department from the Departments tab is represented
  departments.forEach((d) => {
    const key = d.dept_id.trim().toUpperCase();
    if (!statsMap.has(key)) {
      statsMap.set(key, {
        played: 0,
        won: 0,
        lost: 0,
        drawn: 0,
        points: 0,
        form: [],
      });
    }
  });

  // Process completed matches
  relevantMatches.forEach((match) => {
    const teamA = match.team_a.trim().toUpperCase();
    const teamB = match.team_b.trim().toUpperCase();

    if (!teamA || !teamB) return;

    if (!statsMap.has(teamA)) {
      statsMap.set(teamA, { played: 0, won: 0, lost: 0, drawn: 0, points: 0, form: [] });
    }
    if (!statsMap.has(teamB)) {
      statsMap.set(teamB, { played: 0, won: 0, lost: 0, drawn: 0, points: 0, form: [] });
    }

    const aStats = statsMap.get(teamA)!;
    const bStats = statsMap.get(teamB)!;

    aStats.played += 1;
    bStats.played += 1;

    const winner = match.winner.trim();

    if (winner === 'A') {
      aStats.won += 1;
      aStats.points += pointsPerWin;
      aStats.form.push('W');

      bStats.lost += 1;
      bStats.form.push('L');
    } else if (winner === 'B') {
      bStats.won += 1;
      bStats.points += pointsPerWin;
      bStats.form.push('W');

      aStats.lost += 1;
      aStats.form.push('L');
    } else if (winner === 'Draw' || winner === 'No result') {
      aStats.drawn += 1;
      aStats.points += pointsPerDraw;
      aStats.form.push('D');

      bStats.drawn += 1;
      bStats.points += pointsPerDraw;
      bStats.form.push('D');
    }
  });

  // Convert to array and calculate win rates
  const standings: DepartmentStanding[] = Array.from(statsMap.entries()).map(([deptId, stats]) => {
    const meta = deptMetaMap.get(deptId) || {
      name: deptId,
      short_name: deptId,
    };

    const winRate = stats.played > 0 ? Math.round((stats.won / stats.played) * 100) : 0;

    return {
      rank: 0,
      dept_id: deptId,
      name: meta.name,
      short_name: meta.short_name,
      played: stats.played,
      won: stats.won,
      lost: stats.lost,
      drawn: stats.drawn,
      points: stats.points,
      win_rate: winRate,
      form: stats.form.slice(-5), // Last 5 results
    };
  });

  // Sort standings:
  // 1. Highest Points
  // 2. Most Wins
  // 3. Fewest Losses
  // 4. Highest Win Rate
  // 5. Alphabetical by Name
  standings.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.won !== a.won) return b.won - a.won;
    if (a.lost !== b.lost) return a.lost - b.lost;
    if (b.win_rate !== a.win_rate) return b.win_rate - a.win_rate;
    return a.name.localeCompare(b.name);
  });

  // Assign ranks
  standings.forEach((item, index) => {
    item.rank = index + 1;
  });

  return standings;
}
