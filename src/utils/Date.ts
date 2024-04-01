export function validateStringTime(time: string): boolean {
	const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
	return timeRegex.test(time)
}

export function checkGreaterThan(start: string, end: string): boolean {
	const startMinutes = parseInt(start.split(":")[0]) * 60 + parseInt(start.split(":")[1])
	const endMinutes = parseInt(end.split(":")[0]) * 60 + parseInt(end.split(":")[1])

	return endMinutes > startMinutes
}
