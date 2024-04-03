"use client"

import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button, Input, Select, SelectItem } from "@nextui-org/react"

import { ScheduleWithRelations } from "@/actions/schedules/get"
import { createScheduleAction } from "@/actions/schedules/create"
import { TClassGroupWithEverything } from "@/actions/class-groups/create"

import { TWeekDays } from "@/utils/WeekDay"
import { checkTimeBetween, checkTimeGreaterThan } from "@/utils/Date"

type FormProps = {
	classGroups: TClassGroupWithEverything[]
	schedules: ScheduleWithRelations[]
}

export default function Form(props: FormProps) {
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const [errorMessages, setErrorMessages] = useState<string[]>([])
	const [startTime, setStartTime] = useState("")
	const [endTime, setEndTime] = useState("")
	const [dayOfWeek, setDayOfWeek] = useState("")
	const [selectedClassGroup, setSelectedClassGroup] = useState<
		TClassGroupWithEverything | undefined
	>()

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

	useEffect(() => {
		console.log(startTime, endTime, dayOfWeek, selectedClassGroup)
		let errors: string[] = []
		if (startTime && endTime) {
			if (checkTimeGreaterThan(endTime, startTime)) {
				errors.push("O horário de início não pode ser maior que o horário de término")
			}
		}

		if (startTime && endTime && dayOfWeek && selectedClassGroup) {
			const schedule = props.schedules.find(
				(s) => s.dayOfWeek === dayOfWeek && s.classGroupId === selectedClassGroup.id
			)
			if (schedule) {
				if (
					checkTimeBetween(startTime, schedule.startTime, schedule.endTime) ||
					checkTimeBetween(endTime, schedule.startTime, schedule.endTime)
				) {
					errors.push(
						`Essa turma já está cadastrada no horário de ${schedule.startTime} às ${schedule.endTime}`
					)
				}
			}
		}
		if (errors.length > 0) {
			setErrorMessages(errors)
		} else {
			setErrorMessages([])
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [startTime, endTime, dayOfWeek, selectedClassGroup])

	return (
		<form action={handleSubmit} className="flex flex-col items-center gap-2">
			<Input
				isRequired
				isDisabled={loading}
				name="startTime"
				type="time"
				label="Horário de início"
				value={startTime}
				onChange={(e) => setStartTime(e.target.value)}
			/>
			<Input
				isRequired
				isDisabled={loading}
				name="endTime"
				type="time"
				label="Horário de término"
				value={endTime}
				onChange={(e) => setEndTime(e.target.value)}
			/>
			<Input
				isRequired
				isDisabled={loading}
				name="stepDuration"
				type="number"
				label="Duração da aula (min)"
				defaultValue="50"
			/>
			<Select
				isRequired
				items={TWeekDays}
				name="dayOfWeek"
				label="Dia da semana"
				placeholder="Selecione o dia"
				// selectionMode="multiple"
				value={dayOfWeek}
				onChange={(e) => setDayOfWeek(e.target.value)}
			>
				{(day) => <SelectItem key={day.id}>{day.name}</SelectItem>}
			</Select>
			<Select
				isRequired
				items={props.classGroups}
				label="Turma"
				placeholder="Selecione a turma"
				name="classGroup"
				value={selectedClassGroup?.id}
				onChange={(e) =>
					setSelectedClassGroup(props.classGroups.find((cg) => cg.id === e.target.value))
				}
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
			{errorMessages &&
				errorMessages.map((error, index) => (
					<p
						key={index}
						className="px-4 py-2 rounded-lg w-full border border-red-600 text-red-600 font-medium"
					>
						{error}
					</p>
				))}
			<Button
				isLoading={loading}
				color={errorMessages.length > 0 ? "danger" : "primary"}
				className="w-full"
				type="submit"
				isDisabled={errorMessages.length > 0}
			>
				{errorMessages.length > 0 ? "Corrija os erros" : "Cadastrar"}
			</Button>
		</form>
	)
}
