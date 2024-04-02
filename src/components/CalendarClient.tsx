"use client"

import { useState } from "react"
import { useDisclosure } from "@nextui-org/react"

import { ScheduleWithRelations } from "@/actions/schedules/get"

import { TWeekDays } from "@/utils/WeekDay"

import ModalSchedule from "./ModalSchedule"

type CalendarProps = {
	schedules: ScheduleWithRelations[]
}

export default function CalendarClient(props: CalendarProps) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
	const [selectedSchedule, setSelectedSchedule] = useState<ScheduleWithRelations | null>(null)

	function handleOpen(schedule: ScheduleWithRelations) {
		setSelectedSchedule(schedule)
		onOpen()
	}

	return (
		<>
			<div className="w-full flex justify-between">
				{TWeekDays.map((day) => (
					<div key={day.id}>
						<h2>{day.name}</h2>
						{props.schedules
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
			<ModalSchedule
				selectedSchedule={selectedSchedule}
				isOpen={isOpen}
				onOpenChange={onOpenChange}
			/>
		</>
	)
}
