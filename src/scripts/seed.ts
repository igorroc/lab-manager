import bcrypt from "bcrypt"

import db from "@/modules/db"

const defaultPassword = process.env.ADMIN_PASSWORD || "123456"
const defaultEmail = "igor@rocha.com"

async function seed() {
	const existingUser = await db.user.findFirst({
		where: {
			email: defaultEmail,
		},
	})

	if (existingUser) {
		console.log("User already exists")
		return
	}

	const encryptedPassword = await bcrypt.hash(defaultPassword, 10)

	await db.user.create({
		data: {
			email: defaultEmail,
			password: encryptedPassword,
			name: "Igor Rocha",
			role: "ADMIN",
		},
	})

	console.log("User created:", {
		email: defaultEmail,
		password: defaultPassword,
	})
}

seed()
