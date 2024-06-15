"use server"

import db from "@/modules/db"
import { Prisma } from "@prisma/client"

export type ScheduleWithRelations = Prisma.ScheduleGetPayload<{
	include: {
		classGroup: {
			include: {
				classroom: true
				professor: true
				subject: true
			}
		}
	}
}>

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
		orderBy: {
			createdAt: "desc",
		},
	})

	return schedules
}

export async function getScheduleById(id: string) {
	const schedule = await db.schedule.findUnique({
		where: {
			id,
		},
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

	return schedule
}
