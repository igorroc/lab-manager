"use server"

import db from "@/modules/db"
import { checkGreaterThan, validateStringTime } from "@/utils/Date"
import { Prisma, WeekDay } from "@prisma/client"

export async function createScheduleAction(formData: FormData) {
	const newSchedule = {
		startTime: formData.get("startTime") as string, // formato HH:MM
		endTime: formData.get("endTime") as string, // formato HH:MM
		stepDuration: Number(formData.get("stepDuration")),
		dayOfWeek: formData.get("dayOfWeek") as WeekDay,
		classGroupId: formData.get("classGroup") as string,
	}

	if (!validateStringTime(newSchedule.startTime) || !validateStringTime(newSchedule.endTime)) {
		return { error: "Horário inválido" }
	}

	if (newSchedule.startTime === newSchedule.endTime) {
		return { error: "O horário de início e de término não podem ser iguais" }
	}

	if (!checkGreaterThan(newSchedule.startTime, newSchedule.endTime)) {
		return { error: "O horário de término deve ser maior que o horário de início" }
	}

	if (newSchedule.stepDuration < 1) {
		return { error: "A duração da aula deve ser de pelo menos 1 minuto" }
	}

	if (!Object.values(WeekDay).includes(newSchedule.dayOfWeek)) {
		return { error: "Dia da semana inválido" }
	}

	try {
		const created = await db.schedule.create({
			data: newSchedule,
		})

		return created
	} catch (err) {
		if (err instanceof Prisma.PrismaClientKnownRequestError) {
			return {
				error: "Erro no banco de dados",
				details: err,
			}
		}

		return { error: "Erro desconhecido" }
	}
}