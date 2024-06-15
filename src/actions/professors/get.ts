"use server"

import db from "@/modules/db"

export async function getAllProfessors() {
	const professors = await db.professor.findMany({
		orderBy: {
			createdAt: "desc",
		},
	})

	return professors
}

export async function getProfessorById(id: string) {
	const professor = await db.professor.findUnique({
		where: {
			id,
		},
	})

	return professor
}
