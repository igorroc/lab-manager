"use client"

import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

import { loginSuper } from "@/actions/auth/login"

export default function Form() {
	const router = useRouter()

	async function handleSubmit(formData: FormData) {
		const res = await loginSuper(formData)

		if ("error" in res) {
			toast.error(res.error)
			return
		}

		toast.success("Logado com sucesso")
		router.push("/super/dashboard")
	}

	return (
		<form action={handleSubmit}>
			<label htmlFor="email">Email</label>
			<input type="email" name="email" id="email" className="text-black" />
			<label htmlFor="password">Senha</label>
			<input type="password" name="password" id="password" className="text-black" />
			<button type="submit">Entrar</button>
		</form>
	)
}
