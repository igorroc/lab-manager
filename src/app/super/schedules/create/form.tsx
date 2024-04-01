"use client"

import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button, Input, Select, SelectItem } from "@nextui-org/react"

import { TClassGroupWithEverything } from "@/actions/class-groups/create"
import { createScheduleAction } from "@/actions/schedules/create"

import { TWeekDays } from "@/utils/WeekDay"

type FormProps = {
	classGroups: TClassGroupWithEverything[]
}

export default function Form(props: FormProps) {
	const router = useRouter()
	const [loading, setLoading] = useState(false)

	async function handleSubmit(formData: FormData) {
		setLoading(true)
		const created = await createScheduleAction(formData)

		if ("error" in created) {
			toast.error(created.error)
		} else {
			toast.success("Horário cadastrado com sucesso!")
			router.push("/super/schedules")
		}

		setLoading(false)
	}

	useEffect(() => {
		if (props.classGroups.length === 0) {
			toast.error("Nenhuma turma cadastrada")
			return router.push("/super/class-groups/create")
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.classGroups])

	return (
		<form action={handleSubmit} className="flex flex-col items-center gap-2">
			<Input isDisabled={loading} name="startTime" type="time" label="Horário de início" />
			<Input isDisabled={loading} name="endTime" type="time" label="Horário de término" />
			<Input
				isDisabled={loading}
				name="stepDuration"
				type="number"
				label="Duração da aula (min)"
				defaultValue="50"
			/>
			<Select
				items={TWeekDays}
				name="dayOfWeek"
				label="Dia da semana"
				placeholder="Selecione o dia"
				// selectionMode="multiple"
			>
				{(day) => <SelectItem key={day.id}>{day.name}</SelectItem>}
			</Select>
			<Select
				items={props.classGroups}
				label="Turma"
				placeholder="Selecione a turma"
				name="classGroup"
			>
				{(classGroup) => (
					<SelectItem
						key={classGroup.id}
						textValue={`${classGroup.name} - ${classGroup.subject.name} - ${classGroup.professor.name} - ${classGroup.classroom.name}`}
					>
						{classGroup.name} - {classGroup.subject.name} - {classGroup.professor.name}{" "}
						- {classGroup.classroom.name}
					</SelectItem>
				)}
			</Select>
			<Button isLoading={loading} color="primary" className="w-full" type="submit">
				Cadastrar
			</Button>
		</form>
	)
}
