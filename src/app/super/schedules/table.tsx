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

import { ScheduleWithRelations } from "@/actions/schedules/get"

import { mapWeekDayToName } from "@/utils/WeekDay"
import { FaMagnifyingGlass } from "react-icons/fa6"

type OrderProps = {
	schedules: ScheduleWithRelations[]
}

export default function SchedulesTable(props: OrderProps) {
	const [page, setPage] = useState(1)
	const [filterValue, setFilterValue] = useState("")

	const rowsPerPage = 10
	const pages = Math.ceil(props.schedules.length / rowsPerPage)

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
			return props.schedules
				.filter((item) =>
					item.classGroup.subject.name.toLowerCase().includes(filterValue.toLowerCase())
				)
				.slice(start, end)
		}

		return props.schedules.slice(start, end)
	}, [page, props.schedules, filterValue])

	const columns = [
		{ key: "class-group", label: "Turma" },
		{ key: "subject", label: "Disciplina" },
		{ key: "classroom", label: "Laboratório" },
		{ key: "dayOfWeek", label: "Dia da semana" },
		{ key: "startTime", label: "Início" },
		{ key: "endTime", label: "Fim" },
		{ key: "actions", label: "Ações" },
	]

	const renderCell = useCallback((item: ScheduleWithRelations, columnKey: string | number) => {
		const value = getKeyValue(item, columnKey)

		if (columnKey === "actions") {
			return (
				<div className="relative flex items-center gap-2">
					<Tooltip content="Editar horário">
						<Link
							href={`/super/schedules/${item.id}/edit`}
							className="text-lg text-default-400 cursor-pointer active:opacity-50"
						>
							<FaRegEdit />
						</Link>
					</Tooltip>
				</div>
			)
		}

		if (columnKey === "class-group") {
			return item.classGroup.name
		}

		if (columnKey === "subject") {
			return item.classGroup.subject.name
		}

		if (columnKey === "classroom") {
			return item.classGroup.classroom?.name || "Nenhum laboratório definido"
		}

		if (columnKey === "dayOfWeek") {
			return mapWeekDayToName(item.dayOfWeek)
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
				aria-label="Lista de horários"
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
				<TableBody items={items} emptyContent={"Nenhum horário encontrado"}>
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
