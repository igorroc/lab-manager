"use client"

import { useState } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { Button, Input } from "@nextui-org/react"

import { createClassroom } from "@/actions/classrooms/create"

export default function Form() {
	const router = useRouter()
	const [loading, setLoading] = useState(false)

	async function handleSubmit(formData: FormData) {
		setLoading(true)
		const created = await createClassroom(formData)

		if ("error" in created) {
			toast.error(created.error)
		} else {
			toast.success("Sala cadastrada com sucesso!")
			router.push("/super/dashboard/classrooms")
		}

		setLoading(false)
	}

	return (
		<form action={handleSubmit} className="flex flex-col items-center gap-2">
			<Input isDisabled={loading} name="name" type="text" label="Nome" />
			<Input isDisabled={loading} name="capacity" type="number" label="Capacidade" />
			<Input
				isDisabled={loading}
				name="computerCount"
				type="number"
				label="Quantidade de computadores"
			/>
			<Input
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
