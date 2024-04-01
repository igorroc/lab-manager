"use server"

import db from "@/modules/db"

export async function getAllSubjects() {
	const subjects = await db.subject.findMany()

	return subjects
}

export async function getSubjectById(id: string) {
	const subject = await db.subject.findUnique({
		where: {
			id,
		},
	})

	return subject
}
