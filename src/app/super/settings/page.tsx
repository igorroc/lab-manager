import { getSetting } from "@/actions/settings/get"

import Form from "./form"

export const revalidate = 0

export default async function Settings() {
	const classDuration = await getSetting("classDuration", "50")

	return (
		<div>
			<h1 className="font-bold text-2xl">Configurações do calendário</h1>
			<Form
				fields={[
					{
						name: "morningStart",
						label: "Início da manhã",
						type: "time",
						value: await getSetting("morningStart", "07:30"),
					},
					{
						name: "morningEnd",
						label: "Fim da manhã",
						type: "time",
						value: await getSetting("morningEnd", "12:30"),
					},
					{
						name: "afternoonStart",
						label: "Início da tarde",
						type: "time",
						value: await getSetting("afternoonStart", "13:30"),
					},
					{
						name: "afternoonEnd",
						label: "Fim da tarde",
						type: "time",
						value: await getSetting("afternoonEnd", "18:30"),
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
