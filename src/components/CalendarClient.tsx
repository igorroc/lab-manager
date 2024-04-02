"use client"

import { useState } from "react"
import { Select, SelectItem, useDisclosure } from "@nextui-org/react"

import { ScheduleWithRelations } from "@/actions/schedules/get"

import { TWeekDays } from "@/utils/WeekDay"
import { DefaultSemesters } from "@/utils/Semester"

import ModalSchedule from "./ModalSchedule"

type CalendarProps = {
	schedules: ScheduleWithRelations[]
}

export default function CalendarClient(props: CalendarProps) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
	const [selectedSchedule, setSelectedSchedule] = useState<ScheduleWithRelations | null>(null)
	const [selectedSemester, setSelectedSemester] = useState<number>(DefaultSemesters[0].id)

	const filteredSchedules = props.schedules.filter((schedule) => {
		if (selectedSemester == DefaultSemesters[0].id) {
			return true
		}

		return schedule.classGroup.subject.semester == selectedSemester
	})

	function handleOpen(schedule: ScheduleWithRelations) {
		setSelectedSchedule(schedule)
		onOpen()
	}

	return (
		<>
			<div className="flex justify-between items-center mb-8">
				<h1 className="font-bold text-xl">Calendário</h1>
				<div className="flex justify-end">
					<Select
						items={DefaultSemesters}
						label="Semestre"
						placeholder="Selecione um semestre"
						selectionMode="single"
						onChange={(value) => {
							setSelectedSemester(value.target.value as unknown as number)
						}}
						className="w-64"
					>
						{(semester) => (
							<SelectItem key={semester.id} value={semester.id}>
								{semester.name}
							</SelectItem>
						)}
					</Select>
				</div>
			</div>
			<div className="w-full flex justify-between">
				{TWeekDays.map((day) => (
					<div key={day.id}>
						<h2>{day.name}</h2>
						{filteredSchedules
							.filter((schedule) => schedule.dayOfWeek === day.id)
							.map((schedule) => (
								<button
									key={schedule.id}
									className="p-2 rounded-full shadow-md my-2 w-40 text-center"
									style={{
										backgroundColor: schedule.classGroup.color,
									}}
									onClick={() => handleOpen(schedule)}
								>
									<p>
										{schedule.classGroup.subject.code} -{" "}
										{schedule.classGroup.name}
									</p>
								</button>
							))}
					</div>
				))}
			</div>
			{filteredSchedules.length === 0 && (
				<p className="text-center">Nenhum horário encontrado com o filtro selecionado</p>
			)}
			<ModalSchedule
				selectedSchedule={selectedSchedule}
				isOpen={isOpen}
				onOpenChange={onOpenChange}
			/>
		</>
	)
}
