import { Button } from "@nextui-org/react"
import Link from "next/link"

import { FaPlus } from "react-icons/fa"

import { getAllClassGroups } from "@/actions/class-groups/get"

import ClassGroupsTable from "./table"

export const revalidate = 1

export default async function ViewSubjects() {
	const classGroups = await getAllClassGroups()

	return (
		<div>
			<div className="my-4 flex justify-between">
				<h1 className="font-bold text-xl">Turmas</h1>
				<Button
					color="primary"
					endContent={<FaPlus />}
					as={Link}
					href="/super/class-groups/create"
				>
					Adicionar
				</Button>
			</div>
			<ClassGroupsTable classGroups={classGroups} />
		</div>
	)
}
