"use server"

import db from "@/modules/db"

export async function deleteScheduleById(id: string) {
	return await db.schedule.delete({ where: { id } })
}
