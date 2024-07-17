import { ReportUserFormData } from "@/types"
import AxiosClient from "../AxiosInstance"

export const reportTransactionService = async ({ tran_id, reportContent, reportTitle }: { tran_id: string, reportContent: string, reportTitle: string }) => {
    try {
        const response = await AxiosClient.post(`/api/reports/from_tran/${tran_id}`, {
            reportContent: reportContent,
            reportTitle: reportTitle
        })

        return response.data
    } catch (error: any) {
        //console.log(error)

        if (error && error.response) {
            return error.response.data
        }
    }
}

export const reportPostService = async ({ user_id, post_id, reportContent, reportTitle }: { user_id: string, post_id: string, reportContent: string, reportTitle: string }) => {
    try {
        const response = await AxiosClient.post(`/api/reports/sender/${user_id}/from_post/${post_id}`, {
            reportContent: reportContent,
            reportTitle: reportTitle
        })

        return response.data
    } catch (error: any) {
        //console.log(error)

        if (error && error.response) {
            return error.response.data
        }
    }
}

export const reportUserService = async (data: ReportUserFormData) => {
    try {
        const response = await AxiosClient.post(`/api/users/report/${data.fromUserID}?userreport_id=${data.toUserID}`, {
            tittle: data.tittle,
            content: data.content
        })

        return response.data
    } catch (error: any) {
        //console.log(error)

        if (error && error.response) {
            return error.response.data
        }
    }
}

export const updateStatusReportService = async (id_report: string, report_status: number) => {
    try {
        const response = await AxiosClient.put(`/api/reports/update_report_status/${id_report}&${report_status}`)

        return response.data
    } catch (error: any) {
        //console.log(error)

        if (error && error.response) {
            return error.response.data
        }
    }
}