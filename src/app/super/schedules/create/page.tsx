import { getAllClassGroups } from "@/actions/class-groups/get"

import Form from "./form"

export const revalidate = 10

export default async function CreateSchedule() {
	const classGroups = await getAllClassGroups()

	return (
		<div>
			<h1>Criar Horário</h1>
			<Form classGroups={classGroups} />
		</div>
	)
}
