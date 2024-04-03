"use client"

import { useEffect, useMemo, useState } from "react"
import { Input, ScrollShadow, Select, SelectItem, useDisclosure } from "@nextui-org/react"

import { ScheduleWithRelations } from "@/actions/schedules/get"

import { TWeekDays } from "@/utils/WeekDay"
import { DefaultSemesters } from "@/utils/Semester"
import {
	createTimeSlots,
	checkTimeGreaterThan,
	checkTimeGreaterEqualThan,
	TPeriod,
	addMinutes,
} from "@/utils/Date"

import ModalSchedule from "./ModalSchedule"

type CalendarProps = {
	schedules: ScheduleWithRelations[]
	periods: TPeriod[]
	classDuration: string
}

export default function CalendarClient(props: CalendarProps) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
	const [selectedSchedule, setSelectedSchedule] = useState<ScheduleWithRelations | null>(null)
	const [selectedSemester, setSelectedSemester] = useState<number[]>([])
	const [selectedProfessors, setSelectedProfessors] = useState<string[]>([])
	const [selectedClassrooms, setSelectedClassrooms] = useState<string[]>([])
	const [subjectSearch, setSubjectSearch] = useState("")

	const mappedProfessors = Array.from(
		new Set(props.schedules.map((schedule) => schedule.classGroup.professor.id))
	).map(
		(id) =>
			props.schedules.find((schedule) => schedule.classGroup.professor.id === id)?.classGroup
				.professor
	)

	const mappedClassrooms = Array.from(
		new Set(props.schedules.map((schedule) => schedule.classGroup.classroom.id))
	).map(
		(id) =>
			props.schedules.find((schedule) => schedule.classGroup.classroom.id === id)?.classGroup
				.classroom
	)

	const mappedTimeSlots = props.periods.map((period) => {
		const timeSlots = createTimeSlots(period.start, period.end, Number(props.classDuration))

		return timeSlots
	})
	const [collapsedTimeSlots, setCollapsedTimeSlots] = useState<boolean[][]>(
		mappedTimeSlots.map((period) => Array(period.length).fill(false))
	)

	const filteredSchedules = useMemo(
		() =>
			props.schedules.filter((schedule) => {
				const isSemester =
					selectedSemester.length === 0 ||
					selectedSemester.includes(schedule.classGroup.subject.semester)

				const isProfessor =
					selectedProfessors.length === 0 ||
					selectedProfessors.includes(schedule.classGroup.professor.id)

				const isClassroom =
					selectedClassrooms.length === 0 ||
					selectedClassrooms.includes(schedule.classGroup.classroom.id)

				const isSubjectSearch =
					subjectSearch === "" ||
					schedule.classGroup.subject.name
						.toLowerCase()
						.includes(subjectSearch.toLowerCase()) ||
					schedule.classGroup.subject.code
						.toLowerCase()
						.includes(subjectSearch.toLowerCase())

				return isSemester && isProfessor && isClassroom && isSubjectSearch
			}),
		[props.schedules, selectedClassrooms, selectedProfessors, selectedSemester, subjectSearch]
	)

	function handleOpen(schedule: ScheduleWithRelations) {
		setSelectedSchedule(schedule)
		onOpen()
	}

	useEffect(() => {
		const newCollapsedTimeSlots = mappedTimeSlots.map((period) => {
			return period.map((time) => {
				return !filteredSchedules.some((schedule) => {
					return schedule.startTime <= time && schedule.endTime > time
				})
			})
		})

		setCollapsedTimeSlots(newCollapsedTimeSlots)
		// eslint-disable-next-line
	}, [filteredSchedules])

	return (
		<>
			<div className="flex justify-between items-center mb-8">
				<h1 className="font-bold text-xl">Calendário</h1>
				<div className="flex justify-end gap-2">
					<Input
						placeholder="Buscar pelo nome da disciplina ou pelo código"
						onChange={(e) => setSubjectSearch(e.target.value)}
						value={subjectSearch}
						classNames={{
							inputWrapper: "h-full",
						}}
						className="w-52"
					/>
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
						{(classroom) =>
							!classroom ? (
								<> </>
							) : (
								<SelectItem key={classroom.id} value={classroom.id}>
									{classroom.name}
								</SelectItem>
							)
						}
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
						{(professor) =>
							!professor ? (
								<></>
							) : (
								<SelectItem key={professor.id} value={professor.id}>
									{professor.name}
								</SelectItem>
							)
						}
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
				{mappedTimeSlots.map((period, index_period) => (
					<div key={index_period}>
						<div className="h-8 first-of-type:h-0">{/* espaço vazio */}</div>
						{period.map((time, index) => {
							return (
								<div className="w-full grid grid-cols-7" key={time}>
									<div className="flex flex-col items-end justify-between p-2">
										<h2 className="font-bold text-lg">{time}</h2>
										{!collapsedTimeSlots[index_period][index] && (
											<h2 className="font-bold text-lg">
												{addMinutes(time, Number(props.classDuration))}
											</h2>
										)}
									</div>
									{TWeekDays.map((day) => (
										<div key={day.id} className="border border-gray-100">
											<ScrollShadow
												className={`flex flex-col items-center transition-all py-4 ${
													collapsedTimeSlots[index_period][index]
														? "h-2"
														: "h-32"
												}`}
												hideScrollBar
											>
												{filteredSchedules
													.filter(
														(schedule) => schedule.dayOfWeek === day.id
													)
													.filter(
														(schedule) =>
															checkTimeGreaterEqualThan(
																schedule.startTime,
																time
															) &&
															checkTimeGreaterThan(
																time,
																schedule.endTime
															)
													)
													.map((schedule) => (
														<button
															key={schedule.id}
															className="p-2 rounded-full shadow-md my-2 w-40 text-center"
															style={{
																backgroundColor:
																	schedule.classGroup.color,
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
							)
						})}
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
