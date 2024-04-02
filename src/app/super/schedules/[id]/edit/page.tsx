import { getScheduleById } from "@/actions/schedules/get"
import { getAllClassGroups } from "@/actions/class-groups/get"

import Form from "./form"

type EditProps = {
	params: {
		id: string
	}
}

export default async function EditSchedule(props: EditProps) {
	const classGroups = await getAllClassGroups()
	const schedule = await getScheduleById(props.params.id)

	if (!schedule) {
		return <div>Horário não encontrado</div>
	}

	return (
		<div>
			<h1>Editar Horário</h1>
			<Form classGroups={classGroups} schedule={schedule} />
		</div>
	)
}
