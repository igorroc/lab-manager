import { getAllSchedules } from "@/actions/schedules/get"

import CalendarClient from "./CalendarClient"

export default async function Calendar() {
	const schedules = await getAllSchedules()

	return (
		<div className="my-10 w-full">
			<h1 className="font-bold text-xl">Calendário</h1>
			<CalendarClient schedules={schedules} />
		</div>
	)
}
