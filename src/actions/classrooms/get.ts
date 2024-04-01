"use server"

import db from "@/modules/db"

export async function getAllClassrooms() {
	const classrooms = await db.classroom.findMany()

	return classrooms
}
