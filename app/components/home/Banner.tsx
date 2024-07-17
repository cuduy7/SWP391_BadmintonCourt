
import { Container, Background } from '../providers'
import BannerImage from './Banner/BannerImage'
import BannerIntro from './Banner/BannerIntro'

const Banner = () => {
    return (
        <Background src="/images/background.png">
            <Container>
                <div className="
                        flex
                        justify-center
                        items-center 
                        py-5
                        md:py-12 
                        lg:grid
                        lg:gird-cols-5 
                        lg:justify-normal
                        lg:py-20 
                        xl:py-32
                        transition-all
                        duration-500
                    "
                >
                    <BannerIntro />
                    <BannerImage />
                </div>
            </Container>
        </Background>
    )
}

export default Banner
