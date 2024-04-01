"use server"

import db from "@/modules/db"

export async function getAllSubjects() {
	const subjects = await db.subject.findMany()

	return subjects
}
