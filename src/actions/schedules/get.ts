"use server"

import db from "@/modules/db"

export async function getAllSchedules() {
	const schedules = await db.schedule.findMany({
		include: {
			classGroup: {
				include: {
					classroom: true,
					professor: true,
					subject: true,
				},
			},
		},
	})

	return schedules
}
