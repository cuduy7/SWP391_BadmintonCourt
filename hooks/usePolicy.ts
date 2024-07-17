import { create } from 'zustand';

interface PolicyModalStore {
    isOpen: boolean;
    user_id: string | null;
    onOpen: (user_id: string) => void;
    onClose: () => void;
}

export const usePolicyModal = create<PolicyModalStore>((set) => ({
    isOpen: false,
    user_id: null,
    onOpen: (user_id) => set({ isOpen: true, user_id }),
    onClose: () => set({ isOpen: false, user_id: null })
}))