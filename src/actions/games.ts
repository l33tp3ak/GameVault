
"use server ";


interface GameFormData {
// title , platform , status , rating ?, imageUrl ?
}


// TODO: Implé menter les 5 Server Actions suivantes
export async function addGame (data: GameFormData ) { ... }
export async function getUserGames () { ... }
export async function deleteGame (gameId : number) { ... }
export async function updateGame (gameId : number , data:
Partial < GameFormData >) { ... }
export async function getPublicGames () { ... }