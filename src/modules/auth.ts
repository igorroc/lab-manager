"use server"

import { JWTPayload, SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"

const secretKey = process.env.AUTHENTICATION_SECRET_KEY
const key = new TextEncoder().encode(secretKey)

type TUser = {
	id: string
	email: string
	name: string
}

type TSuperUser = {
	id: string
	email: string
	name: string
}

export async function encrypt(payload: any) {
	return await new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("1 week from now")
		.sign(key)
}

export async function decrypt(input: string): Promise<JWTPayload | null> {
	try {
		const { payload } = await jwtVerify(input, key, {
			algorithms: ["HS256"],
		})
		return payload
	} catch (error) {
		return null
	}
}

export async function authenticateLogin(user: any) {
	const session = await encrypt({ user })

	cookies().set("session", session, { httpOnly: true })
}
export async function authenticateLoginSuper(user: any) {
	const session = await encrypt({ super: user })

	cookies().set("session", session, { httpOnly: true })
}

export async function authenticateLogout() {
	cookies().set("session", "", { httpOnly: true, expires: new Date(0) })
}

export async function getSession() {
	const session = cookies().get("session")
	if (!session || !session.value) return null
	const payload = await decrypt(session.value)

	if (!payload || !payload.exp || payload.exp < Date.now() / 1000) {
		return null
	}

	return payload
}

export async function getUserBySession() {
	const session = await getSession()
	if (!session || !session.user) return null
	return session.user as TUser
}

export async function getSuperBySession() {
	const session = await getSession()
	if (!session || !session.super) return null
	return session.super as TSuperUser
}
