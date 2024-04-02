"use server"

import { Prisma } from "@prisma/client"

import db from "@/modules/db"

export async function editProfessorAction(formData: FormData) {
	const newProfessor = {
		id: formData.get("id") as string,
		name: formData.get("name") as string,
		email: formData.get("email") as string,
		observation: formData.get("observation") as string,
		color: formData.get("color") as string,
	}

	try {
		const edited = await db.professor.update({
			where: {
				id: newProfessor.id,
			},
			data: newProfessor,
		})

		return edited
	} catch (err) {
		if (err instanceof Prisma.PrismaClientKnownRequestError) {
			if (err.code === "P2002") {
				return { error: "Já existe um professor com esse email" }
			}

			return {
				error: "Erro no banco de dados",
			}
		}

		return { error: "Erro desconhecido" }
	}
}
