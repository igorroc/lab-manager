"use client"

import { useEffect } from "react"
import { toast } from "react-toastify"

import { authenticateLogout } from "@/modules/auth"
import { useRouter } from "next/navigation"

export default function Logout() {
	const router = useRouter()
	useEffect(() => {
		const disconnecting = toast.loading("Desconectando...")
		async function logout() {
			await authenticateLogout()
			setTimeout(() => {
				toast.update(disconnecting, {
					render: "Desconectado com sucesso",
					type: "success",
					isLoading: false,
					autoClose: 1000,
				})
				router.push("/auth/login")
			}, 1000)
		}
		logout()
		// eslint-disable-next-line
	}, [])
	return <div>Logout</div>
}
