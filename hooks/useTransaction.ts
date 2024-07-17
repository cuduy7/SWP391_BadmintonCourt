import { create } from "zustand";

interface TransactionModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

interface DeleteTransactionModalStore {
    isOpen: boolean;
    tranId: string | null,
    onOpen: (tranId: string) => void;
    onClose: () => void;
}

export const useTransactionModal = create<TransactionModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))

export const useDeleteTransactionModal = create<DeleteTransactionModalStore>((set) => ({
    isOpen: false,
    tranId: null,
    onOpen: (tranId) => set({ isOpen: true, tranId }),
    onClose: () => set({ isOpen: false, tranId: null })
}))