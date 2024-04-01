"use client"

import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react"

import { createClassGroupAction } from "@/actions/class-groups/create"
import { Classroom, Professor, Subject } from "@prisma/client"

type FormProps = {
	subjects: Subject[]
	professors: Professor[]
	classrooms: Classroom[]
}

export default function Form(props: FormProps) {
	const router = useRouter()
	const [loading, setLoading] = useState(false)

	async function handleSubmit(formData: FormData) {
		setLoading(true)
		const created = await createClassGroupAction(formData)

		if ("error" in created) {
			toast.error(created.error)
		} else {
			toast.success("Turma cadastrada com sucesso!")
			router.push("/super/dashboard/class-groups")
		}

		setLoading(false)
	}

	useEffect(() => {
		if (props.subjects.length === 0) {
			toast.error("Nenhuma disciplina cadastrada")
			return router.push("/super/dashboard/subjects/create")
		}
		if (props.professors.length === 0) {
			toast.error("Nenhum professor cadastrado")
			return router.push("/super/dashboard/professors/create")
		}
		if (props.classrooms.length === 0) {
			toast.error("Nenhuma sala cadastrada")
			return router.push("/super/dashboard/classrooms/create")
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.subjects])

	return (
		<form action={handleSubmit} className="flex flex-col items-center gap-2">
			<Input isDisabled={loading} name="name" type="text" label="Nome" />
			<Textarea isDisabled={loading} name="observation" label="Observações" />
			<Input
				isDisabled={loading}
				name="alumniCount"
				type="number"
				label="Quantidade de vagas"
			/>
			<Input
				isDisabled={loading}
				name="color"
				type="color"
				label="Cor"
				defaultValue="#275d2b"
			/>
			<Select
				items={props.professors}
				label="Professor"
				placeholder="Selecione o professor"
				name="professor"
			>
				{(professor) => <SelectItem key={professor.id}>{professor.name}</SelectItem>}
			</Select>
			<Select
				items={props.subjects}
				label="Disciplina"
				placeholder="Selecione a disciplina"
				name="subject"
			>
				{(subject) => <SelectItem key={subject.id}>{subject.name}</SelectItem>}
			</Select>
			<Select
				items={props.classrooms}
				label="Sala"
				placeholder="Selecione a sala"
				name="classroom"
			>
				{(classroom) => <SelectItem key={classroom.id}>{classroom.name}</SelectItem>}
			</Select>
			<Button isLoading={loading} color="primary" className="w-full" type="submit">
				Cadastrar
			</Button>
		</form>
	)
}
