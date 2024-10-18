import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
    // api
    fetchTeams,
    // Helpers
    generateMatches,
    updateStandings,
    // Models
    Team,
    Match
} from "@/app/lib";

// Hook personalizado para manejar equipos, partidos y tabs
export const useTeams = () => {
    const queryClient = useQueryClient();
    const [currentTab, setCurrentTab] = useState(1);
    const [matchesByTab, setMatchesByTab] = useState<Record<number, Match[]>>({});

    // Query para obtener los equipos
    const { data: teams = [], isLoading, error } = useQuery<Team[]>({
        queryKey: ["teams"],
        queryFn: fetchTeams,
    });

    // Efecto para inicializar partidos al cargar equipos
    useEffect(() => {
        if (teams.length) {
            const initialMatches = generateMatches(teams);
            setMatchesByTab({ 1: initialMatches });
        }
    }, [teams]);

    // Cambia de tab y genera partidos si no existen
    const handleTabChange = (tabNumber: number) => {
        setCurrentTab(tabNumber);
        if (!matchesByTab[tabNumber]) {
            const newMatches = generateMatches(teams);
            setMatchesByTab((prev) => ({ ...prev, [tabNumber]: newMatches }));
        }
    };

    // Maneja los cambios en los inputs de goles
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        matchId: number,
        field: "golesLocal" | "golesVisitante"
    ) => {
        const value = parseInt(e.target.value) || 0;
        if (value < 0) return; // Evita números negativos

        const updatedMatches = matchesByTab[currentTab].map((match) =>
            match.id === matchId ? { ...match, [field]: value } : match
        );

        setMatchesByTab((prev) => ({ ...prev, [currentTab]: updatedMatches }));
    };

    // Calcula y actualiza las posiciones de los equipos
    const handleCalculate = () => {
        const updatedTeams = updateStandings(matchesByTab[currentTab], teams);
        queryClient.setQueryData(["teams"], updatedTeams);
    };

    return {
        teams,
        matchesByTab,
        currentTab,
        isLoading,
        error,
        handleTabChange,
        handleInputChange,
        handleCalculate,
        setMatchesByTab,
    };
};