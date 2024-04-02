import { getProfessorById } from "@/actions/professors/get"

import Form from "./form"

type EditProps = {
	params: {
		id: string
	}
}

export default async function EditProfessor(props: EditProps) {
	const professor = await getProfessorById(props.params.id)

	if (!professor) {
		return <div>Professor não encontrado</div>
	}

	return (
		<div>
			<h1>Editar professor</h1>
			<Form professor={professor} />
		</div>
	)
}
