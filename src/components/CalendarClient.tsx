"use client"

import { useEffect, useState } from "react"
import { ScrollShadow, Select, SelectItem, useDisclosure } from "@nextui-org/react"

import { ScheduleWithRelations } from "@/actions/schedules/get"

import { TWeekDays } from "@/utils/WeekDay"
import { createTimeSlots, checkTimeGreaterThan, checkTimeGreaterEqualThan } from "@/utils/Date"
import { DefaultSemesters } from "@/utils/Semester"

import ModalSchedule from "./ModalSchedule"

type CalendarProps = {
	schedules: ScheduleWithRelations[]
	startOfDay: string
	endOfDay: string
	classDuration: string
}

export default function CalendarClient(props: CalendarProps) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
	const [selectedSchedule, setSelectedSchedule] = useState<ScheduleWithRelations | null>(null)
	const [selectedSemester, setSelectedSemester] = useState<number[]>([])
	const [selectedProfessors, setSelectedProfessors] = useState<string[]>([])
	const [selectedClassrooms, setSelectedClassrooms] = useState<string[]>([])

	const mappedProfessors = props.schedules.map((schedule) => schedule.classGroup.professor)
	const mappedClassrooms = props.schedules.map((schedule) => schedule.classGroup.classroom)
	const mappedTimeSlots = createTimeSlots(
		props.startOfDay,
		props.endOfDay,
		Number(props.classDuration)
	)
	const [collapsedTimeSlots, setCollapsedTimeSlots] = useState<boolean[]>(
		Array(mappedTimeSlots.length).fill(false)
	)

	const filteredSchedules = props.schedules.filter((schedule) => {
		const isSemester =
			selectedSemester.length === 0 ||
			selectedSemester.includes(schedule.classGroup.subject.semester)

		const isProfessor =
			selectedProfessors.length === 0 ||
			selectedProfessors.includes(schedule.classGroup.professor.id)

		const isClassroom =
			selectedClassrooms.length === 0 ||
			selectedClassrooms.includes(schedule.classGroup.classroom.id)

		return isSemester && isProfessor && isClassroom
	})

	function handleOpen(schedule: ScheduleWithRelations) {
		setSelectedSchedule(schedule)
		onOpen()
	}

	useEffect(() => {
		const newCollapsedTimeSlots = mappedTimeSlots.map((time) => {
			return !filteredSchedules.some((schedule) => {
				return schedule.startTime <= time && schedule.endTime > time
			})
		})
		setCollapsedTimeSlots(newCollapsedTimeSlots)
	}, [mappedTimeSlots, filteredSchedules])

	return (
		<>
			<div className="flex justify-between items-center mb-8">
				<h1 className="font-bold text-xl">Calendário</h1>
				<div className="flex justify-end gap-2">
					<Select
						items={mappedClassrooms}
						label="Laboratório"
						selectionMode="multiple"
						onChange={(value) => {
							if (value.target.value) {
								setSelectedClassrooms(value.target.value.split(","))
							} else {
								setSelectedClassrooms([])
							}
						}}
						className="w-52"
					>
						{(classroom) => (
							<SelectItem key={classroom.id} value={classroom.id}>
								{classroom.name}
							</SelectItem>
						)}
					</Select>
					<Select
						items={mappedProfessors}
						label="Professor"
						selectionMode="multiple"
						onChange={(value) => {
							if (value.target.value) {
								setSelectedProfessors(value.target.value.split(","))
							} else {
								setSelectedProfessors([])
							}
						}}
						className="w-52"
					>
						{(professor) => (
							<SelectItem key={professor.id} value={professor.id}>
								{professor.name}
							</SelectItem>
						)}
					</Select>
					<Select
						items={DefaultSemesters}
						label="Semestre"
						selectionMode="multiple"
						onChange={(value) => {
							if (value.target.value) {
								setSelectedSemester(value.target.value.split(",").map(Number))
							} else {
								setSelectedSemester([])
							}
						}}
						className="w-52"
					>
						{(semester) => (
							<SelectItem key={semester.id} value={semester.id}>
								{semester.name}
							</SelectItem>
						)}
					</Select>
				</div>
			</div>
			<div className="flex flex-col">
				<div className="w-full grid grid-cols-7">
					<div></div>
					{TWeekDays.map((day) => (
						<div key={day.id}>
							<h2 className="font-bold text-lg">{day.name}</h2>
						</div>
					))}
				</div>
				{mappedTimeSlots.map((time, index) => (
					<div className="w-full grid grid-cols-7" key={time}>
						<div className="flex items-center justify-end p-2">
							<h2 className="font-bold text-lg">{time}</h2>
						</div>
						{TWeekDays.map((day) => (
							<div key={day.id} className="border border-gray-100">
								<ScrollShadow
									className={`flex flex-col items-center transition-all py-4 ${
										collapsedTimeSlots[index] ? "h-2" : "h-32"
									}`}
									hideScrollBar
								>
									{filteredSchedules
										.filter((schedule) => schedule.dayOfWeek === day.id)
										.filter(
											(schedule) =>
												checkTimeGreaterEqualThan(
													schedule.startTime,
													time
												) && checkTimeGreaterThan(time, schedule.endTime)
										)
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
								</ScrollShadow>
							</div>
						))}
					</div>
				))}
			</div>

			<ModalSchedule
				selectedSchedule={selectedSchedule}
				isOpen={isOpen}
				onOpenChange={onOpenChange}
			/>
		</>
	)
}
