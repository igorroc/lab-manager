"use client"

import { Classroom, Professor } from "@prisma/client"
import { useEffect, useMemo, useState } from "react"
import { Input, ScrollShadow, Select, SelectItem, useDisclosure } from "@nextui-org/react"

import { ScheduleWithRelations } from "@/actions/schedules/get"
import { TClassGroupWithEverything } from "@/actions/class-groups/create"

import { useCalendarFilter } from "@/store/CalendarFilter"

import { TWeekDays, getWeekDates } from "@/utils/WeekDay"
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
import { getIdealTextColor } from "@/utils/Color"

type CalendarProps = {
	schedules: ScheduleWithRelations[]
	classGroups: TClassGroupWithEverything[]
	periods: TPeriod[]
	classrooms: Classroom[]
	professors: Professor[]
	classDuration: string
	smaller?: boolean
}

export default function CalendarClient(props: CalendarProps) {
	const {
		isOpen: isViewOpen,
		onOpen: onViewOpen,
		onOpenChange: onViewOpenChange,
	} = useDisclosure()
	const [selectedSchedule, setSelectedSchedule] = useState<ScheduleWithRelations | null>(null)
	const [search, setSearch] = useCalendarFilter((state) => [state.search, state.setSearch])
	const weekDates = getWeekDates(new Date())

	const mappedProfessors = props.professors

	const mappedClassrooms = props.classrooms

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
					search.selectedClassrooms.includes(
						schedule.classGroup.classroom
							? schedule.classGroup.classroom.id
							: schedule.id // Para não quebrar o filtro
					)

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
		onViewOpen()
	}

	function clearFilter() {
		setSearch("selectedClassrooms", [])
		setSearch("selectedProfessors", [])
		setSearch("selectedSemester", [])
		setSearch("subjectSearch", "")
	}

	function clearOneFilter(filter: string) {
		setSearch(filter, [])
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
			<div className="flex flex-col gap-2 justify-center items-center mx-auto max-w-[875px]">
				<div className="flex flex-wrap gap-2 w-full">
					<Select
						items={mappedClassrooms.sort((a, b) =>
							a && b ? a.name.localeCompare(b.name) : 0
						)}
						label="Laboratório"
						description={
							search.selectedClassrooms.length > 0 ? (
								<button
									className="flex underline"
									onClick={() => clearOneFilter("selectedClassrooms")}
								>
									Limpar filtro
								</button>
							) : null
						}
						selectionMode={"multiple"}
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
						items={mappedProfessors.sort((a, b) =>
							a && b ? a.name.localeCompare(b.name) : 0
						)}
						label="Professor"
						description={
							search.selectedProfessors.length > 0 ? (
								<button
									className="flex underline"
									onClick={() => clearOneFilter("selectedProfessors")}
								>
									Limpar filtro
								</button>
							) : null
						}
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
						description={
							search.selectedSemester.length > 0 ? (
								<button
									className="flex underline"
									onClick={() => clearOneFilter("selectedSemester")}
								>
									Limpar filtro
								</button>
							) : null
						}
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

				{(search.subjectSearch ||
					search.selectedClassrooms.length > 0 ||
					search.selectedProfessors.length > 0 ||
					search.selectedSemester.length > 0) && (
					<button
						className="opacity-50 underline font-light text-sm my-2 cursor-pointer"
						onClick={clearFilter}
					>
						Limpar todos os filtros
					</button>
				)}
			</div>

			<div className="p-5"></div>

			{filteredSchedules.length === 0 ? (
				<div className="p-4 rounded-lg bg-background">
					<p className="text-center text-sm opacity-50">
						Não há aulas cadastradas para esse filtro
					</p>
				</div>
			) : (
				<ScrollShadow
					className="w-full max-w-[1300px] mx-auto text-center"
					orientation="horizontal"
					hideScrollBar
				>
					<div className="flex flex-col min-w-[1250px]">
						<div className="w-full grid grid-cols-5">
							{TWeekDays.map((day, index) => (
								<div key={day.id}>
									<h2 className="font-bold text-lg">{day.name}</h2>
									<p>
										{new Intl.DateTimeFormat("pt-BR", {
											day: "2-digit",
											month: "2-digit",
										}).format(weekDates[index])}
									</p>
								</div>
							))}
						</div>
						{mappedTimeSlots.map((period, index_period) => (
							<div key={index_period}>
								{index_period > 0 && <div className="h-8 relative"></div>}
								{period.map((time, index) => {
									return (
										<div key={time}>
											<div
												className={`flex flex-col p-2 absolute ${
													!collapsedTimeSlots[index_period][index]
														? "justify-between h-40"
														: "justify-center h-2 py-4"
												} ${props.smaller ? "w-20" : "left-10 md:left-24"}`}
											>
												<h2 className="z-10">{time}</h2>
												{!collapsedTimeSlots[index_period][index] && (
													<h2 className="z-10">
														{addMinutes(
															time,
															Number(props.classDuration)
														)}
													</h2>
												)}
											</div>
											<div className="w-full grid grid-cols-5 relative overflow-auto">
												{TWeekDays.map((day) => (
													<div
														key={day.id}
														className={`relative border border-gray-100/10 ${
															collapsedTimeSlots[index_period][index]
																? ""
																: "rounded-xl"
														}`}
													>
														<ScrollShadow
															className={`flex flex-col items-center transition-all py-4 ${
																collapsedTimeSlots[index_period][
																	index
																]
																	? "h-2"
																	: "h-40"
															}`}
															hideScrollBar
														>
															{filteredSchedules
																.filter(
																	(schedule) =>
																		schedule.dayOfWeek ===
																		day.id
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
																				schedule.classGroup
																					.color,
																			color: getIdealTextColor(
																				schedule.classGroup
																					.color
																			),
																		}}
																		onClick={() =>
																			handleOpen(schedule)
																		}
																	>
																		<p>
																			{
																				schedule.classGroup
																					.subject.code
																			}{" "}
																			-{" "}
																			{
																				schedule.classGroup
																					.name
																			}
																		</p>
																	</button>
																))}
														</ScrollShadow>
													</div>
												))}
											</div>
										</div>
									)
								})}
							</div>
						))}
					</div>
				</ScrollShadow>
			)}

			{selectedSchedule && (
				<ModalSchedule
					selectedSchedule={selectedSchedule}
					isOpen={isViewOpen}
					onOpenChange={onViewOpenChange}
				/>
			)}
		</>
	)
}
