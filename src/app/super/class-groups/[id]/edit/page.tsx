import { getAllSubjects } from "@/actions/subjects/get"
import { getAllClassrooms } from "@/actions/classrooms/get"
import { getAllProfessors } from "@/actions/professors/get"
import { getClassGroupById } from "@/actions/class-groups/get"

import Form from "./form"

type EditProps = {
	params: {
		id: string
	}
}
export const revalidate = 0

export default async function EditClassGroup(props: EditProps) {
	const professors = await getAllProfessors()
	const subjects = await getAllSubjects()
	const classrooms = await getAllClassrooms()
	const classGroup = await getClassGroupById(props.params.id)

	if (!classGroup) {
		return <div>Turma não encontrada</div>
	}

	return (
		<div>
			<h1>Editar Turma</h1>
			<Form
				professors={professors}
				subjects={subjects}
				classrooms={classrooms}
				classGroup={classGroup}
			/>
		</div>
	)
}
