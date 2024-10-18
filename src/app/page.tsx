"use client"
import { Separator } from "@/components/ui/separator";
import { Container } from "./container";
import { useTeams } from "./hooks";
import { MatchesCard, Navbar, TeamsTable } from "./components/";
import React from "react";

export default function Home() {
  const {
    teams,
    matchesByTab,
    currentTab,
    isLoading,
    error,
    handleTabChange,
    handleInputChange,
    handleCalculate,
    setMatchesByTab
  } = useTeams();

  if (isLoading) return <p>Cargando equipos...</p>;
  if (error) return <p>Error: {error.message}</p>;


  return (
    <React.Fragment>
      <Navbar />
      <Container>
        <MatchesCard
          currentTab={currentTab}
          matchesByTab={matchesByTab}
          teams={teams}
          handleTabChange={handleTabChange}
          handleInputChange={handleInputChange}
          handleCalculate={handleCalculate}
          setMatchesByTab={setMatchesByTab}
        />

        <Separator className="my-5" />

        <TeamsTable teams={teams} />
      </Container>
    </React.Fragment>
  );
}
