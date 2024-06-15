"use client"

import Link from "next/link"
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Divider,
	Tooltip,
} from "@nextui-org/react"

import { FaBook, FaClock } from "react-icons/fa6"
import { MdMeetingRoom } from "react-icons/md"
import { FaChalkboardTeacher } from "react-icons/fa"

import { ScheduleWithRelations } from "@/actions/schedules/get"

type ModalProps = {
	isOpen: boolean
	onOpenChange: () => void
	selectedSchedule: ScheduleWithRelations
}

export default function ModalSchedule(props: ModalProps) {
	return (
		<Modal isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
			<ModalContent>
				<ModalHeader className="flex flex-col gap-1">
					{props.selectedSchedule.classGroup.subject.code}
				</ModalHeader>
				<ModalBody>
					<div className="flex flex-col gap-4">
						<InfoItem
							icon={<FaBook size={18} />}
							title={`${props.selectedSchedule.classGroup.subject.name} - ${props.selectedSchedule.classGroup.name}`}
							tooltip="Turma"
						/>
						<InfoItem
							icon={<FaClock size={18} />}
							title={`${props.selectedSchedule.startTime} - ${props.selectedSchedule.endTime}`}
							tooltip="Horário de início e término"
						/>
						<InfoItem
							icon={<MdMeetingRoom size={18} />}
							title={
								props.selectedSchedule.classGroup.classroom?.name ||
								"Sem sala definida"
							}
							tooltip="Laboratório/Sala de aula"
						/>
						<Divider />
						<InfoItem
							icon={<FaChalkboardTeacher size={18} />}
							title={props.selectedSchedule.classGroup.professor.name || ""}
							description={
								<>
									<Link
										className="text-primary text-sm underline"
										href={`mailto:${props.selectedSchedule.classGroup.professor.email}`}
									>
										{props.selectedSchedule.classGroup.professor.email}
									</Link>
								</>
							}
							tooltip="Professor(a)"
						/>
					</div>
				</ModalBody>
				<ModalFooter></ModalFooter>
			</ModalContent>
		</Modal>
	)
}

function InfoItem(props: {
	icon: React.ReactNode
	title: string
	description?: React.ReactNode
	tooltip: string
}) {
	return (
		<Tooltip content={props.tooltip} placement="top-start">
			<div className="flex-1 flex gap-4 items-center">
				{props.icon}
				<div className="flex flex-col">
					<span>{props.title}</span>
					{props.description}
				</div>
			</div>
		</Tooltip>
	)
}
