"use client"

import { useState } from "react"
import { toast } from "react-toastify"
import { Professor } from "@prisma/client"
import { useRouter } from "next/navigation"
import { Button, Input, Textarea } from "@nextui-org/react"

import { editProfessorAction } from "@/actions/professors/edit"

type FormProps = {
	professor: Professor
}

export default function Form(props: FormProps) {
	const router = useRouter()
	const [loading, setLoading] = useState(false)

	async function handleSubmit(formData: FormData) {
		setLoading(true)
		formData.append("id", props.professor.id.toString())
		const edited = await editProfessorAction(formData)

		if ("error" in edited) {
			toast.error(edited.error)
		} else {
			toast.success("Professor editado com sucesso!")
			router.push("/super/professors")
		}

		setLoading(false)
	}

	return (
		<form action={handleSubmit} className="flex flex-col items-center gap-2">
			<Input
				isDisabled={loading}
				name="name"
				type="text"
				label="Nome"
				defaultValue={props.professor.name}
			/>
			<Input
				isDisabled={loading}
				name="email"
				type="email"
				label="Email"
				defaultValue={props.professor.email}
			/>
			<Textarea
				isDisabled={loading}
				name="observation"
				label="Observações"
				defaultValue={props.professor.observation || ""}
			/>
			<Input
				isDisabled={loading}
				name="color"
				type="color"
				label="Cor"
				defaultValue={props.professor.color}
			/>
			<Button isLoading={loading} color="primary" className="w-full" type="submit">
				Editar
			</Button>
		</form>
	)
}