import React from "react";

async function fetchConstructorsData() {
  const res = await fetch(
    "http://ergast.com/api/f1/current/constructorStandings.json",
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  const [table] = data.MRData.StandingsTable.StandingsLists;
  const positions = table.ConstructorStandings;

  return positions;
}

export default async function ConstructorsChampionship() {
  const data = await fetchConstructorsData();
  console.log(data);

  return (
    <table className="divide-y divide-gray-200 dark:divide-gray-700 rounded overflow-hidden h-fit shadow-lg">
      <thead>
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase bg-indigo-600">
            Position
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase bg-indigo-600">
            Team
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase bg-indigo-600">
            Points
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((pos, index) => (
          <tr key={index} className="odd:bg-white even:bg-neutral-200">
            <td className="px-6 py-1">{pos.position}</td>
            <td className="px-6 py-1">{pos.Constructor.name}</td>
            <td className="px-6 py-1">{pos.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
