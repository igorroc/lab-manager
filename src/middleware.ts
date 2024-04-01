import { Role } from "@prisma/client"
import { NextRequest } from "next/server"

import { getUserBySession } from "@/modules/auth"

export async function middleware(request: NextRequest) {
	const user = await getUserBySession()

	if (user) {
		if (
			request.nextUrl.pathname.startsWith("/auth") &&
			!request.nextUrl.pathname.startsWith("/auth/logout")
		) {
			if (user.role == Role.USER) {
				return Response.redirect(new URL("/dashboard", request.url))
			} else if (user.role == Role.ADMIN) {
				return Response.redirect(new URL("/super/dashboard", request.url))
			}
		}
	} else {
		if (!request.nextUrl.pathname.startsWith("/auth")) {
			return Response.redirect(new URL("/auth/login", request.url))
		}
	}
}

export const config = {
	matcher: ["/api/:path*", "/dashboard/:path*", "/auth/:path*", "/super/:path*"],
}
