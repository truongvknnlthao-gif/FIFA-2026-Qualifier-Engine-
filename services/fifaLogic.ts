import { GroupId, GroupStandings, Match, QualifiedTeam, TeamConfig, TeamStats } from '../types';

/**
 * Core Logic Class for FIFA 2026 Group Stage
 */
export class FifaLogic {
  private teams: Map<string, TeamStats>;
  private matches: Match[];

  constructor(initialTeams: TeamConfig[]) {
    this.teams = new Map();
    this.matches = [];

    // Initialize stats for all teams
    initialTeams.forEach((t) => {
      this.teams.set(t.id, {
        ...t,
        matchesPlayed: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDifference: 0,
        points: 0,
      });
    });
  }

  public addMatches(matches: Match[]) {
    this.matches = [...this.matches, ...matches];
    this.recalculateStats();
  }

  private recalculateStats() {
    // Reset stats but keep IDs/Names/Flags/Tiers
    for (const team of this.teams.values()) {
      team.matchesPlayed = 0;
      team.won = 0;
      team.drawn = 0;
      team.lost = 0;
      team.goalsFor = 0;
      team.goalsAgainst = 0;
      team.goalDifference = 0;
      team.points = 0;
    }

    // Process each match
    for (const match of this.matches) {
      const home = this.teams.get(match.homeTeamId);
      const away = this.teams.get(match.awayTeamId);

      if (!home || !away) continue;

      home.matchesPlayed++;
      away.matchesPlayed++;

      home.goalsFor += match.homeScore;
      home.goalsAgainst += match.awayScore;
      away.goalsFor += match.awayScore;
      away.goalsAgainst += match.homeScore;

      if (match.homeScore > match.awayScore) {
        home.won++;
        home.points += 3;
        away.lost++;
      } else if (match.homeScore < match.awayScore) {
        away.won++;
        away.points += 3;
        home.lost++;
      } else {
        home.drawn++;
        home.points += 1;
        away.drawn++;
        away.points += 1;
      }
    }

    // Recalculate GD
    for (const team of this.teams.values()) {
      team.goalDifference = team.goalsFor - team.goalsAgainst;
    }
  }

  /**
   * Sorts teams according to FIFA regulations:
   * 1. Points
   * 2. Goal Difference
   * 3. Goals Scored
   * 4. Head-to-Head (Points, GD, GS)
   */
  private sortGroupTeams(teams: TeamStats[], matchesInGroup: Match[]): TeamStats[] {
    return [...teams].sort((a, b) => {
      // 1. Points
      if (b.points !== a.points) return b.points - a.points;

      // 2. Goal Difference
      if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;

      // 3. Goals Scored
      if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;

      // 4. Head-to-Head Logic
      // Filter matches involving ONLY a and b (simple 2-way tie)
      const h2hMatches = matchesInGroup.filter(
        (m) =>
          (m.homeTeamId === a.id && m.awayTeamId === b.id) ||
          (m.homeTeamId === b.id && m.awayTeamId === a.id)
      );

      let aPointsH2H = 0;
      let bPointsH2H = 0;
      let aGdH2H = 0;
      let bGdH2H = 0;
      let aGsH2H = 0;
      let bGsH2H = 0;

      for (const m of h2hMatches) {
        const isAHome = m.homeTeamId === a.id;
        const scoreA = isAHome ? m.homeScore : m.awayScore;
        const scoreB = isAHome ? m.awayScore : m.homeScore;

        aGsH2H += scoreA;
        bGsH2H += scoreB;
        aGdH2H += scoreA - scoreB;
        bGdH2H += scoreB - scoreA;

        if (scoreA > scoreB) aPointsH2H += 3;
        else if (scoreB > scoreA) bPointsH2H += 3;
        else {
          aPointsH2H += 1;
          bPointsH2H += 1;
        }
      }

      // 4a. H2H Points
      if (bPointsH2H !== aPointsH2H) return bPointsH2H - aPointsH2H;
      // 4b. H2H Goal Difference
      if (bGdH2H !== aGdH2H) return bGdH2H - aGdH2H;
      // 4c. H2H Goals Scored
      if (bGsH2H !== aGsH2H) return bGsH2H - aGsH2H;

      // 5. Fair play (omitted, returning by ID)
      return a.id.localeCompare(b.id);
    });
  }

  /**
   * Main method to get standings for all groups
   */
  public getGroupStandings(): GroupStandings[] {
    const groupIds: GroupId[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
    const results: GroupStandings[] = [];

    for (const gid of groupIds) {
      const groupTeams = Array.from(this.teams.values()).filter((t) => t.groupId === gid);
      const groupMatches = this.matches.filter((m) => m.groupId === gid);
      
      const sortedTeams = this.sortGroupTeams(groupTeams, groupMatches);
      results.push({
        groupId: gid,
        teams: sortedTeams,
      });
    }

    return results;
  }

  /**
   * Determines the 32 teams that advance
   */
  public getQualifiedTeams(): QualifiedTeam[] {
    const standings = this.getGroupStandings();
    const qualifiedTeams: QualifiedTeam[] = [];
    const thirdPlaceCandidates: QualifiedTeam[] = [];

    // 1. Direct Qualification (Top 2)
    for (const group of standings) {
      group.teams.forEach((team, index) => {
        const rank = index + 1;
        if (rank === 1) {
          qualifiedTeams.push({ ...team, rankInGroup: rank, qualificationStatus: 'Group Winner' });
        } else if (rank === 2) {
          qualifiedTeams.push({ ...team, rankInGroup: rank, qualificationStatus: 'Runner-up' });
        } else if (rank === 3) {
          // Prepare for 3rd place comparison
          thirdPlaceCandidates.push({ ...team, rankInGroup: rank, qualificationStatus: 'Eliminated' });
        }
      });
    }

    // 2. Best 3rd Place Calculation
    // Rules: Points > GD > GS
    const sortedThirds = [...thirdPlaceCandidates].sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
      if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
      return a.id.localeCompare(b.id);
    });

    // Top 8 of the 3rd place teams advance
    const best8Thirds = sortedThirds.slice(0, 8);
    
    // Add them to qualified list
    best8Thirds.forEach(t => {
        qualifiedTeams.push({
            ...t,
            qualificationStatus: 'Best 3rd'
        });
    });

    return qualifiedTeams;
  }
}