"use client";


import { addGame } from "@/actions/games";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function AddGamePage() {
    const router = useRouter();
    const [Loading, setLoading] = useState(false);

    async function handleSubmission(formData : FormData) {
        setLoading(true);

        await addGame({
        title: formData.get("title") as string,
        platform: formData.get("platform") as any,
        status: formData.get("status") as any,
        rating: formData.get("rating")
            ? Number(formData.get("rating"))
            : undefined,
        imageUrl: formData.get("imageUrl") as string,
        });
        router.push("/dashboard");
        }



        return (
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-gray-100 p-6">
                <form
                    action={handleSubmission}
                    className="bg-white/90 backdrop-blur p-8 rounded-2xl shadow-xl w-full max-w-md space-y-5 border border-gray-200"
                >
                    <h1 className="text-3xl font-extrabold text-center text-emerald-700">
                     Ajouter un jeu
                    </h1>

                    <input
                    name="title"
                    required
                    placeholder="Titre du jeu"
                    className="w-full border border-gray-300 p-3 rounded-lg placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                    />

                    <select
                    name="platform"
                    required
                    className="w-full border border-gray-300 p-3 rounded-lg placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition">
                    <option value="">Plateforme</option>
                    <option value="PC">PC</option>
                    <option value="PS5">PS5</option>
                    <option value="XBOX">XBOX</option>
                    <option value="SWITCH">SWITCH</option>
                    <option value="MOBILE">MOBILE</option>
                    <option value="AUTRE">AUTRE</option>
                    </select>

                    <select
                    name="status"
                    className="w-full border border-gray-300 p-3 rounded-lg placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition">
                    <option value="" className="">Statut</option>
                    <option value="A_JOUER">À jouer</option>
                    <option value="EN_COURS">En cours</option>
                    <option value="TERMINE">Terminé</option>
                    <option value="ABANDONNE">Abandonné</option>
                    </select>

                    <input
                    type="number"
                    name="rating"
                    min="1"
                    max="5"
                    placeholder="Note (1 à 5)"
                    className="w-full border border-gray-300 p-3 rounded-lg placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"/>

                    <input
                    name="imageUrl"
                    placeholder="Image URL (optionnel)"
                    className="w-full border border-gray-300 p-3 rounded-lg placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"/>

                    <button
                    type="submit"
                    disabled={Loading}
                    className="w-full border border-gray-300 p-3 rounded-lg placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition">
                    {Loading ? "Ajout en cours..." : "Ajouter"}
                    </button>
                </form>
                </div>

        )
}


