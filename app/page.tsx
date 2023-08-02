import React from "react";
import NextRace from "./components/NextRace";
import DriversChampionship from "./components/DriversChampionship";
import ConstructorsChampionship from "./components/ConstructorsChampionship";
import Image from "next/image";

export default function page() {
  return (
    <div className="relative min-h-screen grid place-items-center py-10">
      <Image
        src="/car.webp"
        alt="car"
        fill={true}
        quality={25}
        className="-z-50 absolute w-full h-full top-0 left-0 object-cover"
      />
      <div className="absolute w-full h-full top-0 left-0 bg-black/75 -z-40"></div>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          <NextRace />
          <DriversChampionship />
          <ConstructorsChampionship />
        </div>
      </div>
    </div>
  );
}
