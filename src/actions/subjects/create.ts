"use server"

import db from "@/modules/db"
import { Prisma } from "@prisma/client"

export async function createSubject(formData: FormData) {
	const newSubject = {
		name: formData.get("name") as string,
		code: formData.get("code") as string,
		observation: formData.get("observation") as string,
		semester: Number(formData.get("semester")),
		hours: Number(formData.get("hours")),
		priority: Number(formData.get("priority")),
	}

	try {
		const created = await db.subject.create({
			data: newSubject,
		})

		return created
	} catch (err) {
		if (err instanceof Prisma.PrismaClientKnownRequestError) {
			if (err.code === "P2002") {
				return { error: "Já existe uma disciplina com esse código" }
			}
		}

		return { error: "Erro desconhecido" }
	}
}
