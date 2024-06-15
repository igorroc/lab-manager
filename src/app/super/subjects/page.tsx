import Link from "next/link"
import { Button } from "@nextui-org/react"

import { FaPlus } from "react-icons/fa"

import { getAllSubjects } from "@/actions/subjects/get"

import SubjectsTable from "./table"

export const revalidate = 0

export default async function ViewSubjects() {
	const subjects = await getAllSubjects()

	return (
		<div>
			<div className="my-4 flex justify-between">
				<h1 className="font-bold text-xl">Disciplinas</h1>
				<Button
					color="primary"
					endContent={<FaPlus />}
					as={Link}
					href="/super/subjects/create"
				>
					Adicionar
				</Button>
			</div>
			<SubjectsTable subjects={subjects} />
		</div>
	)
}
