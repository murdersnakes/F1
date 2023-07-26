import React from "react";
import NextRace from "./components/NextRace";
import DriversChampionship from "./components/DriversChampionship";
import ConstructorsChampionship from "./components/ConstructorsChampionship";

export default function page() {
  return (
    <div className="max-w-7xl mx-auto">
      <NextRace />
      <div className="flex flex-col lg:flex-row justify-center mt-10 gap-10">
        <DriversChampionship />
        <ConstructorsChampionship />
      </div>
    </div>
  );
}
