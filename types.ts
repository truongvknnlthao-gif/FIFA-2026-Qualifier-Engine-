export type GroupId = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L';

export interface Match {
  id: string;
  groupId: GroupId;
  homeTeamId: string;
  awayTeamId: string;
  homeScore: number;
  awayScore: number;
}

export interface TeamConfig {
  id: string;
  name: string;
  flagUrl: string;
  groupId: GroupId;
  tier: number;
}

export interface TeamStats extends TeamConfig {
  matchesPlayed: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

export interface GroupStandings {
  groupId: GroupId;
  teams: TeamStats[];
}

export type QualificationStatus = 'Group Winner' | 'Runner-up' | 'Best 3rd' | 'Eliminated';

export interface QualifiedTeam extends TeamStats {
  rankInGroup: number;
  qualificationStatus: QualificationStatus;
}