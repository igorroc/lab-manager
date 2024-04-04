"use server"

import { Prisma } from "@prisma/client"

import db from "@/modules/db"

export type TClassGroupWithEverything = Prisma.ClassGroupGetPayload<{
	include: {
		classroom: true
		professor: true
		subject: true
	}
}>

export async function createClassGroupAction(formData: FormData) {
	let newClassGroup =
		formData.get("classroom") != ""
			? {
					name: formData.get("name") as string,
					alumniCount: Number(formData.get("alumniCount")),
					observation: formData.get("observation") as string,
					color: formData.get("color") as string,
					professorId: formData.get("professor") as string,
					subjectId: formData.get("subject") as string,
					classroomId: formData.get("classroom") as string,
			  }
			: {
					name: formData.get("name") as string,
					alumniCount: Number(formData.get("alumniCount")),
					observation: formData.get("observation") as string,
					color: formData.get("color") as string,
					professorId: formData.get("professor") as string,
					subjectId: formData.get("subject") as string,
			  }

	try {
		const created = await db.classGroup.create({
			data: newClassGroup,
		})

		return created
	} catch (err) {
		if (err instanceof Prisma.PrismaClientKnownRequestError) {
			console.log(err)
			return {
				error: "Erro no banco de dados",
			}
		}

		return { error: "Erro desconhecido" }
	}
}
