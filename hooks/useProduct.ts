import { CreateBadmintonForm, ListRoomData } from '@/types';
import { create } from 'zustand';

interface CheckPostModalStore {
    isOpen: boolean;
    message: string | null;
    value: CreateBadmintonForm | null;
    onOpen: (message: string, value: CreateBadmintonForm) => void;
    onClose: () => void;
}

interface RoomByProductModalStore {
    isOpen: boolean;
    listRoom: ListRoomData[] | null;
    onOpen: (listRoom: ListRoomData[]) => void;
    onClose: () => void;
}

interface BoostProductModalStore {
    isOpen: boolean;
    postId: string | null;
    onOpen: (postId: string) => void;
    onClose: () => void;
}

interface DetailTModalStore {
    isOpen: boolean;
    transactionId: string | null;
    onOpen: (transactionId: string) => void;
    onClose: () => void;
}

export const useCheckPostModal = create<CheckPostModalStore>((set) => ({
    isOpen: false,
    message: null,
    value: null,
    onOpen: (message, value) => set({ isOpen: true, message, value }),
    onClose: () => set({ isOpen: false, message: null, value: null })
}))

export const useRoomByProductModal = create<RoomByProductModalStore>((set) => ({
    isOpen: false,
    listRoom: null,
    onOpen: (listRoom) => set({ isOpen: true, listRoom }),
    onClose: () => set({ isOpen: false, listRoom: null })
}))

export const useBoostProductModal = create<BoostProductModalStore>((set) => ({
    isOpen: false,
    postId: null,
    onOpen: (postId) => set({ isOpen: true, postId }),
    onClose: () => set({ isOpen: false, postId: null })
}))

export const useUpdateProductModal = create<BoostProductModalStore>((set) => ({
    isOpen: false,
    postId: null,
    onOpen: (postId) => set({ isOpen: true, postId }),
    onClose: () => set({ isOpen: false, postId: null })
}))

export const useManagementModal = create<BoostProductModalStore>((set) => ({
    isOpen: false,
    postId: null,
    onOpen: (postId) => set({ isOpen: true, postId }),
    onClose: () => set({ isOpen: false, postId: null })
}))

export const useDetailTModal = create<DetailTModalStore>((set) => ({
    isOpen: false,
    transactionId: null,
    onOpen: (transactionId) => set({ isOpen: true, transactionId }),
    onClose: () => set({ isOpen: false, transactionId: null })
}))