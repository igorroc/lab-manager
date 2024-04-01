"use client"

import { Role } from "@prisma/client"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

import { loginAction } from "@/actions/auth/login"

export default function Form() {
	const router = useRouter()

	async function handleSubmit(formData: FormData) {
		const res = await loginAction(formData)

		if ("error" in res) {
			toast.error(res.error)
			return
		}

		if (res.role == Role.ADMIN) {
			toast.success("Logado com sucesso")
			router.push("/super/dashboard")
		} else {
			toast.error("Você não tem permissão para acessar esta página")
		}
	}

	return (
		<form action={handleSubmit} className="flex flex-col items-center">
			<label htmlFor="email">Email</label>
			<input type="email" name="email" id="email" className="text-black" />
			<label htmlFor="password">Senha</label>
			<input type="password" name="password" id="password" className="text-black" />
			<button type="submit">Entrar</button>
		</form>
	)
}
