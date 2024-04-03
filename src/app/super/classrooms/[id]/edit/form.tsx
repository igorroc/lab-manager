"use client"

import { useState } from "react"
import { toast } from "react-toastify"
import { Classroom } from "@prisma/client"
import { useRouter } from "next/navigation"
import { Button, Input } from "@nextui-org/react"

import { editClassroomAction } from "@/actions/classrooms/edit"

type FormProps = {
	classroom: Classroom
}

export default function Form(props: FormProps) {
	const router = useRouter()
	const [loading, setLoading] = useState(false)

	async function handleSubmit(formData: FormData) {
		setLoading(true)
		formData.append("id", props.classroom.id.toString())

		const created = await editClassroomAction(formData)

		if ("error" in created) {
			toast.error(created.error)
		} else {
			toast.success("Laboratório editado com sucesso!")
			router.push("/super/classrooms")
		}

		setLoading(false)
	}

	return (
		<form action={handleSubmit} className="flex flex-col items-center gap-2">
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
			<Button isLoading={loading} color="primary" className="w-full" type="submit">
				Editar
			</Button>
		</form>
	)
}
