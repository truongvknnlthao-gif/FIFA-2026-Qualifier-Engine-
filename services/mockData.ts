import { GroupId, Match, TeamConfig } from "../types";

export const INITIAL_TEAMS: TeamConfig[] = [
  // --- GROUP A ---
  // Host Mexico (Pot 1) + South Africa (Pot 3) + Korea Republic (Pot 2) + Playoff Winner
  { id: "mx", name: "Mexico", flagUrl: "https://flagcdn.com/h40/mx.png", groupId: "A", tier: 1 },
  { id: "kr", name: "South Korea", flagUrl: "https://flagcdn.com/h40/kr.png", groupId: "A", tier: 2 },
  { id: "za", name: "South Africa", flagUrl: "https://flagcdn.com/h40/za.png", groupId: "A", tier: 3 },
  { id: "po-uefa-d", name: "Winner Play-off D", flagUrl: "https://flagcdn.com/h40/un.png", groupId: "A", tier: 4 }, // Denmark/Czechia path

  // --- GROUP B ---
  // Host Canada (Pot 1) + Switzerland (Pot 2) + Qatar (Pot 3) + Playoff Winner
  { id: "ca", name: "Canada", flagUrl: "https://flagcdn.com/h40/ca.png", groupId: "B", tier: 1 },
  { id: "ch", name: "Switzerland", flagUrl: "https://flagcdn.com/h40/ch.png", groupId: "B", tier: 2 },
  { id: "qa", name: "Qatar", flagUrl: "https://flagcdn.com/h40/qa.png", groupId: "B", tier: 3 },
  { id: "po-uefa-a", name: "Winner Play-off A", flagUrl: "https://flagcdn.com/h40/un.png", groupId: "B", tier: 4 }, // Italy path

  // --- GROUP C ---
  // Brazil (Pot 1) + Morocco (Pot 2) + Scotland (Pot 3) + Haiti (Pot 4)
  { id: "br", name: "Brazil", flagUrl: "https://flagcdn.com/h40/br.png", groupId: "C", tier: 1 },
  { id: "ma", name: "Morocco", flagUrl: "https://flagcdn.com/h40/ma.png", groupId: "C", tier: 2 },
  { id: "sc", name: "Scotland", flagUrl: "https://flagcdn.com/h40/gb-sct.png", groupId: "C", tier: 3 },
  { id: "ht", name: "Haiti", flagUrl: "https://flagcdn.com/h40/ht.png", groupId: "C", tier: 4 },

  // --- GROUP D ---
  // Host USA (Pot 1) + Australia (Pot 2) + Paraguay (Pot 3) + Playoff Winner
  { id: "us", name: "USA", flagUrl: "https://flagcdn.com/h40/us.png", groupId: "D", tier: 1 },
  { id: "au", name: "Australia", flagUrl: "https://flagcdn.com/h40/au.png", groupId: "D", tier: 2 },
  { id: "py", name: "Paraguay", flagUrl: "https://flagcdn.com/h40/py.png", groupId: "D", tier: 3 },
  { id: "po-uefa-c", name: "Winner Play-off C", flagUrl: "https://flagcdn.com/h40/un.png", groupId: "D", tier: 4 }, // Turkey path

  // --- GROUP E ---
  // Germany (Pot 1) + Ecuador (Pot 2) + Côte d'Ivoire (Pot 3) + Curaçao (Pot 4)
  { id: "de", name: "Germany", flagUrl: "https://flagcdn.com/h40/de.png", groupId: "E", tier: 1 },
  { id: "ec", name: "Ecuador", flagUrl: "https://flagcdn.com/h40/ec.png", groupId: "E", tier: 2 },
  { id: "ci", name: "Côte d'Ivoire", flagUrl: "https://flagcdn.com/h40/ci.png", groupId: "E", tier: 3 },
  { id: "cw", name: "Curaçao", flagUrl: "https://flagcdn.com/h40/cw.png", groupId: "E", tier: 4 },

  // --- GROUP F ---
  // Netherlands (Pot 1) + Japan (Pot 2) + Tunisia (Pot 3) + Playoff Winner
  { id: "nl", name: "Netherlands", flagUrl: "https://flagcdn.com/h40/nl.png", groupId: "F", tier: 1 },
  { id: "jp", name: "Japan", flagUrl: "https://flagcdn.com/h40/jp.png", groupId: "F", tier: 2 },
  { id: "tn", name: "Tunisia", flagUrl: "https://flagcdn.com/h40/tn.png", groupId: "F", tier: 3 },
  { id: "po-uefa-b", name: "Winner Play-off B", flagUrl: "https://flagcdn.com/h40/un.png", groupId: "F", tier: 4 }, // Ukraine/Sweden path

  // --- GROUP G ---
  // Belgium (Pot 1) + Iran (Pot 2) + Egypt (Pot 3) + New Zealand (Pot 4)
  { id: "be", name: "Belgium", flagUrl: "https://flagcdn.com/h40/be.png", groupId: "G", tier: 1 },
  { id: "ir", name: "IR Iran", flagUrl: "https://flagcdn.com/h40/ir.png", groupId: "G", tier: 2 },
  { id: "eg", name: "Egypt", flagUrl: "https://flagcdn.com/h40/eg.png", groupId: "G", tier: 3 },
  { id: "nz", name: "New Zealand", flagUrl: "https://flagcdn.com/h40/nz.png", groupId: "G", tier: 4 },

  // --- GROUP H ---
  // Spain (Pot 1) + Uruguay (Pot 2) + Saudi Arabia (Pot 3) + Cabo Verde (Pot 4)
  { id: "es", name: "Spain", flagUrl: "https://flagcdn.com/h40/es.png", groupId: "H", tier: 1 },
  { id: "uy", name: "Uruguay", flagUrl: "https://flagcdn.com/h40/uy.png", groupId: "H", tier: 2 },
  { id: "sa", name: "Saudi Arabia", flagUrl: "https://flagcdn.com/h40/sa.png", groupId: "H", tier: 3 },
  { id: "cv", name: "Cabo Verde", flagUrl: "https://flagcdn.com/h40/cv.png", groupId: "H", tier: 4 },

  // --- GROUP I ---
  // France (Pot 1) + Senegal (Pot 2) + Norway (Pot 3) + Playoff Winner
  { id: "fr", name: "France", flagUrl: "https://flagcdn.com/h40/fr.png", groupId: "I", tier: 1 },
  { id: "sn", name: "Senegal", flagUrl: "https://flagcdn.com/h40/sn.png", groupId: "I", tier: 2 },
  { id: "no", name: "Norway", flagUrl: "https://flagcdn.com/h40/no.png", groupId: "I", tier: 3 },
  { id: "po-fifa-2", name: "Winner FIFA PO 2", flagUrl: "https://flagcdn.com/h40/un.png", groupId: "I", tier: 4 }, // Intercontinental

  // --- GROUP J ---
  // Argentina (Pot 1) + Austria (Pot 2) + Algeria (Pot 3) + Jordan (Pot 4)
  { id: "ar", name: "Argentina", flagUrl: "https://flagcdn.com/h40/ar.png", groupId: "J", tier: 1 },
  { id: "at", name: "Austria", flagUrl: "https://flagcdn.com/h40/at.png", groupId: "J", tier: 2 },
  { id: "dz", name: "Algeria", flagUrl: "https://flagcdn.com/h40/dz.png", groupId: "J", tier: 3 },
  { id: "jo", name: "Jordan", flagUrl: "https://flagcdn.com/h40/jo.png", groupId: "J", tier: 4 },

  // --- GROUP K ---
  // Portugal (Pot 1) + Colombia (Pot 2) + Uzbekistan (Pot 3) + Playoff Winner
  { id: "pt", name: "Portugal", flagUrl: "https://flagcdn.com/h40/pt.png", groupId: "K", tier: 1 },
  { id: "co", name: "Colombia", flagUrl: "https://flagcdn.com/h40/co.png", groupId: "K", tier: 2 },
  { id: "uz", name: "Uzbekistan", flagUrl: "https://flagcdn.com/h40/uz.png", groupId: "K", tier: 3 },
  { id: "po-fifa-1", name: "Winner FIFA PO 1", flagUrl: "https://flagcdn.com/h40/un.png", groupId: "K", tier: 4 }, // Intercontinental

  // --- GROUP L ---
  // England (Pot 1) + Croatia (Pot 2) + Panama (Pot 3) + Ghana (Pot 4)
  { id: "gb-eng", name: "England", flagUrl: "https://flagcdn.com/h40/gb-eng.png", groupId: "L", tier: 1 },
  { id: "hr", name: "Croatia", flagUrl: "https://flagcdn.com/h40/hr.png", groupId: "L", tier: 2 },
  { id: "pa", name: "Panama", flagUrl: "https://flagcdn.com/h40/pa.png", groupId: "L", tier: 3 },
  { id: "gh", name: "Ghana", flagUrl: "https://flagcdn.com/h40/gh.png", groupId: "L", tier: 4 }
];

export const generateTournamentData = () => {
  const matches: Match[] = [];

  // Helper to simulate a match score based on tiers
  // Returns [homeScore, awayScore]
  const simulateScore = (tierA: number, tierB: number): [number, number] => {
    // Advantage = tierB - tierA.
    // If A is Tier 1, B is Tier 4, advantage is 3 (Strong advantage for A).
    const advantageA = tierB - tierA; 
    
    // Base goals probability (lambda for Poisson distribution)
    let lambdaA = 1.35;
    let lambdaB = 1.35;

    // Adjust lambda based on advantage
    // Each tier difference adds significant goal expectancy to the stronger team
    if (advantageA > 0) {
        lambdaA += advantageA * 0.55;
        lambdaB -= advantageA * 0.25;
    } else if (advantageA < 0) {
        const advantageB = -advantageA;
        lambdaB += advantageB * 0.55;
        lambdaA -= advantageB * 0.25;
    }

    // Floor at 0.1 to avoid negative lambda
    lambdaA = Math.max(0.1, lambdaA);
    lambdaB = Math.max(0.1, lambdaB);

    // Simple Poisson-like generator
    const getGoals = (lambda: number) => {
        let L = Math.exp(-lambda);
        let p = 1.0;
        let k = 0;
        do {
            k++;
            p *= Math.random();
        } while (p > L);
        return k - 1;
    };

    return [getGoals(lambdaA), getGoals(lambdaB)];
  };

  // Group teams by GroupId
  const groups: Record<string, TeamConfig[]> = {};
  INITIAL_TEAMS.forEach(t => {
      if (!groups[t.groupId]) groups[t.groupId] = [];
      groups[t.groupId].push(t);
  });

  // Generate round-robin matches
  Object.keys(groups).forEach(gid => {
      const groupTeams = groups[gid];
      for (let i = 0; i < groupTeams.length; i++) {
          for (let j = i + 1; j < groupTeams.length; j++) {
              const teamA = groupTeams[i];
              const teamB = groupTeams[j];
              
              const [scoreA, scoreB] = simulateScore(teamA.tier, teamB.tier);

              matches.push({
                  id: `match-${gid}-${teamA.id}-${teamB.id}`,
                  groupId: gid as GroupId,
                  homeTeamId: teamA.id,
                  awayTeamId: teamB.id,
                  homeScore: scoreA,
                  awayScore: scoreB
              });
          }
      }
  });

  return { teams: INITIAL_TEAMS, matches };
};