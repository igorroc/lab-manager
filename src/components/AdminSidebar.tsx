import Link from "next/link"
import React from "react"
import LogoutButton from "./LogoutButton"

export default function AdminSidebar() {
	const routes = [
		{
			name: "Dashboard",
			icon: "",
			href: "/super/dashboard",
		},
		{
			name: "Usuários",
			icon: "",
			href: "/super/users",
		},
		{
			name: "Laboratórios",
			icon: "",
			href: "/super/labs",
		},
		{
			name: "Equipamentos",
			icon: "",
			href: "/super/equipments",
		},
		{
			name: "Agendamentos",
			icon: "",
			href: "/super/schedules",
		},
	]
	return (
		<aside className="fixed w-64 bg-slate-800 h-dvh">
			<div>
				<h1>Lab Manager</h1>
			</div>
			<div className="flex flex-col gap-2 p-4">
				{routes.map((route) => (
					<Link
						key={route.href}
						href={route.href}
						className="p-2 hover:bg-slate-700 rounded-md transition-all"
					>
						{route.name}
					</Link>
				))}
			</div>
			<div>
				<LogoutButton />
			</div>
		</aside>
	)
}
