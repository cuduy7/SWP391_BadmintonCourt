import { AdminLayout, ModalChangeTo, ModalGoToMess, ModalSendNoticePost, ModalTrackingReport, UserReportDetail } from "@/app/components"
import Custom500 from "@/pages/500"
import { getReportDetailService } from "@/services"
import { UserReportDetailForm } from "@/types"

export async function getServerSideProps(context: any) {
    const { id } = context.params;
    const { report_type } = context.query;

    if (!id || Array.isArray(id)) {
        return {
            notFound: true,
        }
    }

    try {
        const reportDetail = await getReportDetailService(id, report_type)

        return {
            props: {
                reportDetail,
            },
        }
    } catch (error) {
        //console.log(error)
        return {
            props: {
                internalError: true
            }
        }
    }
}

const UserReportDetailPage = ({ reportDetail, internalError }: { reportDetail: UserReportDetailForm, internalError?: boolean }) => {
    if (internalError) {
        return <Custom500 />
    }

    return (
        <AdminLayout>
            <ModalSendNoticePost />
            <ModalTrackingReport />
            <ModalGoToMess />
            <ModalChangeTo />
            <UserReportDetail data={reportDetail.data} />
        </AdminLayout>
    )
}

export default UserReportDetailPage
