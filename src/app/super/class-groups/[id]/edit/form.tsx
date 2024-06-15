"use client"

import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Classroom, Professor, Subject } from "@prisma/client"
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react"

import { revalidateAll } from "@/actions/revalidate"
import { editClassGroupAction } from "@/actions/class-groups/edit"
import { ClassGroupsWithRelations } from "@/actions/class-groups/get"

type FormProps = {
	subjects: Subject[]
	professors: Professor[]
	classrooms: Classroom[]
	classGroup: ClassGroupsWithRelations
}

export default function Form(props: FormProps) {
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState("")
	const [selectedClassroom, setSelectedClassroom] = useState<Classroom | undefined>(
		props.classGroup.classroom || undefined
	)
	const [alumniCount, setAlumniCount] = useState(props.classGroup.alumniCount.toString())

	async function handleSubmit(formData: FormData) {
		setLoading(true)
		formData.append("id", props.classGroup.id)
		const created = await editClassGroupAction(formData)

		if ("error" in created) {
			toast.error(created.error)
		} else {
			toast.success("Turma editada com sucesso!")
			router.push("/super/class-groups")
			await revalidateAll()
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

	useEffect(() => {
		if (alumniCount && selectedClassroom) {
			if (parseInt(alumniCount) > selectedClassroom.capacity) {
				setErrorMessage(
					`O laboratório ${selectedClassroom.name} tem capacidade para apenas ${selectedClassroom.capacity} alunos.`
				)
			} else {
				setErrorMessage("")
			}
		}
	}, [alumniCount, selectedClassroom])

	return (
		<form action={handleSubmit} className="flex flex-col items-center gap-2">
			<Input
				isRequired
				isDisabled={loading}
				name="name"
				type="text"
				label="Nome"
				defaultValue={props.classGroup.name}
				description="Exemplo: T1"
			/>
			<Textarea
				isDisabled={loading}
				name="observation"
				label="Observações"
				defaultValue={props.classGroup.observation || ""}
			/>
			<Input
				isRequired
				isDisabled={loading}
				name="alumniCount"
				type="number"
				label="Quantidade de vagas"
				value={alumniCount}
				onChange={(e) => setAlumniCount(e.target.value)}
			/>
			<Input
				isDisabled={loading}
				name="color"
				type="color"
				label="Cor"
				defaultValue={props.classGroup.color}
			/>
			<Select
				isRequired
				items={props.professors}
				label="Professor"
				placeholder="Selecione o professor"
				name="professor"
				defaultSelectedKeys={[props.classGroup.professor.id]}
			>
				{(professor) => <SelectItem key={professor.id}>{professor.name}</SelectItem>}
			</Select>
			<Select
				isRequired
				items={props.subjects}
				label="Disciplina"
				placeholder="Selecione a disciplina"
				name="subject"
				defaultSelectedKeys={[props.classGroup.subject.id]}
			>
				{(subject) => <SelectItem key={subject.id}>{subject.name}</SelectItem>}
			</Select>
			<Select
				isRequired
				items={props.classrooms}
				label="Laboratório"
				placeholder="Selecione o laboratório"
				name="classroom"
				onChange={(e) =>
					setSelectedClassroom(props.classrooms.find((c) => c.id === e.target.value))
				}
				value={selectedClassroom?.id}
				defaultSelectedKeys={
					props.classGroup.classroom ? [props.classGroup.classroom.id] : []
				}
			>
				{(classroom) => <SelectItem key={classroom.id}>{classroom.name}</SelectItem>}
			</Select>
			{errorMessage && (
				<p className="px-4 py-2 rounded-lg w-full border border-red-600 text-red-600 font-medium">
					{errorMessage}
				</p>
			)}
			<Button isLoading={loading} color="primary" className="w-full" type="submit">
				{errorMessage ? "Salvar mesmo assim" : "Salvar"}
			</Button>
		</form>
	)
}
