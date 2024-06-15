"use client"

import Link from "next/link"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react"

import { IoMdPin } from "react-icons/io"
import { FaClock, FaUser } from "react-icons/fa6"

import { ScheduleWithRelations } from "@/actions/schedules/get"

type ModalProps = {
	isOpen: boolean
	onOpenChange: () => void
	selectedSchedule: ScheduleWithRelations | null
}

export default function ModalSchedule(props: ModalProps) {
	if (!props.selectedSchedule) return null

	return (
		<Modal isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className="flex flex-col gap-1">
							({props.selectedSchedule?.classGroup.subject.code}){" "}
							{props.selectedSchedule?.classGroup.subject.name} -{" "}
							{props.selectedSchedule?.classGroup.name}
						</ModalHeader>
						<ModalBody>
							<div className="flex flex-col gap-8">
								<InfoItem
									icon={<FaUser size={18} />}
									title={props.selectedSchedule?.classGroup.professor.name || ""}
									description={
										props.selectedSchedule?.classGroup.professor.email ? (
											<Link
												className="text-primary text-sm underline"
												href={`mailto:${props.selectedSchedule?.classGroup.professor.email}`}
											>
												{props.selectedSchedule?.classGroup.professor.email}
											</Link>
										) : null
									}
								/>
								<InfoItem
									icon={<FaClock size={18} />}
									title={`${props.selectedSchedule?.startTime} - ${props.selectedSchedule?.endTime}`}
								/>
								<InfoItem
									icon={<IoMdPin size={18} />}
									title={
										props.selectedSchedule?.classGroup.classroom?.name ||
										"Sem sala definida"
									}
								/>
							</div>
						</ModalBody>
						<ModalFooter></ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	)
}

function InfoItem(props: { icon: React.ReactNode; title: string; description?: React.ReactNode }) {
	return (
		<div className="flex-1 flex gap-2 items-center">
			{props.icon}
			<div className="flex flex-col">
				<span>{props.title}</span>
				{props.description}
			</div>
		</div>
	)
}
