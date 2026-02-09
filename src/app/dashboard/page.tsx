"use client"; // Use client because we may use hooks

import { useEffect, useState } from "react";
import { getUserGames, deleteGame } from "@/actions/games";

export default function DashboardPage() {
  const [games, setGames] = useState<any[]>([]);

  // Load games on mount
  useEffect(() => {
    async function fetchGames() {
      const data = await getUserGames();
      setGames(data);
    }
    fetchGames();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <ul className="mt-4 space-y-2">
        {games.map((game) => (
          <li key={game.id} className="border p-2 rounded flex justify-between">
            <span>
              <strong>{game.title}</strong> — {game.platform} — {game.status} —{" "}
              {game.rating ?? "No rating"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
