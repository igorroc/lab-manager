"use server"

import { Prisma } from "@prisma/client"

import db from "@/modules/db"

export async function editClassroomAction(formData: FormData) {
	const newClassroom = {
		id: formData.get("id") as string,
		name: formData.get("name") as string,
		capacity: Number(formData.get("capacity")),
		computerCount: Number(formData.get("computerCount")),
		projectorCount: Number(formData.get("projectorCount")),
		priority: Number(formData.get("priority")),
		hasAir: formData.get("hasAir") === "true",
		active: formData.get("active") === "true",
	}

	try {
		const edited = await db.classroom.update({
			where: {
				id: newClassroom.id,
			},
			data: newClassroom,
		})

		return edited
	} catch (err) {
		if (err instanceof Prisma.PrismaClientKnownRequestError) {
			return {
				error: "Erro no banco de dados",
			}
		}

		return { error: "Erro desconhecido" }
	}
}
