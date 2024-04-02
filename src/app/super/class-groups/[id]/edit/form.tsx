"use client"

import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Classroom, Professor, Subject } from "@prisma/client"
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react"

import { ClassGroupsWithRelations } from "@/actions/class-groups/get"
import { editClassGroupAction } from "@/actions/class-groups/edit"

type FormProps = {
	subjects: Subject[]
	professors: Professor[]
	classrooms: Classroom[]
	classGroup: ClassGroupsWithRelations
}

export default function Form(props: FormProps) {
	const router = useRouter()
	const [loading, setLoading] = useState(false)

	async function handleSubmit(formData: FormData) {
		setLoading(true)
		formData.append("id", props.classGroup.id)
		const created = await editClassGroupAction(formData)

		if ("error" in created) {
			toast.error(created.error)
		} else {
			toast.success("Turma editada com sucesso!")
			router.push("/super/class-groups")
		}

		setLoading(false)
	}

	useEffect(() => {
		if (props.subjects.length === 0) {
			toast.error("Nenhuma disciplina cadastrada")
			return router.push("/super/subjects/create")
		}
		if (props.professors.length === 0) {
			toast.error("Nenhum professor cadastrado")
			return router.push("/super/professors/create")
		}
		if (props.classrooms.length === 0) {
			toast.error("Nenhum laboratório cadastrado")
			return router.push("/super/classrooms/create")
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.subjects])

	return (
		<form action={handleSubmit} className="flex flex-col items-center gap-2">
			<Input
				isDisabled={loading}
				name="name"
				type="text"
				label="Nome"
				defaultValue={props.classGroup.name}
			/>
			<Textarea
				isDisabled={loading}
				name="observation"
				label="Observações"
				defaultValue={props.classGroup.observation || ""}
			/>
			<Input
				isDisabled={loading}
				name="alumniCount"
				type="number"
				label="Quantidade de vagas"
				defaultValue={props.classGroup.alumniCount.toString()}
			/>
			<Input
				isDisabled={loading}
				name="color"
				type="color"
				label="Cor"
				defaultValue={props.classGroup.color}
			/>
			<Select
				items={props.professors}
				label="Professor"
				placeholder="Selecione o professor"
				name="professor"
				defaultSelectedKeys={[props.classGroup.professor.id]}
			>
				{(professor) => <SelectItem key={professor.id}>{professor.name}</SelectItem>}
			</Select>
			<Select
				items={props.subjects}
				label="Disciplina"
				placeholder="Selecione a disciplina"
				name="subject"
				defaultSelectedKeys={[props.classGroup.subject.id]}
			>
				{(subject) => <SelectItem key={subject.id}>{subject.name}</SelectItem>}
			</Select>
			<Select
				items={props.classrooms}
				label="Laboratório"
				placeholder="Selecione o laboratório"
				name="classroom"
				defaultSelectedKeys={[props.classGroup.classroom.id]}
			>
				{(classroom) => <SelectItem key={classroom.id}>{classroom.name}</SelectItem>}
			</Select>
			<Button isLoading={loading} color="primary" className="w-full" type="submit">
				Editar
			</Button>
		</form>
	)
}
