import React, { useEffect, useState, useMemo } from 'react';
import { FifaLogic } from './services/fifaLogic';
import { generateTournamentData } from './services/mockData';
import { GroupStandings, QualifiedTeam } from './types';
import { Trophy, RefreshCcw, Table, Users } from 'lucide-react';

const App: React.FC = () => {
  const [logic, setLogic] = useState<FifaLogic | null>(null);
  const [standings, setStandings] = useState<GroupStandings[]>([]);
  const [qualifiers, setQualifiers] = useState<QualifiedTeam[]>([]);
  const [activeTab, setActiveTab] = useState<'groups' | 'qualifiers'>('groups');

  const initializeTournament = () => {
    const { teams, matches } = generateTournamentData();
    const fifa = new FifaLogic(teams);
    fifa.addMatches(matches);
    setLogic(fifa);
    setStandings(fifa.getGroupStandings());
    setQualifiers(fifa.getQualifiedTeams());
  };

  useEffect(() => {
    initializeTournament();
  }, []);

  // Compute 3rd place table for display
  const thirdPlaceTable = useMemo(() => {
    if (!standings.length) return [];
    return standings
      .map(g => g.teams[2]) // Get the 3rd placed team directly
      .filter(team => team) // Safety check in case a group has fewer than 3 teams
      .sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
        if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
        return 0;
      });
  }, [standings]);

  if (!logic) return <div className="flex h-screen items-center justify-center text-slate-500">Loading FIFA Engine...</div>;

  return (
    <div className="min-h-screen bg-slate-100 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900 text-white shadow-lg">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Trophy className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-xl font-bold leading-none">FIFA World Cup 2026</h1>
                <span className="text-xs text-slate-400 font-mono">Qualifier Engine</span>
              </div>
            </div>
            <button 
              onClick={initializeTournament}
              className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500 active:scale-95"
            >
              <RefreshCcw className="h-4 w-4" />
              <span className="hidden sm:inline">Simulate New Results</span>
            </button>
          </div>
        </div>
        
        {/* Tab Navigation */}
        <div className="mx-auto mt-4 flex max-w-7xl gap-6 px-4 text-sm font-medium sm:px-6 lg:px-8">
          <button
            onClick={() => setActiveTab('groups')}
            className={`border-b-2 pb-3 transition ${
              activeTab === 'groups' ? 'border-yellow-400 text-white' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Table className="h-4 w-4" /> Group Stage
            </div>
          </button>
          <button
            onClick={() => setActiveTab('qualifiers')}
            className={`border-b-2 pb-3 transition ${
              activeTab === 'qualifiers' ? 'border-yellow-400 text-white' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" /> Qualified Teams ({qualifiers.length})
            </div>
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        
        {/* GROUP STAGE VIEW */}
        {activeTab === 'groups' && (
          <div className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {standings.map((group) => (
                <div key={group.groupId} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                  <div className="border-b border-slate-100 bg-slate-50 px-4 py-3">
                    <h3 className="font-bold text-slate-800">Group {group.groupId}</h3>
                  </div>
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-100 text-xs font-semibold uppercase text-slate-500">
                        <th className="px-4 py-2">Team</th>
                        <th className="px-2 py-2 text-center">Pts</th>
                        <th className="px-2 py-2 text-center">GD</th>
                        <th className="px-2 py-2 text-center">GF</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.teams.map((team, idx) => {
                        const rank = idx + 1;
                        let rowClass = "";
                        let badgeClass = "hidden";
                        
                        if (rank <= 2) {
                            rowClass = "bg-green-50/50";
                            badgeClass = "bg-green-100 text-green-700";
                        } else if (rank === 3) {
                            // Check if this 3rd place actually qualified
                            const isQualified = qualifiers.some(q => q.id === team.id);
                            if (isQualified) {
                                rowClass = "bg-yellow-50/50";
                                badgeClass = "bg-yellow-100 text-yellow-700";
                            }
                        }

                        return (
                          <tr key={team.id} className={`border-b border-slate-50 last:border-0 ${rowClass}`}>
                            <td className="px-4 py-3 font-medium text-slate-700">
                              <div className="flex items-center justify-between">
                                <span className="mr-2 text-slate-400 w-4">{rank}</span>
                                <div className="flex flex-1 items-center gap-2 overflow-hidden">
                                  <img src={team.flagUrl} alt={team.name} className="h-4 w-6 rounded-sm object-cover shadow-sm" />
                                  <span className="truncate">{team.name}</span>
                                </div>
                                <span className={`ml-2 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${badgeClass} ${rank > 2 && !qualifiers.some(q => q.id === team.id) ? 'hidden' : 'block'}`}>
                                    Q
                                </span>
                              </div>
                            </td>
                            <td className="px-2 py-3 text-center font-bold text-slate-900">{team.points}</td>
                            <td className="px-2 py-3 text-center text-slate-600">{team.goalDifference > 0 ? `+${team.goalDifference}` : team.goalDifference}</td>
                            <td className="px-2 py-3 text-center text-slate-500">{team.goalsFor}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>

            {/* 3rd Place Comparison Table */}
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm max-w-4xl mx-auto">
              <div className="border-b border-slate-100 bg-slate-50 px-6 py-4">
                <h3 className="text-lg font-bold text-slate-800">Third-Place Teams Ranking</h3>
                <p className="text-sm text-slate-500">Top 8 advance to Round of 32</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/50 text-xs font-semibold uppercase text-slate-500">
                      <th className="px-6 py-3">#</th>
                      <th className="px-6 py-3">Group</th>
                      <th className="px-6 py-3">Team</th>
                      <th className="px-6 py-3 text-center">Points</th>
                      <th className="px-6 py-3 text-center">GD</th>
                      <th className="px-6 py-3 text-center">GS</th>
                      <th className="px-6 py-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {thirdPlaceTable.map((team, idx) => {
                      const isQualified = idx < 8;
                      return (
                        <tr key={team.id} className={`border-b border-slate-100 last:border-0 ${isQualified ? 'bg-yellow-50/30' : 'opacity-60 grayscale'}`}>
                          <td className="px-6 py-3 text-slate-400">{idx + 1}</td>
                          <td className="px-6 py-3 font-mono text-slate-500">{team.groupId}</td>
                          <td className="px-6 py-3 font-medium text-slate-900">
                            <div className="flex items-center gap-2">
                               <img src={team.flagUrl} alt={team.name} className="h-4 w-6 rounded-sm object-cover shadow-sm" />
                               <span>{team.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-3 text-center font-bold">{team.points}</td>
                          <td className="px-6 py-3 text-center text-slate-600">{team.goalDifference > 0 ? `+${team.goalDifference}` : team.goalDifference}</td>
                          <td className="px-6 py-3 text-center text-slate-600">{team.goalsFor}</td>
                          <td className="px-6 py-3 text-right">
                             {isQualified ? (
                               <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                 Qualified
                               </span>
                             ) : (
                               <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-800">
                                 Eliminated
                               </span>
                             )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* QUALIFIERS VIEW */}
        {activeTab === 'qualifiers' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between rounded-lg bg-blue-50 p-4 border border-blue-100">
              <div className="flex items-center gap-3">
                 <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-bold">
                    32
                 </div>
                 <div>
                    <h2 className="font-bold text-blue-900">Teams Advanced to Knockout Stage</h2>
                    <p className="text-sm text-blue-700">24 Direct Qualifiers + 8 Best 3rd Place</p>
                 </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {qualifiers.map((team, idx) => {
                 let statusColor = "bg-slate-100 text-slate-700";
                 if (team.qualificationStatus === 'Group Winner') statusColor = "bg-yellow-100 text-yellow-800 border-yellow-200";
                 if (team.qualificationStatus === 'Runner-up') statusColor = "bg-slate-200 text-slate-800 border-slate-300";
                 if (team.qualificationStatus === 'Best 3rd') statusColor = "bg-orange-100 text-orange-800 border-orange-200";

                 return (
                  <div key={team.id} className="relative flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md">
                    <div>
                      <div className="mb-1 text-xs font-bold uppercase text-slate-400">Group {team.groupId}</div>
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                         <img src={team.flagUrl} alt={team.name} className="h-4 w-6 rounded-sm object-cover shadow-sm" />
                         <span className="truncate">{team.name}</span>
                      </div>
                    </div>
                    <div className={`rounded border px-2 py-1 text-[10px] font-bold uppercase leading-tight ${statusColor}`}>
                      {team.qualificationStatus}
                    </div>
                  </div>
                 );
              })}
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default App;