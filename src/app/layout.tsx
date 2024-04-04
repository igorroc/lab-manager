import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ToastContainer } from "react-toastify"

import "react-toastify/dist/ReactToastify.css"

import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "Lab Manager",
	description:
		"Descubra o sistema inovador de gestão de laboratórios da UESC, projetado para otimizar a reserva e o uso de espaços acadêmicos. Acesse informações atualizadas sobre disponibilidade de salas e organize seus horários com eficiência e transparência.",
	icons: [
		{
			url: "/icon.png",
			sizes: "64x64",
			type: "image/x-icon",
		},
	],
	authors: [
		{
			name: "Igor Rocha",
			url: "https://ilrocha.com",
		},
	],
	openGraph: {
		type: "website",
		description:
			"Descubra o sistema inovador de gestão de laboratórios da UESC, projetado para otimizar a reserva e o uso de espaços acadêmicos. Acesse informações atualizadas sobre disponibilidade de salas e organize seus horários com eficiência e transparência.",
		title: "Lab Manager",
		siteName: "Lab Manager",
		url: "https://labs.ilrocha.com",
		images: [
			{
				url: "/banner.png",
				width: 960,
				height: 540,
				alt: "Lab Manager",
			},
		],
	},
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
