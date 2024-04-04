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
		let errors: string[] = []
		if (startTime && endTime) {
			if (checkTimeGreaterThan(endTime, startTime)) {
				errors.push("O horário de início não pode ser maior que o horário de término")
			}
		}

		if (startTime && endTime && dayOfWeek && selectedClassGroup) {
			const schedulesByDayAndClassGroup = props.schedules.filter(
				(s) => s.dayOfWeek === dayOfWeek && s.classGroup.id === selectedClassGroup.id
			)
			if (schedulesByDayAndClassGroup.length > 0) {
				schedulesByDayAndClassGroup.forEach((scheduleByDayAndClassGroup) => {
					if (
						checkTimeBetween(
							startTime,
							scheduleByDayAndClassGroup.startTime,
							scheduleByDayAndClassGroup.endTime
						) ||
						checkTimeBetween(
							endTime,
							scheduleByDayAndClassGroup.startTime,
							scheduleByDayAndClassGroup.endTime
						) ||
						startTime === scheduleByDayAndClassGroup.startTime ||
						endTime === scheduleByDayAndClassGroup.endTime ||
						checkTimeBetween(
							scheduleByDayAndClassGroup.startTime,
							startTime,
							endTime
						) ||
						checkTimeBetween(scheduleByDayAndClassGroup.endTime, startTime, endTime)
					) {
						errors.push(
							`Essa turma já está cadastrada no horário de ${scheduleByDayAndClassGroup.startTime} às ${scheduleByDayAndClassGroup.endTime}`
						)
					}
				})
			}
			const schedulesByDayAndClassroom = props.schedules.filter(
				(s) =>
					s.dayOfWeek === dayOfWeek &&
					s.classGroup.classroom?.id === selectedClassGroup.classroom?.id
			)
			if (schedulesByDayAndClassroom.length > 0) {
				schedulesByDayAndClassroom.forEach((scheduleByDayAndClassroom) => {
					if (
						checkTimeBetween(
							startTime,
							scheduleByDayAndClassroom.startTime,
							scheduleByDayAndClassroom.endTime
						) ||
						checkTimeBetween(
							endTime,
							scheduleByDayAndClassroom.startTime,
							scheduleByDayAndClassroom.endTime
						) ||
						startTime === scheduleByDayAndClassroom.startTime ||
						endTime === scheduleByDayAndClassroom.endTime ||
						checkTimeBetween(scheduleByDayAndClassroom.startTime, startTime, endTime) ||
						checkTimeBetween(scheduleByDayAndClassroom.endTime, startTime, endTime)
					) {
						errors.push(
							`Essa sala já está sendo utilizada no horário de ${scheduleByDayAndClassroom.startTime} às ${scheduleByDayAndClassroom.endTime} pela turma ${scheduleByDayAndClassroom.classGroup.name} - ${scheduleByDayAndClassroom.classGroup.subject.name} - ${scheduleByDayAndClassroom.classGroup.professor.name}`
						)
					}
				})
			}
			const schedulesByDayAndProfessor = props.schedules.filter(
				(s) =>
					s.dayOfWeek === dayOfWeek &&
					s.classGroup.professor.id === selectedClassGroup.professor.id
			)
			if (schedulesByDayAndProfessor) {
				schedulesByDayAndProfessor.forEach((scheduleByDayAndProfessor) => {
					if (
						checkTimeBetween(
							startTime,
							scheduleByDayAndProfessor.startTime,
							scheduleByDayAndProfessor.endTime
						) ||
						checkTimeBetween(
							endTime,
							scheduleByDayAndProfessor.startTime,
							scheduleByDayAndProfessor.endTime
						) ||
						startTime === scheduleByDayAndProfessor.startTime ||
						endTime === scheduleByDayAndProfessor.endTime ||
						checkTimeBetween(scheduleByDayAndProfessor.startTime, startTime, endTime) ||
						checkTimeBetween(scheduleByDayAndProfessor.endTime, startTime, endTime)
					) {
						errors.push(
							`Esse professor já está ministrando aula no horário de ${scheduleByDayAndProfessor.startTime} às ${scheduleByDayAndProfessor.endTime} para a turma ${scheduleByDayAndProfessor.classGroup.name} - ${scheduleByDayAndProfessor.classGroup.subject.name}`
						)
					}
				})
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
						textValue={`${classGroup.name} - ${classGroup.subject.name} - ${
							classGroup.professor.name
						} - ${
							classGroup.classroom
								? classGroup.classroom.name
								: "Sem laboratório definido"
						}`}
					>
						{classGroup.name} - {classGroup.subject.name} - {classGroup.professor.name}{" "}
						-{" "}
						{classGroup.classroom
							? classGroup.classroom.name
							: "Sem laboratório definido"}
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
