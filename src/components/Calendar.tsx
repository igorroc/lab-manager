import { getAllSchedules } from "@/actions/schedules/get"

import CalendarClient from "./CalendarClient"

export default async function Calendar() {
	const schedules = await getAllSchedules()

	return (
		<div className="my-10 w-full">
			<CalendarClient schedules={schedules} />
		</div>
	)
}
