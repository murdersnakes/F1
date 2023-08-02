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
      <table className="table-auto text-start w-full mt-3 mb-5">
        <thead className="text-left border-b-2 border-black">
          <tr>
            <th className="px-2 py-1">Event</th>
            <th className="px-2 py-1">Date</th>
            <th className="px-2 py-1">Time</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-gray-300 text-gray-600">
            <td className="border px-2 py-1">1st Practice</td>
            <td className="border px-2 py-1">
              {formatDate(nextRace.FirstPractice.date)}
            </td>
            <td className="border px-2 py-1">
              {formatTime(nextRace.FirstPractice.time)}
            </td>
          </tr>
          <tr className="bg-gray-300 text-gray-600">
            <td className="border px-2 py-1">2nd Practice</td>
            <td className="border px-2 py-1">
              {formatDate(nextRace.SecondPractice.date)}
            </td>
            <td className="border px-2 py-1">
              {formatTime(nextRace.SecondPractice.time)}
            </td>
          </tr>
          <tr className="bg-gray-300 text-gray-600">
            <td className="border px-2 py-1">3rd Practice</td>
            <td className="border px-2 py-1">
              {formatDate(nextRace.ThirdPractice.date)}
            </td>
            <td className="border px-2 py-1">
              {formatTime(nextRace.ThirdPractice.time)}
            </td>
          </tr>
          <tr className="bg-emerald-300 text-emerald-900">
            <td className="border px-2 py-1">Qualifying</td>
            <td className="border px-2 py-1">
              {formatDate(nextRace.Qualifying.date)}
            </td>
            <td className="border px-2 py-1">
              {formatTime(nextRace.Qualifying.time)}
            </td>
          </tr>
          {nextRace.Sprint && nextRace.Sprint.date ? (
            <tr className="bg-amber-300 text-amber-900">
              <td className="border px-2 py-1">Sprint</td>
              <td className="border px-2 py-1">
                {formatDate(nextRace.Sprint.date)}
              </td>
              <td className="border px-2 py-1">
                {formatTime(nextRace.Sprint.time)}
              </td>
            </tr>
          ) : null}
          <tr className="bg-rose-600 text-white">
            <td className="border px-2 py-1">Race</td>
            <td className="border px-2 py-1">{formatDate(nextRace.date)}</td>
            <td className="border px-2 py-1">{formatTime(nextRace.time)}</td>
          </tr>
        </tbody>
      </table>
      <DynamicMapComponent location={nextRace.Circuit.Location} />
      <CountdownTimer targetDate={`${nextRace.date}T${nextRace.time}`} />
    </div>
  );
}
