"use client"

import { GlobalContext } from '@/contexts';
import { useContext, useEffect, useMemo, useState } from 'react';

const StylePlayStep = () => {
    const styles = useMemo(() => [
        'Giành quyền tấn công',
        'Khai thác đường chéo sân',
        'Chiến thuật tấn công cuối sân',
        'Chiến thuật buộc đối thủ đánh cầu trái tay',
        'Chiến thuật ép đối phương đổi hướng liên tục',
        'Chiến thuật đánh vào bốn góc sân',
        'Chiến thuật phòng thủ trước tấn công sau',
    ], []);

    const { setUser, user } = useContext(GlobalContext) || {}
    const [selectedItems, setSelectedItems] = useState<boolean[]>(styles.map(() => false));

    useEffect(() => {
        if (user?.playingWay) {
            const playingWayArray = user.playingWay
            const selectedIndices = playingWayArray.map(way => styles.indexOf(way)).filter(index => index !== -1);
            setSelectedItems(styles.map((_, index) => selectedIndices.includes(index)));
        }
    }, [user, styles])

    const handleItemClick = (index: number) => {
        setSelectedItems(prevSelectedItems => prevSelectedItems.map((selected, i) => i === index ? !selected : selected));

        if (setUser) {
            setUser(prevUser => ({
                ...prevUser,
                playingWay: selectedItems[index]
                    ? prevUser?.playingWay?.filter(style => style !== styles[index]) || []
                    : [...prevUser?.playingWay || [], styles[index]]
            }));
        }
    }

    // //console.log(user?.playingWay)

    return (
        <div className="
                relative 
                w-full 
                bg-[#F5F5F5] 
                border 
                border-black 
                border-opacity-10 
                rounded-xl 
                max-h-80 
                overflow-y-auto
            "
        >
            <ul className="
                    p-8 
                    text-gray-600 
                    text-xl 
                    font-semibold 
                    flex 
                    flex-col 
                    gap-4
                "
            >
                {styles.map((style, index) => (
                    <li
                        key={index}
                        className={`
                            cursor-pointer 
                            ${selectedItems[index] ? 'text-primary-blue-cus' : ''}
                        `}
                    >
                        <button onClick={() => handleItemClick(index)} type="button">
                            {style}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default StylePlayStep