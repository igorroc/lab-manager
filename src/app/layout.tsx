import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ToastContainer } from "react-toastify"

import "react-toastify/dist/ReactToastify.css"

import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "Lab Manager",
	description: "Sistema de gestão de laboratórios",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="pt-br">
			<body
				className={[inter.className, "dark text-foreground bg-background min-h-dvh"].join(
					" "
				)}
			>
				<ToastContainer />
				{children}
			</body>
		</html>
	)
}
