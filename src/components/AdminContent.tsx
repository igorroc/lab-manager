"use client"

import { Button } from "@nextui-org/react"

import { IoMdMenu } from "react-icons/io"

import { useSidebarOpen } from "@/store/SidebarOpen"

type ContentProps = {
	children: React.ReactNode
}

export default function AdminContent({ children }: ContentProps) {
	const [toggleSidebarOpen] = useSidebarOpen((state) => [state.toggle])

	return (
		<main className={`p-8 md:p-14 pb-20 transition-all ml-0 md:ml-64`}>
			{children}
			<div
				className={`fixed z-40 bottom-0 left-0 w-dvw h-16 bg-background shadow-up-md flex items-center justify-center transition-all md:translate-y-full`}
			>
				<Button className="flex flex-col gap-2" onClick={toggleSidebarOpen}>
					<IoMdMenu className="text-2xl" />
				</Button>
			</div>
		</main>
	)
}
