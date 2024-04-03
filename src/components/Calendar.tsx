import { getAllSchedules } from "@/actions/schedules/get"

import CalendarClient from "./CalendarClient"
import { getSetting } from "@/actions/settings/get"

export default async function Calendar() {
	const schedules = await getAllSchedules()
	const startOfDay = await getSetting("startOfDay", "07:30")
	const endOfDay = await getSetting("endOfDay", "18:30")
	const classDuration = await getSetting("classDuration", "50")

	return (
		<div className="my-10 w-full">
			<CalendarClient
				schedules={schedules}
				startOfDay={startOfDay}
				endOfDay={endOfDay}
				classDuration={classDuration}
			/>
		</div>
	)
}
