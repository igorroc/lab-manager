import Calendar from "@/components/Calendar"

export const revalidate = 0

export default async function CreateSchedule() {
	return (
		<div>
			<h1>Criar Horário</h1>
			<Calendar smaller isAdmin />
		</div>
	)
}
