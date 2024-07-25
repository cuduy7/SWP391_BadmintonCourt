export interface Blog {
    id: string
    src: string
    title: string
    date?: string
    description?: string
    poster?: string
}

export interface ListBlog {
    listItem: PostNewItem[]
}

export interface CreateBlogForm {
    title: string
    highlightImg?: string
    summary: string
    description?: string
}

export interface ListBlogs {
    message: string
    data: {
        id: string,
        summary: string,
        imgUrl: string,
        title: string,
        createTime: string,
        shortDescription: string,
        userCreateName: string
    }[]
}
export interface ListBlogsData {
    id: string,
    summary: string,
    imgUrl: string,
    title: string,
    createTime: string,
    shortDescription: string,
    userCreateName: string
}

export interface BlogsDetail {
    id: string,
    description: string,
    title: string,
    createTime: string,
    userCreateName: string
}

export interface BlogsDetailForm {
    data: {
        id: string,
        description: string,
        title: string,
        createTime: string,
        userCreateName: string
    }
}