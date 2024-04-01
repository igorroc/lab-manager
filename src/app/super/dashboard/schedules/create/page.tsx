import { getAllClassGroups } from "@/actions/class-groups/get"

import Form from "./form"

export default async function CreateSchedule() {
	const classGroups = await getAllClassGroups()

	return (
		<div>
			<h1>Criar Horário</h1>
			<Form classGroups={classGroups} />
		</div>
	)
}