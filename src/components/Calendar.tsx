import { getSetting } from "@/actions/settings/get"
import { getAllSchedules } from "@/actions/schedules/get"

import CalendarClient from "./CalendarClient"

export default async function Calendar() {
	const schedules = await getAllSchedules()
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
			<CalendarClient schedules={schedules} periods={periods} classDuration={classDuration} />
		</div>
	)
}
