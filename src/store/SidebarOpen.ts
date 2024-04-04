import { create } from "zustand"

type SidebarOpen = {
	isOpen: boolean
	toggle: () => void
	close: () => void
	open: () => void
}

export const useSidebarOpen = create<SidebarOpen>((set) => ({
	isOpen: false,
	toggle: () => set((state) => ({ isOpen: !state.isOpen })),
	close: () => set({ isOpen: false }),
	open: () => set({ isOpen: true }),
}))
