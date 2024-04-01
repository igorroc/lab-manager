import { getAllProfessors } from "@/actions/professors/get"
import Form from "./form"
import { getAllSubjects } from "@/actions/subjects/get"
import { getAllClassrooms } from "@/actions/classrooms/get"

export default async function CreateClassGroup() {
	const professors = await getAllProfessors()
	const subjects = await getAllSubjects()
	const classrooms = await getAllClassrooms()

	return (
		<div>
			<h1>Criar Turma</h1>
			<Form professors={professors} subjects={subjects} classrooms={classrooms} />
		</div>
	)
}
