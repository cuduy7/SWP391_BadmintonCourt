import { create } from 'zustand';

interface WalletModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useWithdrawModal = create<WalletModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))

export const useRechargeModal = create<WalletModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))