"use client"

import Link from "next/link"
import { Classroom, Subject } from "@prisma/client"
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
	subjects: Subject[]
}

export default function SubjectsTable(props: OrderProps) {
	const [page, setPage] = useState(1)
	const rowsPerPage = 10
	const pages = Math.ceil(props.subjects.length / rowsPerPage)

	const items = useMemo(() => {
		const start = (page - 1) * rowsPerPage
		const end = start + rowsPerPage
		return props.subjects.slice(start, end)
	}, [page, props.subjects])

	const columns = [
		{ key: "name", label: "Nome" },
		{ key: "code", label: "Código" },
		{ key: "semester", label: "Semestre" },
		{ key: "hours", label: "Carga horária" },
		{ key: "actions", label: "Ações" },
	]

	const renderCell = useCallback((item: Subject, columnKey: string | number) => {
		const value = getKeyValue(item, columnKey)

		if (columnKey === "actions") {
			return (
				<div className="relative flex items-center gap-2">
					<Tooltip content="Editar disciplina">
						<Link
							href={`/super/subjects/${item.id}/edit`}
							className="text-lg text-default-400 cursor-pointer active:opacity-50"
						>
							<FaRegEdit />
						</Link>
					</Tooltip>
				</div>
			)
		}

		if (columnKey === "semester") {
			return <span>{value}º</span>
		}

		if (columnKey === "hours") {
			return <span>{value}h</span>
		}

		return value
	}, [])

	return (
		<Table
			aria-label="Lista de disciplinas"
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
			<TableBody items={items} emptyContent={"Nenhuma disciplina encontrada"}>
				{(item) => (
					<TableRow key={item.id}>
						{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
					</TableRow>
				)}
			</TableBody>
		</Table>
	)
}
