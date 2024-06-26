import { getSetting } from "@/actions/settings/get"
import { getAllSchedules } from "@/actions/schedules/get"
import { getAllClassrooms } from "@/actions/classrooms/get"
import { getAllProfessors } from "@/actions/professors/get"
import { getAllClassGroups } from "@/actions/class-groups/get"

import CalendarClient from "./CalendarClient"
import AdminCalendarClient from "./AdminCalendarClient"

type CalendarProps = {
	smaller?: boolean
	isAdmin?: boolean
}

export default async function Calendar(props: CalendarProps) {
	const schedules = await getAllSchedules()
	const classGroups = await getAllClassGroups()
	const classrooms = await getAllClassrooms()
	const professors = await getAllProfessors()

	const classDuration = await getSetting("classDuration", "50")
	const periods = [
		{
			name: "Manhã",
			start: await getSetting("morningStart", "07:30"),
			end: await getSetting("morningEnd", "12:30"),
		},
		{
			name: "Tarde",
			start: await getSetting("afternoonStart", "13:30"),
			end: await getSetting("afternoonEnd", "18:30"),
		},
	]

	return (
		<div className="my-10 w-full">
			{props.isAdmin ? (
				<AdminCalendarClient
					schedules={schedules}
					periods={periods}
					classDuration={classDuration}
					classrooms={classrooms}
					professors={professors}
					classGroups={classGroups}
					smaller={props.smaller}
				/>
			) : (
				<CalendarClient
					schedules={schedules}
					periods={periods}
					classDuration={classDuration}
					classrooms={classrooms}
					professors={professors}
					classGroups={classGroups}
					smaller={props.smaller}
				/>
			)}
		</div>
	)
}
