"use server"

import db from "@/modules/db"
import { Prisma } from "@prisma/client"

export async function createProfessorAction(formData: FormData) {
	const newProfessor = {
		name: formData.get("name") as string,
		email: formData.get("email") as string,
		observation: formData.get("observation") as string,
		color: formData.get("color") as string,
	}

	try {
		const created = await db.professor.create({
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
