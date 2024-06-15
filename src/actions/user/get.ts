"use server"
import db from "@/modules/db"

export async function getUsers() {
	const users = await db.user.findMany({
		orderBy: {
			createdAt: "desc",
		},
	})
	return users
}
