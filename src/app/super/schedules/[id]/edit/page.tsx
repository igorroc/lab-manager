import { getAllClassGroups } from "@/actions/class-groups/get"
import { getAllSchedules, getScheduleById } from "@/actions/schedules/get"

import Form from "./form"

type EditProps = {
	params: {
		id: string
	}
}

export const revalidate = 0

export default async function EditSchedule(props: EditProps) {
	const classGroups = await getAllClassGroups()
	const schedule = await getScheduleById(props.params.id)
	const schedules = await getAllSchedules()

	if (!schedule) {
		return <div>Horário não encontrado</div>
	}

	return (
		<div>
			<h1>Editar Horário</h1>
			<Form classGroups={classGroups} schedule={schedule} schedules={schedules} />
		</div>
	)
}
