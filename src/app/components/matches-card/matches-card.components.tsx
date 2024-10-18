import { Team, Match, generateMatches } from "@/app/lib";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";

interface MatchesCardProps {
    currentTab: number;
    matchesByTab: Record<number, Match[]>;
    teams: Team[];
    handleTabChange: (tab: number) => void;
    handleInputChange: (
        e: React.ChangeEvent<HTMLInputElement>,
        matchId: number,
        field: "golesLocal" | "golesVisitante"
    ) => void;
    handleCalculate: () => void;
    setMatchesByTab: React.Dispatch<React.SetStateAction<Record<number, Match[]>>>;
}
export const MatchesCard: React.FC<MatchesCardProps> = ({
    currentTab,
    matchesByTab,
    teams,
    handleTabChange,
    handleInputChange,
    handleCalculate,
    setMatchesByTab,
}) => (
    <Card>
        <CardHeader>
            <CardTitle className="text-xl font-bold  md:text-xl sm:text-base">
                Marcador de Partidos
            </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
            <div className="flex justify-center space-x-2 mb-4">
                {[1, 2, 3, 4, 5].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => handleTabChange(tab)}
                        className={`px-4 py-2 rounded ${currentTab === tab ? "bg-green-500 text-white" : "bg-gray-200"
                            } text-base sm:text-sm`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {matchesByTab[currentTab]?.map((match) => (
                <div
                    key={match.id}
                    className="grid grid-cols-12 md:grid-cols-11 items-center gap-2 bg-secondary rounded-lg p-4 sm:gap-2 sm:p-2"
                >
                    {/* Equipo Local */}
                    <div className="col-span-5 pr-3 md:pr-0 sm:col-span-4 flex items-center justify-end space-x-2">
                        <span className="font-semibold hidden md:block text-lg min-w-[80px] text-right">
                            {match.local.equipo}
                        </span>
                        <span className="text-xl">{match.local.escudo}</span>
                    </div>

                    {/* Input Goles Local */}
                    <div className="col-span-1 flex justify-center items-center">
                        <Input
                            type="number"
                            value={match.golesLocal}
                            onChange={(e) => handleInputChange(e, match.id, "golesLocal")}
                            className="w-12 text-center sm:w-16"
                            min="0"
                        />
                    </div>

                    {/* Separador */}
                    <div className="col-span-1 flex justify-center items-center">
                        <Separator orientation="vertical" className="h-8 sm:h-6" />
                    </div>

                    {/* Input Goles Visitante */}
                    <div className="col-span-1 flex justify-center items-center">
                        <Input
                            type="number"
                            value={match.golesVisitante}
                            onChange={(e) => handleInputChange(e, match.id, "golesVisitante")}
                            className="w-12 text-center sm:w-16"
                            min="0"
                        />
                    </div>

                    {/* Equipo Visitante */}
                    <div className="col-span-1 pl-3 md:pl-0 sm:col-span-4 flex items-center justify-start space-x-2">
                        <span className="text-xl">{match.visitante.escudo}</span>
                        <span className="font-semibold text-lg hidden md:block min-w-[80px]">
                            {match.visitante.equipo}
                        </span>
                    </div>
                </div>
            ))}
        </CardContent>

        <CardFooter className="flex justify-center space-x-4">
            <Button
                variant="destructive"
                onClick={() =>
                    setMatchesByTab((prev) => ({
                        ...prev,
                        [currentTab]: generateMatches(teams),
                    }))
                }
                className="text-base sm:text-sm"
            >
                Limpiar
            </Button>
            <Button
                variant="default"
                onClick={handleCalculate}
                className="text-base sm:text-sm"
            >
                Calcular
            </Button>
        </CardFooter>
    </Card>
)