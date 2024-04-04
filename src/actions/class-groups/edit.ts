"use server"

import { Prisma } from "@prisma/client"

import db from "@/modules/db"

export async function editClassGroupAction(formData: FormData) {
	const newClassGroup = {
		id: formData.get("id") as string,
		name: formData.get("name") as string,
		alumniCount: Number(formData.get("alumniCount")),
		observation: formData.get("observation") as string,
		color: formData.get("color") as string,
		professorId: formData.get("professor") as string,
		subjectId: formData.get("subject") as string,
		classroomId: formData.get("classroom") as string,
	}

	try {
		const edited = await db.classGroup.update({
			where: {
				id: newClassGroup.id,
			},
			data: newClassGroup,
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

export async function setClassroomToClassGroupAction(classGroupId: string, classroomId: string) {
	try {
		const edited = await db.classGroup.update({
			where: {
				id: classGroupId,
			},
			data: {
				classroomId,
			},
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
