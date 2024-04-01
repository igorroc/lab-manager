"use server"

import db from "@/modules/db"

export async function createClassroom(formData: FormData) {
	const newClassroom = {
		name: formData.get("name") as string,
		capacity: Number(formData.get("capacity")),
		computerCount: Number(formData.get("computerCount")),
		projectorCount: Number(formData.get("projectorCount")),
		priority: Number(formData.get("priority")),
	}

	try {
		const created = await db.classroom.create({
			data: newClassroom,
		})

		return created
	} catch (err) {
		if (err instanceof Error) {
			return { error: err.message }
		}

		return { error: "Erro desconhecido" }
	}
}
