"use client"

import { useState } from "react"
import { toast } from "react-toastify"
import { Professor } from "@prisma/client"
import { useRouter } from "next/navigation"
import { Button, Input, Textarea } from "@nextui-org/react"

import { revalidateAll } from "@/actions/revalidate"
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
			await revalidateAll()
		}

		setLoading(false)
	}

	return (
		<form action={handleSubmit} className="flex flex-col items-center gap-2">
			<Input
				isDisabled={loading}
				isRequired
				name="name"
				type="text"
				label="Nome"
				defaultValue={props.professor.name}
			/>
			<Input
				isDisabled={loading}
				isRequired
				name="email"
				type="email"
				label="Email"
				defaultValue={props.professor.email}
			/>
			<Input
				isDisabled={loading}
				name="phone"
				type="tel"
				label="Telefone"
				defaultValue={props.professor.phone || ""}
			/>
			<Textarea
				isDisabled={loading}
				name="observation"
				label="Observações"
				defaultValue={props.professor.observation || ""}
			/>
			<Button isLoading={loading} color="primary" className="w-full" type="submit">
				Editar
			</Button>
		</form>
	)
}
