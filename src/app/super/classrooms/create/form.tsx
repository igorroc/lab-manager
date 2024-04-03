"use client"

import { useState } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { Button, Input } from "@nextui-org/react"

import { createClassroomAction } from "@/actions/classrooms/create"

export default function Form() {
	const router = useRouter()
	const [loading, setLoading] = useState(false)

	async function handleSubmit(formData: FormData) {
		setLoading(true)
		const created = await createClassroomAction(formData)

		if ("error" in created) {
			toast.error(created.error)
		} else {
			toast.success("Laboratório cadastrado com sucesso!")
			router.push("/super/classrooms")
		}

		setLoading(false)
	}

	return (
		<form action={handleSubmit} className="flex flex-col items-center gap-2">
			<Input isRequired isDisabled={loading} name="name" type="text" label="Nome" />
			<Input
				isRequired
				isDisabled={loading}
				name="capacity"
				type="number"
				label="Capacidade"
			/>
			<Input
				isRequired
				isDisabled={loading}
				name="computerCount"
				type="number"
				label="Quantidade de computadores"
			/>
			<Input
				isRequired
				isDisabled={loading}
				name="projectorCount"
				type="number"
				label="Quantidade de projetores"
			/>
			<Input isDisabled={loading} name="priority" type="number" label="Prioridade" />
			<Button isLoading={loading} color="primary" className="w-full" type="submit">
				Cadastrar
			</Button>
		</form>
	)
}
