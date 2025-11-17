"use client";
import { useMemo, useState } from "react";
import { POKEMON_DB } from "@/lib/pokemon";

export default function Page() {
  const ids = useMemo(() => Object.keys(POKEMON_DB), []);
  const [p1Id, setP1Id] = useState(ids[0]);
  const [p2Id, setP2Id] = useState(ids[1] ?? ids[0]);
  const [log, setLog] = useState("⚡ Benvenuto nell'Arena! Clicca INIZIA per combattere.\n");

  const start = () => {
    const a = POKEMON_DB[p1Id]; const d = POKEMON_DB[p2Id];
    setLog(prev => prev + `🎮 Battaglia iniziata!\n${a.icon} Player 1: ${a.name} vs ${d.icon} Player 2: ${d.name}\n\n`);
  };

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-extrabold">AI Pokémon Battle Arena</h1>
      <div className="grid grid-cols-2 gap-4">
        <select className="bg-zinc-900 rounded p-2" value={p1Id} onChange={e=>setP1Id(e.target.value)}>
          {ids.map(id => <option key={id} value={id}>{POKEMON_DB[id].icon} {POKEMON_DB[id].name}</option>)}
        </select>
        <select className="bg-zinc-900 rounded p-2" value={p2Id} onChange={e=>setP2Id(e.target.value)}>
          {ids.map(id => <option key={id} value={id}>{POKEMON_DB[id].icon} {POKEMON_DB[id].name}</option>)}
        </select>
      </div>
      <button onClick={start} className="bg-indigo-600 hover:bg-indigo-500 rounded px-4 py-2 font-semibold">🚀 Inizia Battaglia</button>
      <pre className="bg-black/60 border border-zinc-800 rounded p-3 whitespace-pre-wrap">{log}</pre>
    </main>
  );
}
