import { getAllSchedules } from "@/actions/schedules/get"

import { TWeekDays } from "@/utils/WeekDay"

export default async function Calendar() {
	const schedules = await getAllSchedules()

	return (
		<div className="my-10 w-full">
			<h1 className="font-bold text-xl">Calendário</h1>
			<div className="w-full flex justify-between">
				{TWeekDays.map((day) => (
					<div key={day.id}>
						<h2>{day.name}</h2>
						{schedules
							.filter((schedule) => schedule.dayOfWeek === day.id)
							.map((schedule) => (
								<div
									key={schedule.id}
									className="p-2 rounded-full shadow-md my-2 w-40 text-center"
									style={{
										backgroundColor: schedule.classGroup.color,
									}}
								>
									<p>
										{schedule.classGroup.subject.code} -{" "}
										{schedule.classGroup.name}
									</p>
								</div>
							))}
					</div>
				))}
			</div>
		</div>
	)
}
