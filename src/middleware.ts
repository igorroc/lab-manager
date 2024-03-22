import { getSession } from "@/modules/auth"
import { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
	const session = await getSession()

	if (
		session &&
		request.nextUrl.pathname.startsWith("/auth") &&
		!request.nextUrl.pathname.startsWith("/auth/logout")
	) {
		return Response.redirect(new URL("/dashboard", request.url))
	}
	if (!session && request.nextUrl.pathname.startsWith("/dashboard")) {
		return Response.redirect(new URL("/auth/login", request.url))
	}
}

export const config = {
	matcher: ["/api/:path*", "/dashboard/:path*", "/auth/:path*"],
}
