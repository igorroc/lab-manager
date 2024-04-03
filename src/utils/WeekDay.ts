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

export function getWeekDates(startDate: Date): Date[] {
	const dates = []

	const startDay = startDate.getDay()
	const startOfWeek = new Date(startDate)
	startOfWeek.setDate(startOfWeek.getDate() - startDay + (startDay === 0 ? -6 : 1))

	for (let i = 0; i < 5; i++) {
		const day = new Date(startOfWeek)
		day.setDate(day.getDate() + i)
		dates.push(day)
	}

	return dates
}
