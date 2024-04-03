import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

type CalendarFilter = {
	search: {
		subjectSearch: string
		selectedClassrooms: string[]
		selectedProfessors: string[]
		selectedSemester: number[]
	}
	setSearch: (key: string, value: string | string[] | number[]) => void
}

export const useCalendarFilter = create<CalendarFilter>()(
	persist(
		(set, get) => ({
			search: {
				subjectSearch: "",
				selectedClassrooms: [],
				selectedProfessors: [],
				selectedSemester: [],
			},
			setSearch: (key, value) => {
				set((state) => ({
					search: {
						...state.search,
						[key]: value,
					},
				}))
			},
		}),
		{
			name: "calendar-filter",
			storage: createJSONStorage(() => localStorage),
		}
	)
)
