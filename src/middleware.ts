import { NextRequest } from "next/server"

import { getSession, getSuperBySession, getUserBySession } from "@/modules/auth"

export async function middleware(request: NextRequest) {
	const session = await getSession()
	const user = await getUserBySession()
	const superUser = await getSuperBySession()

	if (
		session &&
		request.nextUrl.pathname.startsWith("/auth") &&
		!request.nextUrl.pathname.startsWith("/auth/logout")
	) {
		if (user) {
			return Response.redirect(new URL("/dashboard", request.url))
		} else if (superUser) {
			return Response.redirect(new URL("/super/dashboard", request.url))
		}
	}
	if (!session && !user && request.nextUrl.pathname.startsWith("/dashboard")) {
		return Response.redirect(new URL("/auth/login", request.url))
	}
	if (!session && !superUser && request.nextUrl.pathname.startsWith("/super")) {
		return Response.redirect(new URL("/auth/super", request.url))
	}
}

export const config = {
	matcher: ["/api/:path*", "/dashboard/:path*", "/auth/:path*", "/super/:path*"],
}
