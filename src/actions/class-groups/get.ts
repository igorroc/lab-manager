"use server"

import db from "@/modules/db"
import { Prisma } from "@prisma/client"

export type ClassGroupsWithRelations = Prisma.ClassGroupGetPayload<{
	include: {
		classroom: true
		professor: true
		subject: true
	}
}>

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

export async function getClassGroupById(id: string) {
	const classGroup = await db.classGroup.findUnique({
		where: {
			id,
		},
		include: {
			classroom: true,
			professor: true,
			subject: true,
		},
	})

	return classGroup
}
