import { create } from 'zustand';

interface UserBanUserModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useUserBanUserModal = create<UserBanUserModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))