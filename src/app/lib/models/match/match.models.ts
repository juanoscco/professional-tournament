import { Team } from "../team";

export interface Match {
    id: number;
    local: Team;
    visitante: Team;
    golesLocal: number;
    golesVisitante: number;
  }