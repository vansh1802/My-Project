import React, { useState } from "react";

const players = [
  { id: 1, name: "Virat", role: "batsman" },
  { id: 2, name: "dhoni", role: "batsman" },
  { id: 3, name: "gautam gambhir", role: "all rounder" },
];

function PlayerList() {
  const [search, setSearch] = useState("");

  const filtered = players.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        placeholder="Search name"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <ul>
        {filtered.map(p => (
          <li key={p.id}>
            {p.name} - {p.role}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlayerList;