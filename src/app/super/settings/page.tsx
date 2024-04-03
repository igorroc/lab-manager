import { getSetting } from "@/actions/settings/get"
import Form from "./form"

export default async function Settings() {
	const startOfDay = await getSetting("startOfDay", "07:30")
	const endOfDay = await getSetting("endOfDay", "18:30")
	const classDuration = await getSetting("classDuration", "50")

	return (
		<div>
			<h1 className="font-bold text-2xl">Configurações do calendário</h1>
			<Form
				fields={[
					{
						name: "startOfDay",
						label: "Início do dia",
						type: "time",
						value: startOfDay,
					},
					{
						name: "endOfDay",
						label: "Fim do dia",
						type: "time",
						value: endOfDay,
					},
					{
						name: "classDuration",
						label: "Duração das aulas",
						type: "number",
						value: classDuration,
					},
				]}
			/>
		</div>
	)
}
