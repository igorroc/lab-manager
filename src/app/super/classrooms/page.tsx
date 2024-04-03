import Link from "next/link"
import { Button } from "@nextui-org/react"

import { FaPlus } from "react-icons/fa"

import { getAllClassrooms } from "@/actions/classrooms/get"

import ClassroomsTable from "./table"

export const revalidate = 1

export default async function ViewClassrooms() {
	const classrooms = await getAllClassrooms()

	return (
		<div>
			<div className="my-4 flex justify-between">
				<h1 className="font-bold text-xl">Laboratórios</h1>
				<Button
					color="primary"
					endContent={<FaPlus />}
					as={Link}
					href="/super/classrooms/create"
				>
					Adicionar
				</Button>
			</div>
			<ClassroomsTable classrooms={classrooms} />
		</div>
	)
}
