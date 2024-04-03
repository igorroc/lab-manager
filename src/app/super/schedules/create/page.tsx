import { getAllSchedules } from "@/actions/schedules/get"
import { getAllClassGroups } from "@/actions/class-groups/get"

import Form from "./form"

export const revalidate = 1

export default async function CreateSchedule() {
	const classGroups = await getAllClassGroups()
	const schedules = await getAllSchedules()

	return (
		<div>
			<h1>Criar Horário</h1>
			<Form classGroups={classGroups} schedules={schedules} />
		</div>
	)
}
