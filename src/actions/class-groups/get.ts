"use server"

import db from "@/modules/db"

export async function getAllClassGroups() {
	const classGroups = await db.classGroup.findMany({
		include: {
			classroom: true,
			professor: true,
			subject: true,
		},
	})

	return classGroups
}
