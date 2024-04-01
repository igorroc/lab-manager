"use client"

import { useState } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { Button, Input, Textarea } from "@nextui-org/react"

import { createSubjectAction } from "@/actions/subjects/create"

export default function Form() {
	const router = useRouter()
	const [loading, setLoading] = useState(false)

	async function handleSubmit(formData: FormData) {
		setLoading(true)
		const created = await createSubjectAction(formData)

		if ("error" in created) {
			toast.error(created.error)
		} else {
			toast.success("Disciplina cadastrada com sucesso!")
			router.push("/super/subjects")
		}

		setLoading(false)
	}

	return (
		<form action={handleSubmit} className="flex flex-col items-center gap-2">
			<Input isDisabled={loading} name="name" type="text" label="Nome" />
			<Input isDisabled={loading} name="code" type="text" label="Código" />
			<Textarea isDisabled={loading} name="observation" label="Observações" />
			<Input isDisabled={loading} name="semester" type="number" label="Semestre" />
			<Input isDisabled={loading} name="hours" type="number" label="Carga horária" />
			<Input isDisabled={loading} name="priority" type="number" label="Prioridade" />
			<Button isLoading={loading} color="primary" className="w-full" type="submit">
				Cadastrar
			</Button>
		</form>
	)
}