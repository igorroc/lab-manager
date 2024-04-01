import { getAllClassGroups } from "@/actions/class-groups/get"

export default async function ViewSubjects() {
	const classGroups = await getAllClassGroups()

	return (
		<div>
			<h1>Turmas</h1>
			<table>
				<thead>
					<tr>
						<th>Nome</th>
						<th>Alunos</th>
						<th>Professor</th>
						<th>Disciplina</th>
						<th>Laboratório</th>
					</tr>
				</thead>
				<tbody>
					{classGroups.map((classroom) => (
						<tr key={classroom.id}>
							<td>{classroom.name}</td>
							<td>{classroom.alumniCount}</td>
							<td>{classroom.professor.name}</td>
							<td>{classroom.subject.name}</td>
							<td>{classroom.classroom.name}</td>
						</tr>
					))}
					{classGroups.length === 0 && (
						<tr>
							<td colSpan={5}>Nenhuma turma cadastrada</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
}
