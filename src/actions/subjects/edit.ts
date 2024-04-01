"use server"

import { Prisma } from "@prisma/client"

import db from "@/modules/db"

export async function editSubjectAction(formData: FormData) {
	const newSubject = {
		id: formData.get("id") as string,
		name: formData.get("name") as string,
		code: formData.get("code") as string,
		observation: formData.get("observation") as string,
		semester: Number(formData.get("semester")),
		hours: Number(formData.get("hours")),
		priority: Number(formData.get("priority")),
	}

	try {
		const edited = await db.subject.update({
			where: {
				id: newSubject.id,
			},
			data: newSubject,
		})

		return edited
	} catch (err) {
		if (err instanceof Prisma.PrismaClientKnownRequestError) {
			if (err.code === "P2002") {
				return { error: "Já existe uma disciplina com esse código" }
			}

			return {
				error: "Erro no banco de dados",
			}
		}

		return { error: "Erro desconhecido" }
	}
}
