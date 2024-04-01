"use server"

import db from "@/modules/db"

export async function getAllProfessors() {
	const professors = await db.professor.findMany()

	return professors
}
