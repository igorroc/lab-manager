"use client"

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react"

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
							<p>
								<strong>Horário:</strong> {props.selectedSchedule?.startTime} -{" "}
								{props.selectedSchedule?.endTime}
							</p>
							<p>
								<strong>Professor:</strong>{" "}
								{props.selectedSchedule?.classGroup.professor.name}
							</p>
							<p>
								<strong>Sala:</strong>{" "}
								{props.selectedSchedule?.classGroup.classroom.name}
							</p>
						</ModalBody>
						<ModalFooter>
							<Button color="danger" variant="light" onPress={onClose}>
								Fechar
							</Button>
							{/* <Button color="primary" onPress={onClose}>
								Action
							</Button> */}
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	)
}
