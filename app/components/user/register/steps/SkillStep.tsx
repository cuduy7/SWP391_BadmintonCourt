"use client"

import { GlobalContext } from '@/contexts';
import { useContext, useEffect, useMemo, useState } from 'react';

const SkillStep = () => {
    const skills = useMemo(() => [
        'Lần đầu',
        'Mới chơi',
        'Có tài năng',
        'Chuyên gia',
        'Tuyển thủ',
    ], []);

    const { setUser, user } = useContext(GlobalContext) || {};
    const [playingLevel, setPlayingLevel] = useState<number | undefined>(user?.playingLevel || 0);
    const [selectedSkills, setSelectedSkills] = useState<boolean[]>(
        skills.map((_, index) => index < user?.playingLevel!)
    );

    useEffect(() => {
        if (playingLevel !== undefined && setUser) {
            setUser((prevUser) => ({
                ...prevUser,
                playingLevel: playingLevel,
            }));
        }
    }, [playingLevel, setUser]);

    const handleSkillClick = (index: number) => {
        const updatedSkills = [...selectedSkills];

        if (updatedSkills[index]) {
            for (let i = index + 1; i < updatedSkills.length; i++) {
                updatedSkills[i] = false;
            }
        } else {
            for (let i = 0; i <= index; i++) {
                updatedSkills[i] = true;
            }
        }

        setSelectedSkills(updatedSkills);
        setPlayingLevel(index + 1);
    };

    return (
        <div className="relative w-full grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-5 h-80 max-h-full">
            {skills.map((skill, index) => (
                <div className="col-span-1 w-full" key={index}>
                    <div className="flex flex-col w-full gap-2">
                        <div className="relative">
                            <button
                                className={`w-full h-20 ${selectedSkills[index]
                                    ? 'bg-primary-blue-cus'
                                    : 'bg-[#F5F5F5]'
                                    }`}
                                onClick={() => handleSkillClick(index)}
                                type="button"
                            />
                        </div>
                        <div className="text-xl font-semibold text-gray-600 text-center">
                            {skill}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SkillStep;
