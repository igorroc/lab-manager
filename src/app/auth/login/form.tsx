"use client"

import { Role } from "@prisma/client"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { Button, Input } from "@nextui-org/react"

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
		<form action={handleSubmit} className="flex flex-col items-center gap-2">
			<Input name="email" type="email" label="E-mail" />
			<Input name="password" type="password" label="Senha" />

			<Button type="submit" color="primary" className="w-full">
				Entrar
			</Button>
		</form>
	)
}
