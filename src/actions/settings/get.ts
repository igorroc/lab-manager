"use server"

import db from "@/modules/db"

import { setSetting } from "./create"

export async function getAllSettings() {
	const settings = await db.setting.findMany()

	return settings
}

export async function getSetting(key: string): Promise<string | null>
export async function getSetting(key: string, defaultValue: string): Promise<string>
export async function getSetting(key: string, defaultValue: string = ""): Promise<string | null> {
	const setting = await db.setting.findUnique({
		where: {
			key,
		},
	})

	if (setting) {
		return setting.value
	}

	if (defaultValue === "") {
		return null
	}

	return (await setSetting(key, defaultValue)).value
}
