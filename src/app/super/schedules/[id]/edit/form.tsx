"use client"

import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button, Input, Select, SelectItem } from "@nextui-org/react"

import { TClassGroupWithEverything } from "@/actions/class-groups/create"
import { ScheduleWithRelations } from "@/actions/schedules/get"
import { editScheduleAction } from "@/actions/schedules/edit"

import { TWeekDays } from "@/utils/WeekDay"

type FormProps = {
	classGroups: TClassGroupWithEverything[]
	schedule: ScheduleWithRelations
}

export default function Form(props: FormProps) {
	const router = useRouter()
	const [loading, setLoading] = useState(false)

	async function handleSubmit(formData: FormData) {
		setLoading(true)
		formData.append("id", props.schedule.id)
		const created = await editScheduleAction(formData)

		if ("error" in created) {
			toast.error(created.error)
		} else {
			toast.success("Horário editado com sucesso!")
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
			<Input
				isDisabled={loading}
				name="startTime"
				type="time"
				label="Horário de início"
				defaultValue={props.schedule.startTime}
			/>
			<Input
				isDisabled={loading}
				name="endTime"
				type="time"
				label="Horário de término"
				defaultValue={props.schedule.endTime}
			/>
			<Input
				isDisabled={loading}
				name="stepDuration"
				type="number"
				label="Duração da aula (min)"
				defaultValue={props.schedule.stepDuration.toString()}
			/>
			<Select
				items={TWeekDays}
				name="dayOfWeek"
				label="Dia da semana"
				placeholder="Selecione o dia"
				// selectionMode="multiple"
				defaultSelectedKeys={[props.schedule.dayOfWeek]}
			>
				{(day) => <SelectItem key={day.id}>{day.name}</SelectItem>}
			</Select>
			<Select
				items={props.classGroups}
				label="Turma"
				placeholder="Selecione a turma"
				name="classGroup"
				defaultSelectedKeys={[props.schedule.classGroup.id]}
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
				Editar
			</Button>
		</form>
	)
}
