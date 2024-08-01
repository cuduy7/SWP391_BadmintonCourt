"use client"

import { BlogContent, BlogOtherExtra, Container, Share } from "@/app/components"
import Layout from "@/app/layout"
import Custom404 from "@/pages/404"
import Custom500 from "@/pages/500"
import { getDetailBlogService, getListBlogService } from "@/services"
import { BlogsDetailForm, ListBlogsData } from "@/types"
import { GetStaticPaths, GetStaticProps } from "next"

export const getStaticPaths: GetStaticPaths = async () => {
    const blogs = await getListBlogService("1")
    const paths = blogs.data.map((blog: ListBlogsData) => ({
        params: { id: blog?.id?.toString() },
    }))

    return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const id = context.params?.id

    if (!id || Array.isArray(id)) {
        return {
            notFound: true,
        }
    }

    try {
        const Blog = await getDetailBlogService(id)
        if (Blog.data == null) {
            return {
                notFound: true,
            }
        }

        return {
            props: {
                Blog,
                id
            },
            revalidate: 5
        }
    } catch (error) {
        return {
            props: {
                internalError: true
            }
        }
    }
}

const BlogPage = ({ Blog, internalError, id }: { Blog: BlogsDetailForm, internalError?: boolean, id: string }) => {
    if (!Blog) {
        return <Custom404 />
    }

    if (internalError) {
        return <Custom500 />
    }

    return (
        <Layout>
            <Container>
                <div className="relative py-5">
                    <BlogContent
                        id={id}
                        createTime={Blog.data.createTime}
                        description={Blog.data.description}
                        title={Blog.data.title}
                        userCreateName={Blog.data.userCreateName}
                    />
                    <div className="relative py-10">
                        <Share />
                    </div>
                </div>
            </Container>
            <BlogOtherExtra />  
        </Layout>
    )
}

export default BlogPage