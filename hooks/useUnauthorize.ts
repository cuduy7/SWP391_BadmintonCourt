import { create } from 'zustand';

interface UnauthorizeModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useUnauthorizeModal = create<UnauthorizeModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))