import {
    Container,
    ModalReportUser,
    ModalUserBanUser,
    UserOtherExtra,
    UserProfileContent
} from "@/app/components"
import UserFormComment from "@/app/components/user/profile/UserFormComment"
import UserProfileComments from "@/app/components/user/profile/UserProfileComments"
import Layout from "@/app/layout"
import Custom404 from "@/pages/404"
import Custom500 from "@/pages/500"
import { getListUserService, getUserProfileService } from "@/services"
import { UserProfile, UserProfileData } from "@/types"
import { GetStaticPaths, GetStaticProps } from "next"

export const getStaticPaths: GetStaticPaths = async () => {
    const users = await getListUserService()
    const paths = users.data.map((user: UserProfileData) => ({
        params: { id: user?.id?.toString() },
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
        const User = await getUserProfileService(id)
        if (User.data == null) {
            return {
                notFound: true,
            }
        }

        return {
            props: {
                User,
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

const ProfileUserPage = ({ User, internalError, id }: { User: UserProfile, internalError?: boolean, id: string }) => {
    if (!User) {
        return <Custom404 />
    }

    if (internalError) {
        return <Custom500 />
    }

    return (
        <Layout>
            <ModalReportUser id={id} />
            <ModalUserBanUser id={id} />
            <Container>
                <UserProfileContent
                    id={id}
                    friendly={User.data.friendly}
                    fullName={User.data.fullName}
                    helpful={User.data.helpful}
                    imgUrl={User.data.imgUrl}
                    levelSkill={User.data.levelSkill}
                    sortProfile={User.data.sortProfile}
                    totalRate={User.data.totalRate}
                    trusted={User.data.totalRate}
                />
                <UserFormComment id={id} />
                <UserProfileComments id={id} />
                <UserOtherExtra id={id} />
            </Container>
        </Layout>
    )
}

export default ProfileUserPage