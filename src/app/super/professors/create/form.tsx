"use client"

import { useState } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { Button, Input, Textarea } from "@nextui-org/react"

import { revalidateAll } from "@/actions/revalidate"
import { createProfessorAction } from "@/actions/professors/create"

export default function Form() {
	const router = useRouter()
	const [loading, setLoading] = useState(false)

	async function handleSubmit(formData: FormData) {
		setLoading(true)
		const created = await createProfessorAction(formData)

		if ("error" in created) {
			toast.error(created.error)
		} else {
			toast.success("Professor cadastrado com sucesso!")
			await revalidateAll()
			router.push("/super/professors")
		}

		setLoading(false)
	}

	return (
		<form action={handleSubmit} className="flex flex-col items-center gap-2">
			<Input isRequired isDisabled={loading} name="name" type="text" label="Nome" />
			<Input isRequired isDisabled={loading} name="email" type="email" label="Email" />
			<Input isDisabled={loading} name="phone" type="tel" label="Telefone" />
			<Textarea isDisabled={loading} name="observation" label="Observações" />
			<Button isLoading={loading} color="primary" className="w-full" type="submit">
				Cadastrar
			</Button>
		</form>
	)
}
