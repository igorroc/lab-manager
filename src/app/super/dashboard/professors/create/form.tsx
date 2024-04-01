"use client"

import { useState } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { Button, Input, Textarea } from "@nextui-org/react"

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
			router.push("/super/dashboard/professors")
		}

		setLoading(false)
	}

	return (
		<form action={handleSubmit} className="flex flex-col items-center gap-2">
			<Input isDisabled={loading} name="name" type="text" label="Nome" />
			<Input isDisabled={loading} name="email" type="email" label="Email" />
			<Textarea isDisabled={loading} name="observation" label="Observações" />
			<Input
				isDisabled={loading}
				name="color"
				type="color"
				label="Cor"
				defaultValue="#ef531c"
			/>
			<Button isLoading={loading} color="primary" className="w-full" type="submit">
				Cadastrar
			</Button>
		</form>
	)
}
