import { WeekDay } from "@prisma/client"

export const TWeekDays = [
	{
		id: WeekDay.MONDAY,
		name: "Segunda",
	},
	{
		id: WeekDay.TUESDAY,
		name: "Terça",
	},
	{
		id: WeekDay.WEDNESDAY,
		name: "Quarta",
	},
	{
		id: WeekDay.THURSDAY,
		name: "Quinta",
	},
	{
		id: WeekDay.FRIDAY,
		name: "Sexta",
	},
] as const

export function mapWeekDayToName(weekDay: WeekDay) {
	const weekDayFound = TWeekDays.find((day) => day.id === weekDay)

	if (!weekDayFound) {
		return "Dia inválido"
	}

	return weekDayFound.name
}
