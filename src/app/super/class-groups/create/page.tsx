import { getAllSubjects } from "@/actions/subjects/get"
import { getAllProfessors } from "@/actions/professors/get"
import { getAllAvailableClassrooms } from "@/actions/classrooms/get"

import Form from "./form"

export const revalidate = 0

export default async function CreateClassGroup() {
	const professors = await getAllProfessors()
	const subjects = await getAllSubjects()
	const classrooms = await getAllAvailableClassrooms()

	return (
		<div>
			<h1>Criar Turma</h1>
			<Form
				professors={professors.sort((a, b) => a.name.localeCompare(b.name))}
				subjects={subjects.sort((a, b) => a.name.localeCompare(b.name))}
				classrooms={classrooms.sort((a, b) => a.name.localeCompare(b.name))}
			/>
		</div>
	)
}
