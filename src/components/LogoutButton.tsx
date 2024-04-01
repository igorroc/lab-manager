"use client"

import { useState } from "react"
import { Button } from "@nextui-org/react"

import { TbLogout2 } from "react-icons/tb"

import { authenticateLogout } from "@/modules/auth"
import { toast } from "react-toastify"

export default function LogOutButton() {
	const [isLoggingOut, setIsLoggingOut] = useState(false)

	async function handleButtonClick() {
		const disconnecting = toast.loading("Desconectando...")
		setIsLoggingOut(true)
		await authenticateLogout()
		setIsLoggingOut(false)
		toast.update(disconnecting, {
			render: "Desconectado com sucesso",
			type: "success",
			isLoading: false,
			autoClose: 2000,
		})
	}

	return (
		<Button
			className="text-white"
			color="primary"
			startContent={!isLoggingOut && <TbLogout2 />}
			type="submit"
			onClick={handleButtonClick}
			isLoading={isLoggingOut}
		>
			Desconectar
		</Button>
	)
}
