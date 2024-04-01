import { getSubjectById } from "@/actions/subjects/get"
import Form from "./form"

type EditProps = {
	params: {
		id: string
	}
}

export default async function EditSubject(props: EditProps) {
	const subject = await getSubjectById(props.params.id)

	if (!subject) {
		return <h1>Disciplina não encontrada</h1>
	}

	return (
		<div>
			<h1>Editar Disciplina</h1>
			<Form subject={subject} />
		</div>
	)
}
