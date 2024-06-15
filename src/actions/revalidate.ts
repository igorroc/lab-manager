"use server"

import { revalidatePath } from "next/cache"

export async function revalidate(path: string) {
	await revalidatePath(path)
}

const paths = [
	"/",
	"/super/dashboard",
	"/super/class-groups",
	"/super/classrooms",
	"/super/professors",
	"/super/schedules",
	"/super/settings",
	"/super/subjects",
	"/super/class-groups/create",
	"/super/schedules/create",
]

export async function revalidateAll() {
	for (const path of paths) {
		await revalidate(path)
	}
}
