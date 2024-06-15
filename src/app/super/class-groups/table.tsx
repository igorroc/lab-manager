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
	Input,
} from "@nextui-org/react"

import { FaRegEdit } from "react-icons/fa"
import { ClassGroupsWithRelations } from "@/actions/class-groups/get"
import { FaMagnifyingGlass } from "react-icons/fa6"

type OrderProps = {
	classGroups: ClassGroupsWithRelations[]
}

export default function ClassGroupsTable(props: OrderProps) {
	const [page, setPage] = useState(1)
	const [filterValue, setFilterValue] = useState("")

	const rowsPerPage = 10
	const pages = Math.ceil(props.classGroups.length / rowsPerPage)

	const onSearchChange = useCallback((value?: string) => {
		if (value) {
			setFilterValue(value)
			setPage(1)
		} else {
			setFilterValue("")
		}
	}, [])

	const onClear = useCallback(() => {
		setFilterValue("")
		setPage(1)
	}, [])

	const items = useMemo(() => {
		const start = (page - 1) * rowsPerPage
		const end = start + rowsPerPage

		if (filterValue) {
			const customFilter = (item: ClassGroupsWithRelations) => {
				const professorName = item.professor.name.toLowerCase()
				const subjectName = item.subject.name.toLowerCase()
				const classroomName = item.classroom?.name.toLowerCase() || ""
				const filter = filterValue.toLowerCase()

				return (
					professorName.includes(filter) ||
					subjectName.includes(filter) ||
					classroomName.includes(filter)
				)
			}
			return props.classGroups.filter(customFilter).slice(start, end)
		}

		return props.classGroups.slice(start, end)
	}, [page, props.classGroups, filterValue])

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
		<>
			<Input
				isClearable
				className="w-full sm:max-w-[44%] mb-4"
				placeholder="Busque aqui..."
				startContent={<FaMagnifyingGlass />}
				value={filterValue}
				onClear={() => onClear()}
				onValueChange={onSearchChange}
			/>
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
		</>
	)
}
