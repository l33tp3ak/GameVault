"use client"; 

import { useEffect, useState } from "react";
import { getUserGames, deleteGame } from "@/actions/games";
import Link from "next/link";

interface Game {
  id: number;
  title: string;
  platform: string;
  status: string;
  rating: number | null;
}

export default function DashboardPage() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    async function fetchGames() {
      const data = await getUserGames();
      setGames(data);
    }
    fetchGames();
  },
  
  []);
    const handleDelete = async (id: number) => {
    await deleteGame(id);
    setGames(games.filter((game) => game.id !== id));
  };

  return (
     <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4 text-gray-700">Ma Collection</h1>
      <Link href="/dashboard/add" className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 "> + Ajouter un jeu </Link>

      <ul className="mt-6 space-y-3">
        {games.length === 0 && <p>Aucun jeu pour l'instant.</p>}
        {games.map((game) => (
          <li key={game.id} className="bg-white p-4 rounded shadow flex justify-between items-center">

            <div>
              <div className="font-bold text-gray-700">{game.title}</div>
              <div className="text-sm text-gray-600"> 
                {" console : " + game.platform} <br /> {"status : " + game.status} <br /> 
                {game.rating ? Array.from({ length: game.rating }, (_, i) => "⭐").join("") : "Non noté"}
              </div>
            </div>

            <button onClick={() => handleDelete(game.id)} className="text-red-600 hover:text-red-800">X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
