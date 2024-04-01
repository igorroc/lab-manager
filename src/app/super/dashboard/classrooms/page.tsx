import { getAllClassrooms } from "@/actions/classrooms/get"
import React from "react"

export default async function ViewClassrooms() {
	const classrooms = await getAllClassrooms()
	return (
		<div>
			<h1>Salas de aula/Laboratório</h1>
			<table>
				<thead>
					<tr>
						<th>Nome</th>
						<th>Capacidade</th>
						<th>Computadores</th>
						<th>Projetores</th>
						<th>Prioridade</th>
					</tr>
				</thead>
				<tbody>
					{classrooms.map((classroom) => (
						<tr key={classroom.id}>
							<td>{classroom.name}</td>
							<td>{classroom.capacity}</td>
							<td>{classroom.computerCount}</td>
							<td>{classroom.projectorCount}</td>
							<td>{classroom.priority}</td>
						</tr>
					))}
					{classrooms.length === 0 && (
						<tr>
							<td colSpan={2}>Nenhuma sala de aula/laboratório cadastrada</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
}
