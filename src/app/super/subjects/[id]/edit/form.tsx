"use client"

import { useState } from "react"
import { toast } from "react-toastify"
import { Subject } from "@prisma/client"
import { useRouter } from "next/navigation"
import { Button, Input, Textarea } from "@nextui-org/react"

import { revalidateAll } from "@/actions/revalidate"
import { editSubjectAction } from "@/actions/subjects/edit"

type FormProps = {
	subject: Subject
}

export default function Form(props: FormProps) {
	const router = useRouter()
	const [loading, setLoading] = useState(false)

	async function handleSubmit(formData: FormData) {
		setLoading(true)
		formData.append("id", props.subject.id)
		const created = await editSubjectAction(formData)

		if ("error" in created) {
			toast.error(created.error)
		} else {
			toast.success("Disciplina cadastrada com sucesso!")
			router.push("/super/subjects")
			await revalidateAll()
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
				defaultValue={props.subject.name}
			/>
			<Input
				isRequired
				isDisabled={loading}
				name="code"
				type="text"
				label="Código"
				defaultValue={props.subject.code}
			/>
			<Textarea
				isDisabled={loading}
				name="observation"
				label="Observações"
				defaultValue={props.subject.observation || ""}
			/>
			<Input
				isRequired
				isDisabled={loading}
				name="semester"
				type="number"
				label="Semestre"
				defaultValue={props.subject.semester.toString()}
			/>
			<Input
				isRequired
				isDisabled={loading}
				name="hours"
				type="number"
				label="Carga horária"
				defaultValue={props.subject.hours.toString()}
			/>
			<Input
				isDisabled={loading}
				name="priority"
				type="number"
				label="Prioridade"
				defaultValue={props.subject.priority.toString()}
			/>
			<Button isLoading={loading} color="primary" className="w-full" type="submit">
				Editar
			</Button>
		</form>
	)
}
