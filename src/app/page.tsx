import Link from "next/link"

import Calendar from "@/components/Calendar"

export const revalidate = 0

export default async function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center p-8 md:p-24 text-center">
			<h1 className="text-bold text-2xl">Gestão de laboratórios</h1>
			<Calendar />
		</main>
	)
}
