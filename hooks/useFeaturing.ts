import { create } from 'zustand';

interface FeaturingModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useFeaturingModal = create<FeaturingModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))
