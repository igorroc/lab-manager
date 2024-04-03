"use client"

import { useEffect, useMemo, useState } from "react"
import { Input, ScrollShadow, Select, SelectItem, useDisclosure } from "@nextui-org/react"

import { ScheduleWithRelations } from "@/actions/schedules/get"

import { useCalendarFilter } from "@/store/CalendarFilter"

import { TWeekDays } from "@/utils/WeekDay"
import { searchInText } from "@/utils/String"
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
	const [search, setSearch] = useCalendarFilter((state) => [state.search, state.setSearch])

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
					search.selectedSemester.length === 0 ||
					search.selectedSemester.includes(schedule.classGroup.subject.semester)

				const isProfessor =
					search.selectedProfessors.length === 0 ||
					search.selectedProfessors.includes(schedule.classGroup.professor.id)

				const isClassroom =
					search.selectedClassrooms.length === 0 ||
					search.selectedClassrooms.includes(schedule.classGroup.classroom.id)

				const isSubjectSearch =
					search.subjectSearch === "" ||
					searchInText(schedule.classGroup.subject.name, search.subjectSearch) ||
					searchInText(schedule.classGroup.subject.code, search.subjectSearch)

				return isSemester && isProfessor && isClassroom && isSubjectSearch
			}),
		[props.schedules, search]
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
			<div className="flex flex-col gap-2 justify-center items-center mx-auto mb-8 max-w-[875px]">
				<div className="flex flex-wrap gap-2 w-full">
					<Select
						items={mappedClassrooms}
						label="Laboratório"
						selectionMode="multiple"
						onChange={(value) => {
							if (value.target.value) {
								setSearch("selectedClassrooms", value.target.value.split(","))
							} else {
								setSearch("selectedClassrooms", [])
							}
						}}
						selectedKeys={search.selectedClassrooms.map(String)}
						className="flex-1 min-w-52"
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
								setSearch("selectedProfessors", value.target.value.split(","))
							} else {
								setSearch("selectedProfessors", [])
							}
						}}
						selectedKeys={search.selectedProfessors.map(String)}
						className="flex-1 min-w-52"
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
								setSearch(
									"selectedSemester",
									value.target.value.split(",").map(Number)
								)
							} else {
								setSearch("selectedSemester", [])
							}
						}}
						selectedKeys={search.selectedSemester.map(String)}
						className="flex-1 min-w-52"
					>
						{(semester) => (
							<SelectItem key={semester.id} value={semester.id}>
								{semester.name}
							</SelectItem>
						)}
					</Select>
				</div>
				<Input
					placeholder="Buscar pela disciplina"
					onChange={(e) => setSearch("subjectSearch", e.target.value)}
					value={search.subjectSearch}
					classNames={{
						inputWrapper: "h-full py-4",
					}}
					className="w-full"
				/>
			</div>
			<ScrollShadow className="w-full max-w-[1300px] mx-auto" orientation="horizontal">
				<div className="flex flex-col min-w-[1250px]">
					<div className="w-full grid grid-cols-5">
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
									<div className="w-full grid grid-cols-5 relative" key={time}>
										<div
											className={`flex flex-col p-2 absolute h-full ${
												!collapsedTimeSlots[index_period][index]
													? "justify-between"
													: "justify-center"
											}`}
										>
											<h2 className="z-10">{time}</h2>
											{!collapsedTimeSlots[index_period][index] && (
												<h2 className="z-10">
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
															(schedule) =>
																schedule.dayOfWeek === day.id
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
																	{
																		schedule.classGroup.subject
																			.code
																	}{" "}
																	- {schedule.classGroup.name}
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
			</ScrollShadow>

			<ModalSchedule
				selectedSchedule={selectedSchedule}
				isOpen={isOpen}
				onOpenChange={onOpenChange}
			/>
		</>
	)
}
