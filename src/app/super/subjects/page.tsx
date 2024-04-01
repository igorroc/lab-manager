import { getAllSubjects } from "@/actions/subjects/get"

export default async function ViewSubjects() {
	const subjects = await getAllSubjects()

	return (
		<div>
			<h1>Disciplinas</h1>
			<table>
				<thead>
					<tr>
						<th>Nome</th>
						<th>Código</th>
						<th>Semestre</th>
						<th>Carga horária</th>
						<th>Prioridade</th>
					</tr>
				</thead>
				<tbody>
					{subjects.map((classroom) => (
						<tr key={classroom.id}>
							<td>{classroom.name}</td>
							<td>{classroom.code}</td>
							<td>{classroom.semester}</td>
							<td>{classroom.hours}</td>
							<td>{classroom.priority}</td>
						</tr>
					))}
					{subjects.length === 0 && (
						<tr>
							<td colSpan={5}>Nenhuma disciplina cadastrada</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
}
