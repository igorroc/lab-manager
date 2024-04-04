import Link from "next/link"

import Calendar from "@/components/Calendar"

export const revalidate = 1

export default async function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center p-8 md:p-24 text-center">
			<h1 className="text-bold text-2xl">Gestão de laboratórios</h1>
			<p>Em breve você poderá visualizar os laboratórios cadastrados e realizar buscas.</p>
			<Calendar />
			<Link href="/auth/login">Área de admin</Link>
		</main>
	)
}
