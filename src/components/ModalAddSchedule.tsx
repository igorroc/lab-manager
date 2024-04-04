"use client"

import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { Classroom } from "@prisma/client"
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Input,
	Select,
	SelectItem,
} from "@nextui-org/react"

import { TClassGroupWithEverything } from "@/actions/class-groups/create"
import { ScheduleWithRelations } from "@/actions/schedules/get"

import { TWeekDays } from "@/utils/WeekDay"
import { checkTimeBetween } from "@/utils/Date"
import { createScheduleAction } from "@/actions/schedules/create"
import { setClassroomToClassGroupAction } from "@/actions/class-groups/edit"

type ModalProps = {
	isOpen: boolean
	onOpenChange: () => void
	selectedClassroom?: Classroom | undefined | null
	selectedDay?: (typeof TWeekDays)[number]
	startTime?: string
	endTime?: string
	classGroups: TClassGroupWithEverything[]
	schedules: ScheduleWithRelations[]
}

export default function ModalAddSchedule(props: ModalProps) {
	const [endTime, setEndTime] = useState(props.endTime || "")
	const [selectedClassGroup, setSelectedClassGroup] = useState<
		TClassGroupWithEverything | undefined
	>()
	const [errorMessages, setErrorMessages] = useState<string[]>([])

	async function addSchedule(onClose: () => void) {
		if (errorMessages.length > 0) {
			return toast.error("Corrija os erros antes de adicionar o horário")
		}
		if (
			!selectedClassGroup ||
			!endTime ||
			!props.startTime ||
			!props.selectedDay ||
			!props.selectedClassroom
		) {
			return toast.error("Preencha todos os campos")
		}

		const formData = new FormData()
		formData.append("startTime", props.startTime)
		formData.append("endTime", endTime)
		formData.append("stepDuration", "50")
		formData.append("dayOfWeek", props.selectedDay.id)
		formData.append("classGroup", selectedClassGroup.id)

		const saveClassroom = await setClassroomToClassGroupAction(
			selectedClassGroup.id,
			props.selectedClassroom.id
		)
		if ("error" in saveClassroom) {
			return toast.error(saveClassroom.error)
		}
		const created = await createScheduleAction(formData)
		if ("error" in created) {
			return toast.error(created.error)
		}
		toast.success("Horário reservado com sucesso")
		onClose()
	}

	useEffect(() => {
		if (!props.startTime) {
			return setErrorMessages(["Selecione um horário de início"])
		}

		let errors: string[] = []
		if (props.startTime && endTime) {
			if (props.startTime >= endTime) {
				errors.push("O horário de término deve ser maior que o horário de início")
			}
		}

		if (selectedClassGroup) {
			const classGroupSchedules = props.schedules.filter(
				(s) => s.classGroupId === selectedClassGroup.id
			)
			classGroupSchedules.forEach((schedule) => {
				if (props.selectedDay && schedule.dayOfWeek === props.selectedDay.id) {
					if (props.startTime) {
						if (
							checkTimeBetween(
								props.startTime,
								schedule.startTime,
								schedule.endTime
							) ||
							checkTimeBetween(endTime, schedule.startTime, schedule.endTime)
						) {
							errors.push(
								`Essa turma já está reservada no horário de ${schedule.startTime} às ${schedule.endTime}`
							)
						}
					}
				}
			})
		}

		if (endTime && props.selectedDay && props.startTime) {
			const schedulesByDayAndClassroom = props.schedules.filter(
				(s) =>
					s.dayOfWeek === props.selectedDay?.id &&
					s.classGroup.classroom?.id === props.selectedClassroom?.id
			)
			schedulesByDayAndClassroom.forEach((schedule) => {
				if (
					checkTimeBetween(endTime, schedule.startTime, schedule.endTime) ||
					checkTimeBetween(
						props.startTime as string,
						schedule.startTime,
						schedule.endTime
					) ||
					props.startTime === schedule.startTime ||
					endTime === schedule.endTime ||
					checkTimeBetween(schedule.startTime, props.startTime as string, endTime) ||
					checkTimeBetween(schedule.endTime, props.startTime as string, endTime)
				) {
					errors.push(
						`Esse laboratório já está reservado no horário de ${schedule.startTime} às ${schedule.endTime}`
					)
				}
			})
			const schedulesByDayAndProfessor = props.schedules.filter(
				(s) =>
					s.dayOfWeek === props.selectedDay?.id &&
					s.classGroup.professor.id === selectedClassGroup?.professor.id
			)
			schedulesByDayAndProfessor.forEach((schedule) => {
				if (
					checkTimeBetween(endTime, schedule.startTime, schedule.endTime) ||
					checkTimeBetween(
						props.startTime as string,
						schedule.startTime,
						schedule.endTime
					) ||
					props.startTime === schedule.startTime ||
					endTime === schedule.endTime ||
					checkTimeBetween(schedule.startTime, props.startTime as string, endTime) ||
					checkTimeBetween(schedule.endTime, props.startTime as string, endTime)
				) {
					errors.push(
						`Esse professor já está reservado no horário de ${schedule.startTime} às ${schedule.endTime}`
					)
				}
			})
		}

		setErrorMessages(errors)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.startTime, endTime, selectedClassGroup, props.selectedDay, props.schedules])

	useEffect(() => {
		setEndTime(props.endTime || "")
	}, [props.endTime])

	return (
		<Modal isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className="flex flex-col gap-1">Reservar horário</ModalHeader>
						<ModalBody>
							{!props.selectedClassroom && !props.selectedDay && !props.startTime ? (
								<p>
									Selecione um laboratório, um dia da semana e um horário para
									adicionar um horário.
								</p>
							) : (
								<>
									<p>
										Você está reservando um horário para o laboratório{" "}
										<strong>{props.selectedClassroom?.name}</strong>, no dia{" "}
										<strong>{props.selectedDay?.name}</strong>, às{" "}
										<strong>{props.startTime}</strong>.
									</p>
									<Input
										isRequired
										name="endTime"
										type="time"
										label="Horário de término"
										value={endTime}
										onChange={(e) => setEndTime(e.target.value)}
									/>
									<Select
										isRequired
										items={props.classGroups}
										label="Turma"
										placeholder="Selecione a turma"
										name="classGroup"
										value={selectedClassGroup?.id}
										onChange={(e) =>
											setSelectedClassGroup(
												props.classGroups.find(
													(cg) => cg.id === e.target.value
												)
											)
										}
									>
										{(classGroup) => (
											<SelectItem
												key={classGroup.id}
												textValue={`${classGroup.name} - ${
													classGroup.subject.name
												} - ${classGroup.professor.name} - ${
													classGroup.classroom
														? classGroup.classroom.name
														: "Sem laboratório definido"
												}`}
											>
												{classGroup.name} - {classGroup.subject.name} -{" "}
												{classGroup.professor.name} -{" "}
												{classGroup.classroom
													? classGroup.classroom.name
													: "Sem laboratório definido"}
											</SelectItem>
										)}
									</Select>
									{errorMessages.length > 0 &&
										errorMessages.map((error, index) => (
											<p
												key={index}
												className="px-4 py-2 rounded-lg w-full border border-red-600 text-red-600 font-medium"
											>
												{error}
											</p>
										))}
								</>
							)}
						</ModalBody>
						<ModalFooter>
							<Button color="danger" variant="light" onPress={onClose}>
								Cancelar
							</Button>
							<Button
								color="primary"
								onPress={() => addSchedule(onClose)}
								isDisabled={
									!props.selectedClassroom ||
									!props.selectedDay ||
									!props.startTime ||
									!endTime ||
									!selectedClassGroup ||
									errorMessages.length > 0
								}
							>
								Salvar
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	)
}
