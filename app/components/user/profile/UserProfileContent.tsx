import { UserProfileData } from "@/types"
import UserProfileIntro from "./UserProfileIntro"
import UserProfileRating from "./UserProfileRating"

const UserProfileContent: React.FC<UserProfileData> = ({
    id,
    friendly,
    fullName,
    helpful,
    imgUrl,
    levelSkill,
    sortProfile,
    totalRate,
    trusted
}) => {
    return (
        <div className="flex flex-col gap-5 py-10">
            <UserProfileIntro
                id={id}
                imgUrl={imgUrl}
                fullName={fullName}
                sortProfile={sortProfile}
            />
            <UserProfileRating
                levelSkill={levelSkill}
                totalRate={totalRate}
                friendly={friendly}
                trusted={trusted}
                helpful={helpful}
            />
        </div>
    )
}

export default UserProfileContent