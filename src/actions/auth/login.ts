"use server"

import bcrypt from "bcrypt"

import db from "@/modules/db"
import { authenticateLogin } from "@/modules/auth"

import { wait } from "@/utils/Await"

export async function loginAction(formData: FormData) {
	const email = formData.get("email") as string
	const password = formData.get("password") as string

	if (!email || !password) {
		return {
			error: "Email e senha são obrigatórios",
		}
	}

	const existingUser = await db.user.findFirst({
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

	await authenticateLogin(existingUser)

	return existingUser
}
