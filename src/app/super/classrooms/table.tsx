"use client"

import Link from "next/link"
import { Classroom } from "@prisma/client"
import { useCallback, useMemo, useState } from "react"
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	getKeyValue,
	Pagination,
	Tooltip,
} from "@nextui-org/react"

import { FaRegEdit } from "react-icons/fa"

type OrderProps = {
	classrooms: Classroom[]
}

export default function ClassroomsTable(props: OrderProps) {
	const [page, setPage] = useState(1)
	const rowsPerPage = 10
	const pages = Math.ceil(props.classrooms.length / rowsPerPage)

	const items = useMemo(() => {
		const start = (page - 1) * rowsPerPage
		const end = start + rowsPerPage
		return props.classrooms.slice(start, end)
	}, [page, props.classrooms])

	const columns = [
		{ key: "name", label: "Nome" },
		{ key: "capacity", label: "Capacidade" },
		{ key: "computerCount", label: "Computadores" },
		{ key: "projectorCount", label: "Projetores" },
		{ key: "actions", label: "Ações" },
	]

	const renderCell = useCallback((item: Classroom, columnKey: string | number) => {
		const value = getKeyValue(item, columnKey)

		if (columnKey === "actions") {
			return (
				<div className="relative flex items-center gap-2">
					<Tooltip content="Editar sala de aula">
						<Link
							href={`/super/classrooms/${item.id}/edit`}
							className="text-lg text-default-400 cursor-pointer active:opacity-50"
						>
							<FaRegEdit />
						</Link>
					</Tooltip>
				</div>
			)
		}

		return value
	}, [])

	return (
		<Table
			aria-label="Lista de categorias da empresa"
			shadow="none"
			selectionMode="single"
			bottomContent={
				<div className="flex w-full justify-center">
					<Pagination
						isCompact
						showControls
						showShadow
						color="default"
						page={page}
						total={pages}
						onChange={(page) => setPage(page)}
					/>
				</div>
			}
		>
			<TableHeader columns={columns}>
				{(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
			</TableHeader>
			<TableBody items={items} emptyContent={"Nenhuma sala de aula encontrada"}>
				{(item) => (
					<TableRow key={item.id}>
						{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
					</TableRow>
				)}
			</TableBody>
		</Table>
	)
}
