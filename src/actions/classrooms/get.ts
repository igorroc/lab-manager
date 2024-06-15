"use server"

import db from "@/modules/db"

export async function getAllClassrooms() {
	const classrooms = await db.classroom.findMany({
		orderBy: {
			createdAt: "desc",
		},
	})

	return classrooms
}

export async function getAllAvailableClassrooms() {
	const classrooms = await db.classroom.findMany({
		where: {
			active: true,
		},
		orderBy: {
			createdAt: "desc",
		},
	})

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
