import { create } from 'zustand';

interface ReportModalStore {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

interface ReportTransactionModalStore {
    isOpen: boolean
    tran_id: string | null
    onOpen: (tran_id: string) => void
    onClose: () => void
}

export const useReportUserModal = create<ReportModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))

export const useReportPostModal = create<ReportModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))

export const useReportTransactionModal = create<ReportTransactionModalStore>((set) => ({
    isOpen: false,
    tran_id: null,
    onOpen: (tran_id) => set({ isOpen: true, tran_id }),
    onClose: () => set({ isOpen: false, tran_id: null })
}))