import { create } from 'zustand';

interface SuccessModalStore {
    isOpen: boolean;
    tran_id: string | null;
    onOpen: (tran_id: string) => void;
    onClose: () => void;
}
interface FailModalStore {
    isOpen: boolean;
    message: string;
    onOpen: (message: string) => void;
    onClose: () => void;
}

interface ContinueModalStore {
    isOpen: boolean;
    slotsIdArray: any;
    post_id: string | null
    checkedMethod: boolean | false
    onOpen: (post_id: string) => void;
    onClose: () => void;
    setSlotsIdArray: (slotsIdArray: any) => void
    setCheckMethod: (checkMethod: boolean) => void
}

export const useFailPaymentModal = create<FailModalStore>((set) => ({
    isOpen: false,
    message: '',
    onOpen: (message) => set({ isOpen: true, message }),
    onClose: () => set({ isOpen: false, message: '' })
}))

export const useSuccessPaymentModal = create<SuccessModalStore>((set) => ({
    isOpen: false,
    tran_id: null,
    onOpen: (tran_id) => set({ isOpen: true, tran_id }),
    onClose: () => set({ isOpen: false, tran_id: null })
}))

export const useContinuePaymentModal = create<ContinueModalStore>((set) => ({
    isOpen: false,
    slotsIdArray: [],
    checkedMethod: false,
    post_id: null,
    onOpen: (post_id) => set({ isOpen: true, post_id }),
    onClose: () => set({ isOpen: false, slotsIdArray: [], post_id: null, checkedMethod: false }),
    setSlotsIdArray: (slotsIdArray) => set({ slotsIdArray }),
    setCheckMethod: (checkedMethod) => set({ checkedMethod })
}))