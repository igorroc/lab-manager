"use server"

import { Prisma } from "@prisma/client"

import db from "@/modules/db"

export async function createProfessorAction(formData: FormData) {
	const newProfessor = {
		name: formData.get("name") as string,
		email: formData.get("email") as string,
		phone: formData.get("phone") as string,
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

			return {
				error: "Erro no banco de dados",
			}
		}

		return { error: "Erro desconhecido" }
	}
}
