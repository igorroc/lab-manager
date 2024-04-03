import Link from "next/link"
import { Button } from "@nextui-org/react"

import { FaPlus } from "react-icons/fa"

import { getAllSchedules } from "@/actions/schedules/get"

import SchedulesTable from "./table"

export const revalidate = 1

export default async function ViewSubjects() {
	const schedules = await getAllSchedules()

	return (
		<div>
			<div className="my-4 flex justify-between">
				<h1 className="font-bold text-xl">Horários</h1>
				<Button
					color="primary"
					endContent={<FaPlus />}
					as={Link}
					href="/super/schedules/create"
				>
					Adicionar
				</Button>
			</div>
			<SchedulesTable schedules={schedules} />
		</div>
	)
}
