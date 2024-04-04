"use client"

import Link from "next/link"
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
import { ClassGroupsWithRelations } from "@/actions/class-groups/get"

type OrderProps = {
	classGroups: ClassGroupsWithRelations[]
}

export default function ClassGroupsTable(props: OrderProps) {
	const [page, setPage] = useState(1)
	const rowsPerPage = 10
	const pages = Math.ceil(props.classGroups.length / rowsPerPage)

	const items = useMemo(() => {
		const start = (page - 1) * rowsPerPage
		const end = start + rowsPerPage
		return props.classGroups.slice(start, end)
	}, [page, props.classGroups])

	const columns = [
		{ key: "color", label: "Cor" },
		{ key: "name", label: "Nome" },
		{ key: "alumniCount", label: "Qtd Alunos" },
		{ key: "professor", label: "Professor" },
		{ key: "subject", label: "Matéria" },
		{ key: "classroom", label: "Sala" },
		{ key: "actions", label: "Ações" },
	]

	const renderCell = useCallback((item: ClassGroupsWithRelations, columnKey: string | number) => {
		const value = getKeyValue(item, columnKey)

		if (columnKey === "actions") {
			return (
				<div className="relative flex items-center gap-2">
					<Tooltip content="Editar turma">
						<Link
							href={`/super/class-groups/${item.id}/edit`}
							className="text-lg text-default-400 cursor-pointer active:opacity-50"
						>
							<FaRegEdit />
						</Link>
					</Tooltip>
				</div>
			)
		}

		if (columnKey === "professor") {
			return item.professor.name
		}
		if (columnKey === "subject") {
			return item.subject.name
		}
		if (columnKey === "classroom") {
			return item.classroom?.name || "Sem laboratório definido"
		}

		if (columnKey === "color") {
			return <div className="w-4 h-4 rounded-full" style={{ backgroundColor: value }} />
		}

		return value
	}, [])

	return (
		<Table
			aria-label="Lista de turmas"
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
			<TableBody items={items} emptyContent={"Nenhuma turma encontrada"}>
				{(item) => (
					<TableRow key={item.id}>
						{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
					</TableRow>
				)}
			</TableBody>
		</Table>
	)
}
