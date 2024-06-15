"use client"

import { useState } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { Button, Input, Switch } from "@nextui-org/react"

import { revalidateAll } from "@/actions/revalidate"
import { createClassroomAction } from "@/actions/classrooms/create"

export default function Form() {
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const [checkboxes, setCheckboxes] = useState({
		hasAir: false,
		active: true,
	})

	async function handleSubmit(formData: FormData) {
		setLoading(true)

		formData.set("hasAir", checkboxes.hasAir.toString())
		formData.set("active", checkboxes.active.toString())

		const created = await createClassroomAction(formData)

		if ("error" in created) {
			toast.error(created.error)
		} else {
			toast.success("Laboratório cadastrado com sucesso!")
			await revalidateAll()
			router.push("/super/classrooms")
		}

		setLoading(false)
	}

	return (
		<form action={handleSubmit} className="flex flex-col gap-2">
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
			<Switch
				isDisabled={loading}
				name="hasAir"
				onChange={(e) => setCheckboxes({ ...checkboxes, hasAir: e.target.checked })}
				defaultSelected={checkboxes.hasAir}
			>
				Possui ar condicionado
			</Switch>
			<Switch
				isDisabled={loading}
				name="active"
				onChange={(e) => setCheckboxes({ ...checkboxes, active: e.target.checked })}
				defaultSelected={checkboxes.active}
			>
				Ativo
			</Switch>
			<Button isLoading={loading} color="primary" className="w-full" type="submit">
				Cadastrar
			</Button>
		</form>
	)
}
