import Calendar from "@/components/Calendar"

export const revalidate = 0

export default function SuperDashboard() {
	return (
		<div>
			<h1 className="font-bold text-2xl">Pré visualização dos horários</h1>
			<div className="w-full relative">
				<Calendar smaller isAdmin />
			</div>
		</div>
	)
}
