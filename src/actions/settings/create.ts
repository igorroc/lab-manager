"use server"

import db from "@/modules/db"

export async function setSetting(key: string, value: string) {
	const setting = await db.setting.upsert({
		where: {
			key,
		},
		update: {
			value,
		},
		create: {
			key,
			value,
		},
	})

	return setting
}

export async function setSettingsByForm(formData: FormData) {
	const settings = Object.fromEntries(formData.entries())
	let errors = []

	for (const [key, value] of Object.entries(settings)) {
		if (typeof value === "string") {
			await setSetting(key, value)
		} else {
			errors.push(key)
		}
	}

	return errors
}
