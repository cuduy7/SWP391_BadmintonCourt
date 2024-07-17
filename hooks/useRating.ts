import { create } from "zustand";

interface RatingModalStore {
    isOpen: boolean;
    name: string | null;
    idUserRate: string | null;
    idUserRated: string | null;
    idTransaction: string | null;
    onOpen: (name: string, idUserRate: string, idUserRated: string, idTransaction: string) => void;
    onClose: () => void;
}

export const useRatingModal = create<RatingModalStore>((set) => ({
    isOpen: false,
    name: null,
    idUserRate: null,
    idUserRated: null,
    idTransaction: null,
    onOpen: (name, idUserRate, idUserRated, idTransaction) => set({ isOpen: true, name, idUserRate, idUserRated, idTransaction}),
    onClose: () => set({ isOpen: false, name: null, idUserRate: null, idUserRated: null, idTransaction: null})
}))