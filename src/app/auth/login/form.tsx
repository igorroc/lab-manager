"use client"

import { useRef, useState } from "react"
import { Role } from "@prisma/client"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { Button, Input } from "@nextui-org/react"

import { loginAction } from "@/actions/auth/login"

export default function Form() {
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const formRef = useRef<HTMLFormElement>(null)

	async function handleSubmit(event: React.FormEvent) {
		event.preventDefault()
		setLoading(true)
		if (!formRef.current) {
			toast.error("Ocorreu um erro inesperado. Tente novamente mais tarde.")
			return console.error(`formRef.current is null`)
		}

		const formData = new FormData(formRef.current)

		const res = await loginAction(formData)

		if ("error" in res) {
			toast.error(res.error)
			setLoading(false)
			return
		}

		if (res.role == Role.ADMIN) {
			router.push("/super/dashboard")
			toast.success("Logado com sucesso")
		} else {
			toast.error("Você não tem permissão para acessar esta página")
		}
	}

	return (
		<form onSubmit={handleSubmit} className="flex flex-col items-center gap-2" ref={formRef}>
			<Input isDisabled={loading} name="email" type="email" label="E-mail" />
			<Input isDisabled={loading} name="password" type="password" label="Senha" />

			<Button isLoading={loading} type="submit" color="primary" className="w-full">
				Entrar
			</Button>
		</form>
	)
}
