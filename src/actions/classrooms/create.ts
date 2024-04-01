"use server"

import { Prisma } from "@prisma/client"

import db from "@/modules/db"

export async function createClassroomAction(formData: FormData) {
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
		if (err instanceof Prisma.PrismaClientKnownRequestError) {
			return {
				error: "Erro no banco de dados",
			}
		}

		return { error: "Erro desconhecido" }
	}
}
