// Interface para el equipo
export interface Team {
    id: number;
    equipo: string;
    PJ: number; // Partidos Jugados
    PG: number; // Partidos Ganados
    PE: number; // Partidos Empatados
    PP: number; // Partidos Perdidos
    Dif: number; // Diferencia de goles
    Pts: number; // Puntos
    escudo: string;
}