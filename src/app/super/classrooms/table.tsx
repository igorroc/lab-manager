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
	Input,
} from "@nextui-org/react"

import { FaRegEdit } from "react-icons/fa"
import { FaMagnifyingGlass } from "react-icons/fa6"

type OrderProps = {
	classrooms: Classroom[]
}

export default function ClassroomsTable(props: OrderProps) {
	const [page, setPage] = useState(1)
	const [filterValue, setFilterValue] = useState("")

	const rowsPerPage = 10
	const pages = Math.ceil(props.classrooms.length / rowsPerPage)

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
			return props.classrooms
				.filter((item) => item.name.toLowerCase().includes(filterValue.toLowerCase()))
				.slice(start, end)
		}

		return props.classrooms.slice(start, end)
	}, [page, props.classrooms, filterValue])

	const columns = [
		{ key: "active", label: "Ativo" },
		{ key: "name", label: "Nome" },
		{ key: "capacity", label: "Capacidade" },
		{ key: "computerCount", label: "Computadores" },
		{ key: "projectorCount", label: "Projetores" },
		{ key: "hasAir", label: "Ar condicionado" },
		{ key: "actions", label: "Ações" },
	]

	const renderCell = useCallback((item: Classroom, columnKey: string | number) => {
		const value = getKeyValue(item, columnKey)

		if (columnKey === "actions") {
			return (
				<div className="relative flex items-center gap-2">
					<Tooltip content="Editar laboratório">
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

		if (columnKey === "active" || columnKey === "hasAir") {
			return (
				<Tooltip
					content={
						columnKey === "active"
							? value
								? "Laboratório ativo"
								: "Laboratório inativo"
							: value
							? "Possui ar condicionado"
							: "Não possui ar condicionado"
					}
				>
					<span
						className={`w-4 h-4 ${
							value ? "bg-green-500" : "bg-red-500"
						} rounded-full block`}
					></span>
				</Tooltip>
			)
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
				<TableBody items={items} emptyContent={"Nenhum laboratório encontrado"}>
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
