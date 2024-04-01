"use server"

import db from "@/modules/db"
import { Prisma } from "@prisma/client"

export async function createClassGroupAction(formData: FormData) {
	const newProfessor = {
		name: formData.get("name") as string,
		alumniCount: Number(formData.get("alumniCount")),
		observation: formData.get("observation") as string,
		color: formData.get("color") as string,
		professorId: formData.get("professor") as string,
		subjectId: formData.get("subject") as string,
		classroomId: formData.get("classroom") as string,
	}

	try {
		const created = await db.classGroup.create({
			data: newProfessor,
		})

		return created
	} catch (err) {
		if (err instanceof Prisma.PrismaClientKnownRequestError) {
			if (err.code === "P2002") {
				return { error: "Já existe um professor com esse email" }
			}
		}

		return { error: "Erro desconhecido" }
	}
}
