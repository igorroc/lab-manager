"use server"

import bcrypt from "bcrypt"

import db from "@/modules/db"
import { authenticateLoginSuper } from "@/modules/auth"

export async function loginSuper(formData: FormData) {
	const email = formData.get("email") as string
	const password = formData.get("password") as string

	if (!email || !password) {
		return {
			error: "Email e senha são obrigatórios",
		}
	}

	const existingUser = await db.superUser.findFirst({
		where: {
			email,
		},
	})

	if (!existingUser) {
		return {
			error: "Usuário não encontrado",
		}
	}

	const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

	if (!isPasswordCorrect) {
		return {
			error: "Usuário ou senha incorretos",
		}
	}

	await authenticateLoginSuper(existingUser)

	return existingUser
}
