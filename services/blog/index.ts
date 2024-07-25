import AxiosClient from "../AxiosInstance"

export const createBlogService = async ({ description, title, user_id, summary, imgUrls, highlightImg }: { description: string, title: string, user_id: string, summary: string, imgUrls: string[], highlightImg: string }) => {
    try {
        const response = await AxiosClient.post(`/api/blogs/create_by/${user_id}`, {
            title: title,
            summary: summary,
            description: description,
            imgUrls: imgUrls,
            highlightImg: highlightImg
        })

        return response.data
    } catch (error: any) {
        //console.log(error)

        if (error && error.response) {
            return error.response.data
        }
    }
}

export const DeleteBlogService = async ({ blog_id, user_id }: { blog_id: string, user_id: string }) => {
    try {
        const response = await AxiosClient.delete(`/api/blogs/${blog_id}/by/${user_id}`)

        return response.data
    } catch (error: any) {
        //console.log(error)

        if (error && error.response) {
            return error.response.data
        }
    }
}

export const getListBlogService = async (id: string) => {
    try {
        const response = await AxiosClient.get(`/api/blogs/${id}`)

        return response.data
    } catch (error: any) {
        //console.log(error)

        if (error && error.response) {
            return error.response.data
        }
    }
}

export const getDetailBlogService = async (blog_id: string) => {
    try {
        const response = await AxiosClient.get(`/api/blogs/${blog_id}/details`)

        return response.data
    } catch (error: any) {
        //console.log(error)

        if (error && error.response) {
            return error.response.data
        }
    }
}