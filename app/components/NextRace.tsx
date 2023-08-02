import { intervalToDuration, formatDuration } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import React from "react";
import CountdownTimer from "./CountdownTimer";

async function getNextRace() {
  const res = await fetch("http://ergast.com/api/f1/current.json", { next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();

  const races = data.MRData.RaceTable.Races;
  const nextRace = races.find((race) => {
    const raceDateTime = utcToZonedTime(`${race.date}T${race.time}`, "Etc/UTC");
    console.log(raceDateTime);
    
    return raceDateTime >= new Date();
  });

  return nextRace;
}

async function getRemainingTime(nextRace) {
  const nextRaceDateTime = utcToZonedTime(
    `${nextRace.date}T${nextRace.time}`,
    "Etc/UTC",
  );
  const now = new Date();

  const duration = intervalToDuration({
    start: now,
    end: nextRaceDateTime,
  });

  const remainingTime = formatDuration(duration);
  return remainingTime;
}

export default async function NextRace() {
  const nextRace = await getNextRace();
  const remainingTime = await getRemainingTime(nextRace);

  return (
    <div className="max-w-2xl mx-auto p-10 bg-neutral-200 rounded shadow-lg">
      <h1 className="font-light text-2xl mb-5">Next Race: <span className="font-medium">{nextRace.raceName}</span></h1>
      <CountdownTimer targetDate={`${nextRace.date}T${nextRace.time}`} />
    </div>
  );
}
