import { UserProfileData } from "@/types"
import { Rating } from "../../providers/format"

const UserProfileRating: React.FC<UserProfileData> = ({
    friendly,
    trusted,
    helpful,
    levelSkill,
    totalRate
}) => {
    return (
        <div className="relative flex flex-col py-10 gap-5">
            <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-3 items-center transition-all duration-500">
                <div className="text-xl font-medium text-gray-600">
                    Đánh giá:
                </div>
                <Rating rating={levelSkill ?? 0} maxStars={5} sizeCus={30} />
            </div>
            <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-3 items-center transition-all duration-500">
                <div className="text-xl font-medium text-gray-600">
                    Kĩ năng:
                </div>
                <Rating rating={totalRate ?? 0} maxStars={5} sizeCus={30} />
            </div>
            <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-3 items-center transition-all duration-500">
                <div className="text-xl font-medium text-gray-600">
                    Thân thiện:
                </div>
                <Rating rating={friendly ?? 0} maxStars={5} sizeCus={30} />
            </div>
            <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-3 items-center transition-all duration-500">
                <div className="text-xl font-medium text-gray-600">
                    Tin tưởng:
                </div>
                <Rating rating={trusted ?? 0} maxStars={5} sizeCus={30} />
            </div>
            <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-3 items-center transition-all duration-500">
                <div className="text-xl font-medium text-gray-600">
                    Hỗ trợ:
                </div>
                <Rating rating={helpful ?? 0} maxStars={5} sizeCus={30} />
            </div>
        </div>
    )
}

export default UserProfileRating