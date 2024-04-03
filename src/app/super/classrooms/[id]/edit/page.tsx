import { getClassroomById } from "@/actions/classrooms/get"

import Form from "./form"

type EditProps = {
	params: {
		id: string
	}
}

export const revalidate = 1

export default async function EditClassroom(props: EditProps) {
	const classroom = await getClassroomById(props.params.id)

	if (!classroom) {
		return <div>Laboratório não encontrado</div>
	}

	return (
		<div>
			<h1>Editar laboratório</h1>
			<Form classroom={classroom} />
		</div>
	)
}
