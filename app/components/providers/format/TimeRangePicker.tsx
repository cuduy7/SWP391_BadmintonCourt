"use client"

import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { setHours, setMinutes, format } from 'date-fns';
import { Time } from '@/types';

interface Option {
    value: string | number;
    label: string;
}

interface TimeRangePickerProps {
    onTimeChange: (time: { startTime: string; endTime: string }) => void;
}

const TimeRangePicker: React.FC<TimeRangePickerProps> = ({ onTimeChange }) => {
    const customStyles = {
        control: (provided: any) => ({
            ...provided,
            border: 'none',
            marginLeft: '0px',
            backgroundColor: '#F5F5F5',
            paddingTop: '5px',
            paddingBottom: '5px',
            boxShadow: 'none !important',
            "*": {
                boxShadow: "none !important",
            },
            '&:hover': {
                border: 'none !important',
                boxShadow: 'none !important',
                outline: 'none !important',
            },
            '&:focus': {
                border: 'none !important',
                boxShadow: 'none !important',
                outline: 'none !important',
            },
        }),
    };

    const [startTime, setStartTime] = useState<Time>({ hour: '6', minute: '00' });
    const [endTime, setEndTime] = useState<Time>({ hour: '7', minute: '00' });

    useEffect(() => {
        onTimeChange({
            startTime: formatTimeString(startTime),
            endTime: formatTimeString(endTime),
        });
    }, [startTime, endTime, onTimeChange])

    const formatTimeString = (time: Time): string => {
        let dateTime = new Date();
        dateTime = setHours(dateTime, parseInt(time.hour));
        dateTime = setMinutes(dateTime, parseInt(time.minute));
        return format(dateTime, 'HH:mm');
    }

    const hours = Array.from({ length: 24 }, (_, i) => ({ value: i, label: String(i).padStart(2, '0') }));
    const minutes = Array.from({ length: 60 }, (_, i) => ({ value: i, label: String(i).padStart(2, '0') }));

    const handleHourChange = (timeSetter: React.Dispatch<React.SetStateAction<Time>>) => (value: Option | null) => {
        if (value) {
            timeSetter((prevTime) => ({ ...prevTime, hour: value.value.toString() }));
        }
    };

    const handleMinuteChange = (timeSetter: React.Dispatch<React.SetStateAction<Time>>) => (value: Option | null) => {
        if (value) {
            timeSetter((prevTime) => ({ ...prevTime, minute: value.value.toString() }));
        }
    };

    return (
        <div className="flex space-x-0 gap-3 sm:gap-0 sm:space-x-4 xl:flex-row lg:flex-col lg:space-x-0 lg:gap-3 sm:flex-row flex-col items-baseline sm:items-center lg:items-baseline xl:items-center">
            <div className="flex space-x-2">
                <Select
                    isSearchable={false}
                    options={hours}
                    value={hours.find(h => h.value === Number(startTime.hour))}
                    onChange={handleHourChange(setStartTime)}
                    styles={customStyles}
                    instanceId="startTimeHour"
                />
                <Select
                    isSearchable={false}
                    options={minutes}
                    value={minutes.find(m => m.value === Number(startTime.minute))}
                    onChange={handleMinuteChange(setStartTime)}
                    styles={customStyles}
                    instanceId="startTimeMinute"
                />
            </div>
            <div>-</div>
            <div className="flex space-x-2">
                <Select
                    isSearchable={false}
                    options={hours}
                    value={hours.find(h => h.value === Number(endTime.hour))}
                    onChange={handleHourChange(setEndTime)}
                    styles={customStyles}
                    instanceId="endTimeHour"
                />
                <Select
                    isSearchable={false}
                    options={minutes}
                    value={minutes.find(m => m.value === Number(endTime.minute))}
                    onChange={handleMinuteChange(setEndTime)}
                    styles={customStyles}
                    instanceId="endTimeMinute"
                />
            </div>
        </div>
    )
}

export default TimeRangePicker;
