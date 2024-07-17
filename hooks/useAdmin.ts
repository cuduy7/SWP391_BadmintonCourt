import { create } from 'zustand';

interface AdminModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

interface SendNoticedModalStore {
    isOpen: boolean;
    reportId: string | null;
    onOpen: (reportId: string | null) => void;
    onClose: () => void;
}

interface AdminDeletePostModalStore {
    isOpen: boolean;
    postId: string | null;
    reportId: string | null;
    onOpen: (postId: string, reportId: string | null) => void;
    onClose: () => void;
}

interface SendNoticePostModalStore {
    isOpen: boolean;
    postId: string | null
    reportId: string | null
    onOpen: (postId: string, reportId: string | null) => void;
    onClose: () => void;
}

interface DeleteBlogModalStore {
    isOpen: boolean;
    blogId: string | null;
    onOpen: (blogId: string) => void;
    onClose: () => void;
}

interface TrackingReportModalStore {
    isOpen: boolean;
    adminId: string | null;
    reportId: string | null;
    onOpen: (adminId: string, reportId: string) => void;
    onClose: () => void;
}

interface ChangeMoneyToModalStore {
    isOpen: boolean;
    userId: string | null;
    money: string | null;
    title: string | null;
    reportId: string | null;
    tranId: string | null;
    onOpen: (userId: string, money: string, title: string, reportId: string | null, tranId: string | null) => void;
    onClose: () => void;
}
interface GoToMessModalStore {
    isOpen: boolean;
    roomId: string | null;
    onOpen: (roomId: string) => void;
    onClose: () => void;
}

export const useAdminBanModal = create<SendNoticedModalStore>((set) => ({
    isOpen: false,
    reportId: null,
    onOpen: (reportId) => set({ isOpen: true, reportId }),
    onClose: () => set({ isOpen: false, reportId: null })
}))

export const useAdminUnBanModal = create<AdminModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))

export const useAdminUpRoleModal = create<AdminModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))

export const useAdminDownRoleModal = create<AdminModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))

export const useAdminDeletePostModal = create<AdminDeletePostModalStore>((set) => ({
    isOpen: false,
    postId: null,
    reportId: null,
    onOpen: (postId, reportId) => set({ isOpen: true, postId, reportId }),
    onClose: () => set({ isOpen: false, postId: null, reportId: null })
}))

export const useSendNoticeUserModal = create<SendNoticedModalStore>((set) => ({
    isOpen: false,
    reportId: null,
    onOpen: (reportId) => set({ isOpen: true, reportId }),
    onClose: () => set({ isOpen: false, reportId: null })
}))

export const useSendNoticePostModal = create<SendNoticePostModalStore>((set) => ({
    isOpen: false,
    postId: null,
    reportId: null,
    onOpen: (postId, reportId) => set({ isOpen: true, postId, reportId }),
    onClose: () => set({ isOpen: false, postId: null, reportId: null })
}))

export const useDeleteBLogModal = create<DeleteBlogModalStore>((set) => ({
    isOpen: false,
    blogId: null,
    onOpen: (blogId) => set({ isOpen: true, blogId }),
    onClose: () => set({ isOpen: false, blogId: null })
}))

export const useTrackingReportModal = create<TrackingReportModalStore>((set) => ({
    isOpen: false,
    adminId: null,
    reportId: null,
    onOpen: (adminId, reportId) => set({ isOpen: true, adminId, reportId }),
    onClose: () => set({ isOpen: false, adminId: null, reportId: null })
}))

export const useChangeMoneyToModal = create<ChangeMoneyToModalStore>((set) => ({
    isOpen: false,
    userId: null,
    money: null,
    title: null,
    reportId: null,
    tranId: null,
    onOpen: (userId, money, title, reportId, tranId) => set({ isOpen: true, userId, money, title, reportId, tranId }),
    onClose: () => set({ isOpen: false, userId: null, money: null, title: null, reportId: null, tranId: null })
}))

export const useGoToMessModal = create<GoToMessModalStore>((set) => ({
    isOpen: false,
    roomId: null,
    onOpen: (roomId) => set({ isOpen: true, roomId }),
    onClose: () => set({ isOpen: false, roomId: null })
}))