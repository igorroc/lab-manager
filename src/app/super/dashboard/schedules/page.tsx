import { getAllSchedules } from "@/actions/schedules/get"
import { mapWeekDayToName } from "@/utils/WeekDay"

export default async function ViewSubjects() {
	const schedules = await getAllSchedules()

	return (
		<div>
			<h1>Horários</h1>
			<table>
				<thead>
					<tr>
						<th>Turma</th>
						<th>Dia da semana</th>
						<th>Início</th>
						<th>Fim</th>
						<th>Duração/Aula</th>
					</tr>
				</thead>
				<tbody>
					{schedules.map((schedule) => (
						<tr key={schedule.id}>
							<th>{schedule.classGroup.name}</th>
							<td>{mapWeekDayToName(schedule.dayOfWeek)}</td>
							<td>{schedule.startTime}</td>
							<td>{schedule.endTime}</td>
							<td>{schedule.stepDuration}min</td>
						</tr>
					))}
					{schedules.length === 0 && (
						<tr>
							<td colSpan={5}>Nenhum horário cadastrado</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
}
