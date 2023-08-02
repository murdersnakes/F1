import { utcToZonedTime } from "date-fns-tz";
import React from "react";
import CountdownTimer from "./CountdownTimer";
import MapComponent from "./MapComponent";
import dynamic from "next/dynamic";
import { format } from "date-fns";

function formatDate(dateString) {
  return format(new Date(dateString), "MMMM d, yyyy");
}

function formatTime(timeString) {
  return format(new Date(`1970-01-01T${timeString}`), "hh:mm a");
}

const DynamicMapComponent = dynamic(
  () => import("./MapComponent"),
  { ssr: false }, // This line will make the component to be rendered on client-side
);

async function getNextRace() {
  const res = await fetch("http://ergast.com/api/f1/current.json", {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();

  const races = data.MRData.RaceTable.Races;

  const nextRace = races.find((race): boolean => {
    const raceDateTime = utcToZonedTime(`${race.date}T${race.time}`, "Etc/UTC");
    return raceDateTime >= new Date();
  });

  return nextRace;
}

export default async function NextRace(): Promise<JSX.Element> {
  const nextRace = await getNextRace();
  console.log(nextRace);

  return (
    <div className="h-fit p-5 bg-neutral-200 rounded shadow-lg">
      <h1 className="font-light text-2xl">
        Next Race: <span className="font-medium">{nextRace.raceName}</span>
      </h1>
      <p className="font-light text-sm uppercase mt-3">
        Circuit Name:{" "}
        <span className="font-medium">{nextRace.Circuit.circuitName}</span>
      </p>
      <p className="font-light text-sm uppercase">
        1st Practice:{" "}
        <span className="font-medium">
          {formatDate(nextRace.FirstPractice.date)} •{" "}
          {formatTime(nextRace.FirstPractice.time)}
        </span>
      </p>
      <p className="font-light text-sm uppercase">
        2nd Practice:{" "}
        <span className="font-medium">
          {formatDate(nextRace.SecondPractice.date)} •{" "}
          {formatTime(nextRace.SecondPractice.time)}
        </span>
      </p>
      <p className="font-light text-sm uppercase">
        3rd Practice:{" "}
        <span className="font-medium">
          {formatDate(nextRace.ThirdPractice.date)} •{" "}
          {formatTime(nextRace.ThirdPractice.time)}
        </span>
      </p>
      <p className="font-light text-sm uppercase">
        Qualifying:{" "}
        <span className="font-medium">
          {formatDate(nextRace.Qualifying.date)} •{" "}
          {formatTime(nextRace.Qualifying.time)}
        </span>
      </p>
      {nextRace.Sprint && nextRace.Sprint.date ? (
        <p className="font-light text-sm uppercase">
          Sprint:{" "}
          <span className="font-medium">
            {formatDate(nextRace.Sprint.date)} •{" "}
            {formatTime(nextRace.Sprint.time)}
          </span>
        </p>
      ) : null}
      <p className="font-light text-sm uppercase">
        Race:{" "}
        <span className="font-medium">
          {formatDate(nextRace.date)} • {formatTime(nextRace.time)}
        </span>
      </p>
      <DynamicMapComponent location={nextRace.Circuit.Location} />
      <CountdownTimer targetDate={`${nextRace.date}T${nextRace.time}`} />
    </div>
  );
}
