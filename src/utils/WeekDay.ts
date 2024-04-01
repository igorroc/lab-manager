import { WeekDay } from "@prisma/client"

export const TWeekDays = [
	{
		id: WeekDay.MONDAY,
		name: "Segunda-feira",
	},
	{
		id: WeekDay.TUESDAY,
		name: "Terça-feira",
	},
	{
		id: WeekDay.WEDNESDAY,
		name: "Quarta-feira",
	},
	{
		id: WeekDay.THURSDAY,
		name: "Quinta-feira",
	},
	{
		id: WeekDay.FRIDAY,
		name: "Sexta-feira",
	},
	{
		id: WeekDay.SATURDAY,
		name: "Sábado",
	},
] as const

export function mapWeekDayToName(weekDay: WeekDay) {
	const weekDayFound = TWeekDays.find((day) => day.id === weekDay)

	if (!weekDayFound) {
		return "Dia inválido"
	}

	return weekDayFound.name
}
