"use server ";

import prisma from "../lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export interface GameFormData {
  title: string;
  platform: "PC" | "PS5" | "XBOX" | "SWITCH" | "MOBILE" | "AUTRE";
  status: "A_JOUER" | "EN_COURS" | "TERMINE" | "ABANDONNE";
  rating?: number; 
  imageUrl?: string;  
}

// TODO: Implé menter les 5 Server Actions suivantes
export async function addGame(data: GameFormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Utilisateur non authentifié");

  await prisma.game.create({
    data: {
      ...data,
      userId,
      isPublic: true, 
    },
  });

  revalidatePath("/dashboard");
}

export async function getUserGames() {
  const { userId } = await auth();
  if (!userId) throw new Error("Utilisateur non authentifié");

  return await prisma.game.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}


export async function deleteGame (gameId : number) { 
    const { userId } = await auth();
    if(!userId) {
        throw new Error("Utilisateur non authentifié");
    }

    return await prisma.game.findMany({
        where: { userId }, orderBy: { createdAt: "desc" },
    })

 }
export async function updateGame (gameId : number , data: Partial < GameFormData >) { 
    const { userId } = await auth();
    if(!userId) {
        throw new Error("Utilisateur non authentifié");
    }


    // verifier le ownership du jeu
    const game = await prisma.game.findUnique({
        where: { id: gameId },
    })
    if(!game || game.userId !== userId) {
        throw new Error("Vous n avez pas le droit de modifier le jeu");
    }
    await prisma.game.update({
        where: { id: gameId },
        data,
    })
    revalidatePath("/dashboard");
 }

export async function getPublicGames () { 
    return await prisma.game.findMany({
        where : { isPublic: true },
        orderBy: { createdAt: "desc" },
    })
}