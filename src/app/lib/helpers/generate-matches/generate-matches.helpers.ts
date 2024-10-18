import { Match, Team } from "../../models";

// Genera los partidos iniciales con 0 a 0.
export const generateMatches = (teams: Team[]): Match[] => {
    const shuffledTeams = [...teams].sort(() => Math.random() - 0.5);
    const matches: Match[] = [];

    for (let i = 0; i < shuffledTeams.length; i += 2) {
        matches.push({
            id: i / 2 + 1,
            local: shuffledTeams[i],
            visitante: shuffledTeams[i + 1],
            golesLocal: 0,
            golesVisitante: 0,
        });
    }

    return matches;
};