"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { FaBook, FaChalkboardTeacher, FaClock, FaCog, FaHome } from "react-icons/fa"
import { FaPeopleGroup } from "react-icons/fa6"
import { MdMeetingRoom } from "react-icons/md"

import LogoutButton from "./LogoutButton"

export default function AdminSidebar() {
	const pathname = usePathname()

	const routes = [
		{
			name: "Dashboard",
			icon: <FaHome />,
			href: "/super/dashboard",
		},
		{
			name: "Salas de Aula",
			icon: <MdMeetingRoom />,
			href: "/super/classrooms",
		},
		{
			name: "Disciplinas",
			icon: <FaBook />,
			href: "/super/subjects",
		},
		{
			name: "Professores",
			icon: <FaChalkboardTeacher />,
			href: "/super/professors",
		},
		{
			name: "Turmas",
			icon: <FaPeopleGroup />,
			href: "/super/class-groups",
		},
		{
			name: "Horários",
			icon: <FaClock />,
			href: "/super/schedules",
		},
		{
			name: "Configurações",
			icon: <FaCog />,
			href: "/super/settings",
		},
	]

	function checkCurrentRoute(routePath: string) {
		return pathname.includes(routePath)
	}

	return (
		<aside className="fixed w-64 bg-slate-800 h-dvh">
			<div className="h-full flex flex-col justify-between">
				<div className="flex flex-col gap-2">
					<div className="flex items-center justify-center py-4">
						<h1>Lab Manager</h1>
					</div>
					<div className="flex flex-col gap-2 p-4">
						{routes.map((route) => (
							<Link
								key={route.href}
								href={route.href}
								className={`p-2 hover:bg-slate-700 rounded-md transition-all flex gap-2 items-center ${
									checkCurrentRoute(route.href)
										? "bg-slate-700 text-white opacity-100"
										: "opacity-40"
								}`}
							>
								{route.icon && <span>{route.icon}</span>}
								{route.name}
							</Link>
						))}
					</div>
				</div>
				<div className="p-4 flex flex-col gap-2 items-center justify-center">
					<LogoutButton />
				</div>
			</div>
		</aside>
	)
}
