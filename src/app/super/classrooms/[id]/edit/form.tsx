"use client"

import { useState } from "react"
import { toast } from "react-toastify"
import { Classroom } from "@prisma/client"
import { useRouter } from "next/navigation"
import { Button, Input, Switch } from "@nextui-org/react"

import { revalidateAll } from "@/actions/revalidate"
import { editClassroomAction } from "@/actions/classrooms/edit"

type FormProps = {
	classroom: Classroom
}

export default function Form(props: FormProps) {
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const [checkboxes, setCheckboxes] = useState({
		hasAir: props.classroom.hasAir,
		active: props.classroom.active,
	})

	async function handleSubmit(formData: FormData) {
		setLoading(true)

		formData.append("id", props.classroom.id.toString())
		formData.set("hasAir", checkboxes.hasAir.toString())
		formData.set("active", checkboxes.active.toString())

		const created = await editClassroomAction(formData)

		if ("error" in created) {
			toast.error(created.error)
		} else {
			toast.success("Laboratório editado com sucesso!")
			await revalidateAll()
			router.push("/super/classrooms")
		}

		setLoading(false)
	}

	return (
		<form action={handleSubmit} className="flex flex-col gap-2">
			<Input
				isRequired
				isDisabled={loading}
				name="name"
				type="text"
				label="Nome"
				defaultValue={props.classroom.name}
			/>
			<Input
				isRequired
				isDisabled={loading}
				name="capacity"
				type="number"
				label="Capacidade"
				defaultValue={props.classroom.capacity.toString()}
			/>
			<Input
				isRequired
				isDisabled={loading}
				name="computerCount"
				type="number"
				label="Quantidade de computadores"
				defaultValue={props.classroom.computerCount.toString()}
			/>
			<Input
				isRequired
				isDisabled={loading}
				name="projectorCount"
				type="number"
				label="Quantidade de projetores"
				defaultValue={props.classroom.projectorCount.toString()}
			/>
			<Input
				isDisabled={loading}
				name="priority"
				type="number"
				label="Prioridade"
				defaultValue={props.classroom.priority.toString()}
			/>
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
				Editar
			</Button>
		</form>
	)
}
