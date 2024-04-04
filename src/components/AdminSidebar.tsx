"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { MdMeetingRoom } from "react-icons/md"
import { FaPeopleGroup } from "react-icons/fa6"
import { FaBook, FaChalkboardTeacher, FaClock, FaCog, FaHome } from "react-icons/fa"

import { useSidebarOpen } from "@/store/SidebarOpen"

import LogoutButton from "./LogoutButton"

export default function AdminSidebar() {
	const pathname = usePathname()
	const [sidebarOpen, toggleSidebarOpen] = useSidebarOpen((state) => [state.open, state.toggle])

	const routes = [
		{
			name: "Dashboard",
			icon: <FaHome />,
			href: "/super/dashboard",
		},
		{
			name: "Laboratórios",
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
		<aside
			className={`fixed z-50 w-64 bg-content1 h-dvh transition-all ${
				sidebarOpen
					? "translate-x-0 shadow-lg"
					: "-translate-x-full md:-translate-x-0 md:shadow-lg"
			}`}
		>
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
								className={`p-2 hover:bg-gray-600 rounded-md transition-all flex gap-2 items-center ${
									checkCurrentRoute(route.href)
										? "bg-primary text-white opacity-100 hover:bg-primary"
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
