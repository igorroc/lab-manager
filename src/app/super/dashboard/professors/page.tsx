import { getAllProfessors } from "@/actions/professors/get"

export default async function ViewProfessors() {
	const professors = await getAllProfessors()

	return (
		<div>
			<h1>Professores</h1>
			<table>
				<thead>
					<tr>
						<th>Nome</th>
						<th>Email</th>
					</tr>
				</thead>
				<tbody>
					{professors.map((classroom) => (
						<tr key={classroom.id}>
							<td>{classroom.name}</td>
							<td>{classroom.email}</td>
						</tr>
					))}
					{professors.length === 0 && (
						<tr>
							<td colSpan={5}>Nenhum professor cadastrado</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
}
