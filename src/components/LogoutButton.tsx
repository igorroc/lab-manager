"use client"

import { useState } from "react"
import { toast } from "react-toastify"
import { Button } from "@nextui-org/react"
import { useRouter } from "next/navigation"

import { TbLogout2 } from "react-icons/tb"

import { authenticateLogout } from "@/modules/auth"

export default function LogOutButton() {
	const router = useRouter()
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
		router.push("/auth/login")
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
