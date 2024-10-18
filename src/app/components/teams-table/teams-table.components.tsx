import { Team } from "@/app/lib";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface TeamsTableProps {
    teams: Team[];
}

export const TeamsTable: React.FC<TeamsTableProps> = ({ teams }) => (
    <Card>
        <CardHeader>
            <CardTitle className="text-xl font-bold mb-4">Equipos</CardTitle>
        </CardHeader>

        <CardContent>
            <ScrollArea className="w-full whitespace-nowrap rounded-md">
                <Table>
                    <TableCaption>
                        <h2>Estadísticas de Equipos</h2>
                        <div className="flex flex-col">
                            <div className="flex gap-2 items-center">
                                <div className="w-2 h-2 bg-green-500"></div>
                                <span>Clasificación Torneo Extranjero 1</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <div className="w-2 h-2 bg-blue-500"></div>
                                <span>Clasificación Torneo Extranjero 2</span>
                            </div>
                        </div>
                    </TableCaption>

                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">#</TableHead>
                            <TableHead className="min-w-[150px]">Equipo</TableHead>
                            <TableHead className="text-center">PJ</TableHead>
                            <TableHead className="text-center">PG</TableHead>
                            <TableHead className="text-center">PE</TableHead>
                            <TableHead className="text-center">PP</TableHead>
                            <TableHead className="text-center">Dif</TableHead>
                            <TableHead className="text-center">Pts</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {teams.map((team, index) => (
                            <TableRow
                                key={team.id}
                                className={
                                    index < 3
                                        ? "bg-green-100 hover:bg-green-200"
                                        : index < 5
                                            ? "bg-blue-100 hover:bg-blue-200"
                                            : ""
                                }
                            >
                                <TableCell className="font-medium text-center">{index + 1}</TableCell>
                                <TableCell className="min-w-[150px]">
                                    {team.escudo} {team.equipo}
                                </TableCell>
                                <TableCell className="text-center">{team.PJ}</TableCell>
                                <TableCell className="text-center">{team.PG}</TableCell>
                                <TableCell className="text-center">{team.PE}</TableCell>
                                <TableCell className="text-center">{team.PP}</TableCell>
                                <TableCell className="text-center">{team.Dif}</TableCell>
                                <TableCell className="text-center">{team.Pts}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </CardContent>
    </Card>
);