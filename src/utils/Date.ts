export type TPeriod = {
	name: string
	start: string
	end: string
}

export function validateStringTime(time: string) {
	const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
	return timeRegex.test(time)
}

export function checkTimeGreaterThan(start: string, end: string) {
	const startMinutes = parseInt(start.split(":")[0]) * 60 + parseInt(start.split(":")[1])
	const endMinutes = parseInt(end.split(":")[0]) * 60 + parseInt(end.split(":")[1])

	return endMinutes > startMinutes
}

export function checkTimeGreaterEqualThan(start: string, end: string) {
	const startMinutes = parseInt(start.split(":")[0]) * 60 + parseInt(start.split(":")[1])
	const endMinutes = parseInt(end.split(":")[0]) * 60 + parseInt(end.split(":")[1])

	return endMinutes >= startMinutes
}

export function createTimeSlots(startTime: string, endTime: string, stepDuration: number) {
	const slots: string[] = []
	let currentTime = startTime

	while (timeToMinutes(currentTime) + stepDuration <= timeToMinutes(endTime)) {
		slots.push(currentTime)
		currentTime = addMinutes(currentTime, stepDuration)
	}

	return slots
}

export function timeToMinutes(time: string) {
	const [hours, minutes] = time.split(":").map(Number)
	return hours * 60 + minutes
}

export function addMinutes(time: string, minsToAdd: number) {
	const [hours, minutes] = time.split(":").map(Number)
	const date = new Date()
	date.setHours(hours, minutes + minsToAdd, 0, 0)
	return date.toTimeString().substring(0, 5)
}
