"use server"

import db from "@/modules/db"

export async function getAllClassrooms() {
	const classrooms = await db.classroom.findMany()

	return classrooms
}

export async function getClassroomById(id: string) {
	const classroom = await db.classroom.findUnique({
		where: {
			id,
		},
	})

	return classroom
}
