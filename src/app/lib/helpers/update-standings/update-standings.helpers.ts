import { Match, Team } from "../../models";

// Calcula las posiciones basadas en los resultados.
export const updateStandings = (matches: Match[], teams: Team[]): Team[] => {
    const updatedTeams = [...teams];
  
    matches.forEach((match) => {
      const localTeam = updatedTeams.find((t) => t.id === match.local.id)!;
      const visitanteTeam = updatedTeams.find((t) => t.id === match.visitante.id)!;
  
      localTeam.PJ += 1;
      visitanteTeam.PJ += 1;
  
      const diffLocal = match.golesLocal - match.golesVisitante;
      localTeam.Dif += diffLocal;
      visitanteTeam.Dif -= diffLocal;
  
      if (match.golesLocal > match.golesVisitante) {
        localTeam.PG += 1;
        localTeam.Pts += 3;
        visitanteTeam.PP += 1;
      } else if (match.golesLocal < match.golesVisitante) {
        visitanteTeam.PG += 1;
        visitanteTeam.Pts += 3;
        localTeam.PP += 1;
      } else {
        localTeam.PE += 1;
        visitanteTeam.PE += 1;
        localTeam.Pts += 1;
        visitanteTeam.Pts += 1;
      }
    });
  
    return updatedTeams.sort((a, b) => b.Pts - a.Pts || b.Dif - a.Dif || b.PG - a.PG);
  };