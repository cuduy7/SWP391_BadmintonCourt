import {
  Banner,
  BlogOtherExtra,
  PostSuggestionAI,
  QuickList,
} from "@/app/components"
import Layout from '@/app/layout'

const Home = () => {
  return (
    <Layout>
      <Banner />
      <PostSuggestionAI />
      <QuickList/>
      <BlogOtherExtra />
    </Layout>
  )
}

export default Home