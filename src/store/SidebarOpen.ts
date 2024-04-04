import { create } from "zustand"

type SidebarOpen = {
	open: boolean
	toggle: () => void
}

export const useSidebarOpen = create<SidebarOpen>((set) => ({
	open: false,
	toggle: () => set((state) => ({ open: !state.open })),
}))
