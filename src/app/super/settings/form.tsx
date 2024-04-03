"use client"

import { toast } from "react-toastify"
import { Button, Input } from "@nextui-org/react"

import { setSettingsByForm } from "@/actions/settings/create"

type FormProps = {
	fields: {
		name: string
		label: string
		type: string
		value: string | null
	}[]
}

export default function Form(props: FormProps) {
	async function handleSubmit(formData: FormData) {
		const settings = await setSettingsByForm(formData)

		if (settings.length === 0) {
			toast.success("Configurações salvas com sucesso!")
		} else {
			toast.error("Erro ao salvar configurações, veja o console para mais informações.")
			console.error("Erro ao salvar config", settings)
		}
	}

	return (
		<form action={handleSubmit}>
			{props.fields.map((field) => (
				<Input
					key={field.name}
					type={field.type}
					defaultValue={field.value || ""}
					label={field.label}
					name={field.name}
				/>
			))}
			<Button type="submit" color="primary">
				Salvar
			</Button>
		</form>
	)
}
