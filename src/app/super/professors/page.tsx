import Link from "next/link"
import { Button } from "@nextui-org/react"

import { FaPlus } from "react-icons/fa"

import { getAllProfessors } from "@/actions/professors/get"

import ProfessorsTable from "./table"

export const revalidate = 0

export default async function ViewProfessors() {
	const professors = await getAllProfessors()

	return (
		<div>
			<div className="my-4 flex justify-between">
				<h1 className="font-bold text-xl">Professores</h1>
				<Button
					color="primary"
					endContent={<FaPlus />}
					as={Link}
					href="/super/professors/create"
				>
					Adicionar
				</Button>
			</div>
			<ProfessorsTable professors={professors} />
		</div>
	)
}
